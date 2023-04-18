import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useToast, useModal, useLazyQuery } from 'hooks';

import { LOGIN } from 'lib/gql/queries';
import { rules, getMessage } from 'lib/rules';
import parse from 'lib/utils/parseApolloErrors';
import { authenticate } from 'lib/utils/auth';

import { Input, Submit } from 'components/Form';
import ResendConfirmationLink from 'components/auth/ResendConfirmationLink';

const LoginForm = () => {
    const { addToast } = useToast();
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, getValues, setError } = useForm({
        mode: 'onChange',
    });

    const onCompleted = async data => {
        authenticate(data.login.token, data.login.user, dispatch);
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
            if (serverErrors[0].message === 'USER_NOT_VALIDATED') {
                addToast(
                    <>
                        <p className="has-padding-bottom-2">
                            Votre inscription n&#39;est pas encore validée.
                        </p>
                        <ResendConfirmationLink id={serverErrors[0].id} />
                    </>,
                    {
                        id: 'toast__login-not-validated-error',
                        color: 'is-danger',
                    }
                );
            } else {
                addToast(
                    "Un problème est survenu, veuillez retenter l'opération.",
                    {
                        id: 'toast__login-error',
                        color: 'is-danger',
                        duration: 7500,
                    }
                );
            }
        }
    };

    const [login, { loading }] = useLazyQuery(LOGIN, {
        variables: getValues(),
        onCompleted,
        onError,
    });

    return (
        <form id="pedlg__login" onSubmit={handleSubmit(login)}>
            <Input
                id="peldg__login-0"
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

            <Input
                id="peldg__login-1"
                type="password"
                name="password"
                label="Mot de passe"
                placeholder="Votre mot de passe"
                error={errors.password}
                register={register({
                    required: rules.required,
                })}
            />

            <Submit
                text="Valider"
                color="is-primary"
                fullwidth
                isRounded
                disabled={Object.keys(errors).length !== 0}
                loading={loading}
            />
        </form>
    );
};

export default LoginForm;
