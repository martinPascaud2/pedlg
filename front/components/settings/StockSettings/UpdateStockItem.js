import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import { useToast, useModal } from 'hooks';

import { ADD_STOCK } from 'lib/gql/mutations';
import parse from 'lib/utils/parseApolloErrors';
import { rules } from 'lib/rules';

import { Submit } from 'components/Form';
import RemoveStockItem from 'components/settings/StockSettings/RemoveStockItem';
import QuantityInput from 'components/settings/StockSettings/AddNewVariety/QuantityInput';
import SharedInput from 'components/settings/StockSettings/AddNewVariety/SharedInput';

const UpdateStockItem = ({ title, item, onUpdate, shouldRemove }) => {
    const { variety } = item;
    const { addToast } = useToast();
    const { openModal, closeModal } = useModal();
    const {
        register,
        unregister,
        handleSubmit,
        setValue,
        errors,
        clearError,
        watch,
    } = useForm({
        defaultValues: {
            quantity: item.quantity,
            unit: item.unit,
            shared: item.shared,
            sharedQuantity: item.sharedQuantity,
        },
    });
    const { quantity, unit, sharedQuantity } = watch();

    const [add, { loading }] = useMutation(ADD_STOCK, {
        onCompleted: data => {
            addToast('Votre inventaire a été mis à jour avec succès.', {
                color: 'is-success',
                duration: 7500,
            });
            onUpdate(data);
            closeModal();
        },
        onError: data => {
            const { inputErrors, serverErrors } = parse(data);
            let isWarning = false;

            serverErrors.forEach(error => {
                if (
                    error?.message &&
                    error.message === 'ALREADY_EXIST_IN_OTHER_LIST'
                ) {
                    isWarning = true;
                    addToast(
                        'Cette variété est présente dans votre liste de souhaits.',
                        {
                            id: 'toast__already-exists-error',
                            color: 'is-warning',
                            duration: 7500,
                        }
                    );
                }
            });
            if (
                (!isWarning && serverErrors.length) ||
                (inputErrors.length && !errors)
            ) {
                addToast(
                    "Un problème est survenu, veuillez retenter l'opération.",
                    {
                        id: 'toast__unexpected-error',
                        color: 'is-danger',
                        duration: 7500,
                    }
                );
            }
        },
    });

    useEffect(() => {
        register(
            { name: 'quantity' },
            {
                required: rules.required,
                min: rules.stock.min(0),
            }
        );
        register(
            { name: 'unit' },
            {
                required: rules.required,
                validate: rules.stock.unit,
            }
        );
        register({ name: 'shared' });
        register({ name: 'sharedQuantity' });

        return () => {
            unregister('quantity');
            unregister('unit');
            unregister('shared');
            unregister('sharedQuantity');
        };
    }, [register, unregister]);

    const onSubmit = formData => {
        const varietyId = variety.id;

        if (shouldRemove && quantity < 1) {
            openModal(
                <RemoveStockItem variety={variety} onUpdate={onUpdate} />,
                'is-small'
            );
        } else {
            add({
                variables: {
                    ...formData,
                    varietyId,
                },
            });
        }
    };

    return (
        <div className="box">
            <h4 className="title is-4">{title}</h4>
            <h6 className="subtitle is-6">
                {`${variety.family}, ${variety.name}`}
            </h6>

            <hr />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <QuantityInput
                        formId="pedlg__update-stock"
                        label="Quantité"
                        quantity={quantity}
                        unit={unit}
                        onChange={(key, value) => {
                            clearError('quantity');
                            setValue(key, value);
                        }}
                        errors={{
                            quantity: errors.quantity,
                            unit: errors.unit,
                        }}
                    />
                </div>

                <div className="field">
                    <SharedInput
                        formId="pedlg__update-stock"
                        label="Quantité partagée"
                        quantity={quantity}
                        sharedQuantity={sharedQuantity}
                        onChange={value => {
                            setValue('sharedQuantity', value);
                            setValue('shared', !!value);
                        }}
                    />
                </div>

                <Submit
                    text="Valider"
                    color="is-primary"
                    fullwidth
                    disabled={loading || Object.keys(errors).length !== 0}
                    loading={loading}
                />
            </form>
        </div>
    );
};

UpdateStockItem.propTypes = {
    title: PropTypes.string.isRequired,
    item: PropTypes.shape({
        id: PropTypes.number,
        quantity: PropTypes.number,
        unit: PropTypes.string,
        shared: PropTypes.bool,
        sharedQuantity: PropTypes.number,
        variety: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            family: PropTypes.string,
        }),
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    shouldRemove: PropTypes.bool,
};

UpdateStockItem.defaultProps = {
    shouldRemove: false,
};

export default UpdateStockItem;
