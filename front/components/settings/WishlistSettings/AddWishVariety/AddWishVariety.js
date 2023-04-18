import { useRef, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import c from 'classnames';

import { useLazyQuery, useToast, useModal } from 'hooks';

import { rules } from 'lib/rules';
import parse from 'lib/utils/parseApolloErrors';

import { SEARCH_VARIETY } from 'lib/gql/queries';
import { ADD_WANT } from 'lib/gql/mutations';

import CreateVariety from 'components/variety/CreateVariety/CreateVariety';
import Dropdown from 'components/Dropdown';
import Message from 'components/Message';
import VarietyInput from './VarietyInput';

import css from './AddWishVariety.module.scss';

const defaultValues = {
    varietyId: null,
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
    const { varietyId } = watch();

    const [search, { variables, data: results }] = useLazyQuery(
        SEARCH_VARIETY,
        {
            fetchPolicy: 'cache-and-network',
        }
    );

    const [add, { loading: formLoading }] = useMutation(ADD_WANT, {
        onCompleted: () => {
            addToast('Votre liste de souhaits a été mise à jour avec succès.', {
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
                        'Cette variété est présente dans la liste de votre inventaire.',
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

        return () => {
            unregister('varietyId');
        };
    }, [register, unregister]);

    useEffect(() => {
        searchInput.current.focus();
    }, []);

    return (
        <form
            className={css['pedlg__add-to-wish']}
            autoComplete="off"
            onSubmit={handleSubmit(formData => add({ variables: formData }))}
        >
            <div className="columns">
                <div className="column">
                    <Message color="is-info" size="is-small">
                        {
                            'Si la variété que vous voulez ajouter à votre liste de souhaits est absente, '
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
