import { useRef, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import c from 'classnames';

import { useLazyQuery, useToast, useModal } from 'hooks';

import parse from 'lib/utils/parseApolloErrors';
import { rules } from 'lib/rules';

import { SEARCH_VARIETY } from 'lib/gql/queries';
import { ADD_STOCK } from 'lib/gql/mutations';

import CreateVariety from 'components/variety/CreateVariety/CreateVariety';
import Dropdown from 'components/Dropdown';
import Message from 'components/Message';
import VarietyInput from './VarietyInput';
import QuantityInput from './QuantityInput';
import SharedInput from './SharedInput';

import css from './AddNewVariety.module.scss';

const defaultValues = {
    varietyId: null,
    quantity: 0,
    unit: 'gram',
    shared: false,
    sharedQuantity: 0,
};

const AddNewVariety = ({ onSuccess, selfClose }) => {
    const { openModal } = useModal(); // TODO: To delete

    const searchInput = useRef();
    const { addToast } = useToast();
    const {
        register,
        unregister,
        handleSubmit,
        setValue,
        errors,
        clearError,
        watch,
    } = useForm({ defaultValues });
    const { varietyId, quantity, sharedQuantity } = watch();

    const [search, { variables, data: results }] = useLazyQuery(
        SEARCH_VARIETY,
        {
            fetchPolicy: 'cache-and-network',
        }
    );

    const [add, { loading: formLoading }] = useMutation(ADD_STOCK, {
        onCompleted: () => {
            addToast('Votre inventaire a été mis à jour avec succès.', {
                color: 'is-success',
                duration: 7500,
            });
            onSuccess();
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
        register({ name: 'varietyId' }, { required: rules.required });
        register(
            { name: 'quantity' },
            {
                required: rules.required,
                min: rules.stock.min(1),
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
            unregister('varietyId');
            unregister('quantity');
            unregister('unit');
            unregister('shared');
            unregister('sharedQuantity');
        };
    }, [register, unregister]);

    useEffect(() => {
        searchInput.current.focus();
    }, []);

    return (
        <form
            className={css['pedlg__add-to-stock']}
            autoComplete="off"
            onSubmit={handleSubmit(formData => add({ variables: formData }))}
        >
            <div className="columns">
                <div className="column">
                    <Message color="is-info" size="is-small">
                        {
                            'Si la semence que vous voulez ajouter à votre inventaire est absente, '
                        }
                        <a
                            onClick={() => openModal(<CreateVariety />)}
                            role="button"
                            tabIndex={0}
                            onKeyPress={() => {}}
                        >
                            cliquez ici pour la créer.
                        </a>
                    </Message>
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <p>
                        1. Choisissez une variété de semence existante dans nos
                        listes.
                    </p>
                </div>

                <div className="column">
                    <Dropdown
                        active={
                            !!(results && results.searchVariety.length) &&
                            !varietyId
                        }
                        data={results && results.searchVariety}
                        format={item => `${item.family}, ${item.name}`}
                        action={item => {
                            setValue('varietyId', item.id);
                            clearError('varietyId');
                            searchInput.current.value = `${item.family}, ${item.name}`;
                        }}
                        loopKey="id"
                    >
                        <VarietyInput
                            formId="pedlg__add-to-stock"
                            ref={searchInput}
                            search={search}
                            isSelected={!!varietyId}
                            onClear={() => {
                                if (varietyId) {
                                    setValue('varietyId', null);
                                    clearError('varietyId');
                                    searchInput.current.value =
                                        variables.search;
                                    searchInput.current.focus();
                                }
                            }}
                            error={errors.varietyId}
                        />
                    </Dropdown>
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <p>
                        2. Renseignez la quantité de graines que vous possédez,
                        au poids ou à l&#39;unité.
                    </p>
                </div>
                <div className="column">
                    <QuantityInput
                        formId="pedlg__add-to-stock"
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
            </div>

            <div className="columns">
                <div className="column">
                    <p>
                        3. Renseignez la quantité de graines que vous souhaitez
                        partager.
                    </p>
                </div>
                <div className="column">
                    <SharedInput
                        formId="pedlg__add-to-stock"
                        sharedQuantity={sharedQuantity}
                        quantity={quantity}
                        onChange={value => {
                            setValue('sharedQuantity', value);
                            setValue('shared', !!value);
                        }}
                    />
                </div>
            </div>

            <div className="buttons">
                <button
                    type="submit"
                    className={c('button', 'is-primary', {
                        'is-loading': formLoading,
                    })}
                    disabled={formLoading || Object.keys(errors).length !== 0}
                >
                    Valider
                </button>

                <button
                    type="button"
                    className={c('button', 'is-outlined', {
                        'is-loading': formLoading,
                    })}
                    onClick={event => {
                        event.preventDefault();
                        selfClose();
                    }}
                >
                    Fermer
                </button>
            </div>
        </form>
    );
};

AddNewVariety.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    selfClose: PropTypes.func.isRequired,
};

export default AddNewVariety;
