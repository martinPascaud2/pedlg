import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Icon } from '@iconify/react';
import back from '@iconify/icons-mdi/arrow-back-circle';

import { useToast, useModal, useLazyQuery } from 'hooks';

import { SEND_PASSWORD_RESET_LINK } from 'lib/gql/queries';
import { rules, getMessage } from 'lib/rules';
import parse from 'lib/utils/parseApolloErrors';

import { Input, Submit } from 'components/Form';

const PasswordRecoveryModal = ({ backTo }) => {
    const { addToast } = useToast();
    const { openModal, closeModal } = useModal();
    const { register, handleSubmit, errors, setError, getValues } = useForm({
        mode: 'onChange',
    });

    const onCompleted = () => {
        addToast('Un e-mail de réinitialisation vous a été envoyé.', {
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

        if (serverErrors.length) {
            addToast(
                "Un problème est survenu, veuillez retenter l'opération.",
                {
                    id: 'toast__password-recovery-error',
                    color: 'is-danger',
                    duration: 7500,
                }
            );
        }
    };

    const [recoverPassword, { loading }] = useLazyQuery(
        SEND_PASSWORD_RESET_LINK,
        {
            variables: getValues(),
            onError,
            onCompleted,
        }
    );

    return (
        <div className="box">
            <h4 className="title is-4">Mot de passe oublié</h4>
            <h6 className="subtitle is-6">
                Renseignez l&#39;adresse e-mail liée a votre compte, vous
                recevrez par la suite un e-mail de réinitialisation de votre mot
                de passe.
            </h6>

            <hr />

            <form onSubmit={handleSubmit(recoverPassword)}>
                <Input
                    id="peldg__password-recovery-0"
                    type="email"
                    name="email"
                    label="Adresse e-mail"
                    placeholder="Votre adresse e-mail"
                    error={errors.email}
                    register={register({
                        required: rules.required,
                        pattern: rules.email.isValid(),
                    })}
                />

                <Submit
                    text="Valider"
                    color="is-primary"
                    fullwidth
                    disabled={Object.keys(errors).length !== 0}
                    loading={loading}
                />
            </form>

            <div className="columns">
                <div className="column">
                    <p className="has-text-centered has-text-small">
                        <a
                            href="#"
                            className="icon-wrapper"
                            onClick={() => openModal(backTo)}
                        >
                            <span className="icon">
                                <Icon icon={back} />
                            </span>
                            Retour à la connexion
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

PasswordRecoveryModal.propTypes = {
    backTo: PropTypes.node.isRequired,
};

export default PasswordRecoveryModal;
