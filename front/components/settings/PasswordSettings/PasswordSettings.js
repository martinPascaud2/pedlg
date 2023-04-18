import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import { Icon } from '@iconify/react';
import lock from '@iconify/icons-mdi/lock';

import { useToast } from 'hooks';

import { ActionTypes as types } from 'store/actions/auth';
import { UPDATE_USER_PASSWORD } from 'lib/gql/mutations';
import { rules, getMessage } from 'lib/rules';
import parse from 'lib/utils/parseApolloErrors';

import Message from 'components/Message';
import { Input, Submit } from 'components/Form';
import Setting from 'components/settings/Setting';

const PasswordSettings = ({ hasPassword }) => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { register, handleSubmit, errors, setError, watch, reset } = useForm({
        mode: 'onChange',
    });

    const onCompleted = data => {
        reset();

        if (!hasPassword) {
            dispatch({
                type: types.UPDATE_CURRENT_USER,
                payload: { ...data.updatePassword },
            });
        }

        addToast(
            hasPassword
                ? 'Mot de passe modifié avec succès.'
                : 'Mot de passe créé avec succès.',
            {
                color: 'is-success',
                duration: 7500,
            }
        );
    };

    const onError = data => {
        const { inputErrors, serverErrors } = parse(data);

        inputErrors.forEach(error => {
            setError(
                error.path,
                error.message,
                getMessage(error.message, error.validatorArgs || null)
            );
        });

        if (serverErrors.length || (inputErrors.length && !errors)) {
            addToast(
                "Un problème est survenu, veuillez retenter l'opération.",
                {
                    id: 'toast__update-password-error',
                    color: 'is-danger',
                    duration: 7500,
                }
            );
        }
    };

    const [update, { loading }] = useMutation(UPDATE_USER_PASSWORD, {
        onCompleted,
        onError,
    });

    const onSubmit = data =>
        update({
            variables: hasPassword ? { ...data } : { ...data, password: '' },
        });

    return (
        <div className="box">
            <h5 className="title is-5">
                <span className="icon-wrapper">
                    <span className="icon is-left">
                        <Icon
                            icon={lock}
                            className="has-background-dark has-radius-small"
                        />
                    </span>
                    Mot de passe
                </span>
            </h5>

            <h6 className="subtitle is-6">
                Votre mot de passe est la clé de votre compte
                <span className="has-text-weight-bold">
                    {' Prends-en de la Graine'}
                </span>
                , faites attention à choisir un mot de passe unique et sécurisé
                !
            </h6>

            <hr />

            {hasPassword || (
                <Message color="is-info" size="is-small">
                    <p>
                        Votre compte n&#39;est pas protégé par un mot de passe
                        car vous vous êtes inscrit depuis un réseau social.
                    </p>
                    <p>
                        Cependant, vous pouvez en créer un depuis ce formulaire,
                        cela vous permettra de vous connecter de manière
                        tradionnelle avec votre adresse e-mail.
                    </p>
                </Message>
            )}

            <Setting
                label={
                    hasPassword
                        ? 'Modifier votre mot de passe'
                        : 'Créer un mot de passe'
                }
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    {hasPassword && (
                        <>
                            <Input
                                id="pedlg__settings-password-0"
                                type="password"
                                name="password"
                                label="Mot de passe actuel"
                                error={errors.password}
                                register={register({
                                    required: rules.required,
                                })}
                                placeholder="Votre mot de passe actuel"
                            />

                            <hr />
                        </>
                    )}

                    <Input
                        id="pedlg__settings-password-1"
                        type="password"
                        name="newPassword"
                        label="Nouveau mot de passe"
                        error={errors.newPassword}
                        register={register({
                            required: rules.required,
                            validate: rules.password.isValid,
                        })}
                        placeholder="Un mot de passe sécurisé"
                    />

                    <Input
                        id="pedlg__settings-password-2"
                        type="password"
                        name="confirmation"
                        label="Confirmation"
                        error={errors.confirmation}
                        register={register({
                            required: rules.required,
                            validate: rules.sameAs(
                                ['newPassword', 'Nouveau mot de passe'],
                                watch
                            ),
                        })}
                        placeholder="Un mot de passe sécurisé"
                    />

                    <div className="columns">
                        <div className="column is-one-third-desktop">
                            <Submit
                                text="Valider"
                                color="is-primary"
                                fullwidth
                                disabled={Object.keys(errors).length !== 0}
                                loading={loading}
                            />
                        </div>
                    </div>
                </form>
            </Setting>
        </div>
    );
};

PasswordSettings.propTypes = {
    hasPassword: PropTypes.bool.isRequired,
};

export default PasswordSettings;
