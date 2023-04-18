import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

import { useToast } from 'hooks';

import { CREATE_USER } from 'lib/gql/mutations';
import { rules, getMessage } from 'lib/rules';
import parse from 'lib/utils/parseApolloErrors';

import { Input, Checkbox, Submit } from 'components/Form';
import ResendConfirmationLink from 'components/auth/ResendConfirmationLink';

const RegisterForm = () => {
    const router = useRouter();
    const { addToast } = useToast();
    const { register, handleSubmit, errors, setError, watch } = useForm({
        mode: 'onChange',
    });

    const onCompleted = data => {
        addToast(
            <>
                <p>Votre compte a été créé avec succès.</p>
                <p className="has-padding-bottom-2">
                    Avant de vous connecter, validez votre addresse e-mail
                    depuis l&#39;e-mail de confirmation qui vient de vous être
                    envoyé.
                </p>
                <ResendConfirmationLink id={data.createUser.id} />
            </>,
            {
                color: 'is-success',
            }
        );

        router.push('/');
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
                    id: 'toast__register-error',
                    color: 'is-danger',
                    duration: 7500,
                }
            );
        }
    };

    const [createUser, { loading }] = useMutation(CREATE_USER, {
        onCompleted,
        onError,
    });

    const onSubmit = formData => createUser({ variables: formData });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                id="pedlg__signup-0"
                name="username"
                label="Nom d'utilisateur"
                placeholder="Un nom d'utilisateur unique"
                error={errors.username}
                register={register({
                    required: rules.required,
                    pattern: rules.username.isValid(),
                    validate: rules.username.len([3, 15]),
                })}
            />

            <Input
                id="pedlg__signup-1"
                type="email"
                name="email"
                label="Adresse e-mail"
                placeholder="Une adresse e-mail valide"
                error={errors.email}
                register={register({
                    required: rules.required,
                    pattern: rules.email.isValid(),
                    maxLength: rules.email.maxLength(254),
                })}
            />

            <Input
                id="pedlg__signup-2"
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
                id="pedlg__signup-3"
                type="password"
                name="confirmation"
                label="Confirmation"
                placeholder="Un mot de passe sécurisé"
                error={errors.confirmation}
                register={register({
                    required: rules.required,
                    validate: rules.sameAs(['password', 'Mot de passe'], watch),
                })}
            />

            <Checkbox
                id="pedlg__signup-4"
                name="tos"
                error={errors.tos}
                register={register({
                    required: rules.required,
                })}
            >
                J&#39;ai lu et accepte les
                <Link href="/tos" as="/mentions-legales">
                    <a target="_blank">&#32;conditions d&#39;utilisation</a>
                </Link>
            </Checkbox>

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

export default RegisterForm;
