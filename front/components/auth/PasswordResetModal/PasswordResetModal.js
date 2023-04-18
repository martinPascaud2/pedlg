import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import { useToast, useModal } from 'hooks';

import { RESET_PASSWORD } from 'lib/gql/mutations';
import { authenticate } from 'lib/utils/auth';
import { rules, getMessage } from 'lib/rules';
import parse from 'lib/utils/parseApolloErrors';

import { Input, Checkbox, Submit } from 'components/Form';

const PasswordResetModal = ({ token }) => {
    const [shouldLogin, setShouldLogin] = useState(false);
    const { addToast } = useToast();
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const { register, handleSubmit, errors, watch, setError } = useForm({
        mode: 'onChange',
    });

    const onCompleted = data => {
        const { user, token: authToken } = data.recoveryPassword;

        if (shouldLogin) {
            authenticate(authToken, user, dispatch);
        }

        addToast('Votre mot de passe a été modifié.', {
            color: 'is-success',
            duration: 7500,
        });

        closeModal();
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
                    id: 'toast__password-reset-error',
                    color: 'is-danger',
                    duration: 7500,
                }
            );
        }
    };

    const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
        onCompleted,
        onError,
    });

    const onSubmit = formData => {
        setShouldLogin(formData.shouldLogin);
        resetPassword({ variables: { ...formData, token } });
    };

    return (
        <div className="box">
            <h4 className="title is-4">Mot de passe oublié</h4>

            <hr />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="pedlg__password-reset-0"
                    type="password"
                    name="password"
                    label="Mot de passe"
                    placeholder="Un mot de passe sécurisé"
                    error={errors.password}
                    register={register({
                        required: rules.required,
                        validate: rules.password.isValid,
                    })}
                />

                <Input
                    id="pedlg__password-reset-1"
                    type="password"
                    name="confirmation"
                    label="Confirmation"
                    placeholder="Un mot de passe sécurisé"
                    error={errors.confirmation}
                    register={register({
                        required: rules.required,
                        validate: rules.sameAs(
                            ['password', 'Mot de passe'],
                            watch
                        ),
                    })}
                />

                <Checkbox
                    id="pedlg__password-reset-2"
                    name="shouldLogin"
                    register={register}
                >
                    Je me connecte
                </Checkbox>

                <Submit
                    text="Valider"
                    color="is-primary"
                    fullwidth
                    disabled={Object.keys(errors).length !== 0}
                    loading={loading}
                />
            </form>
        </div>
    );
};

PasswordResetModal.propTypes = {
    token: PropTypes.string.isRequired,
};

export default PasswordResetModal;
