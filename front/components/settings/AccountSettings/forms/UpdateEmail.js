import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import { useToast, useModal } from 'hooks';

import { UPDATE_USER_EMAIL } from 'lib/gql/mutations';
import { rules, getMessage } from 'lib/rules';
import parse from 'lib/utils/parseApolloErrors';

import { ActionTypes as types } from 'store/actions/auth';

import { Input, Submit } from 'components/Form';

const UpdateEmail = ({ currentValue }) => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { closeModal } = useModal();
    const { register, handleSubmit, errors, setError, watch } = useForm({
        mode: 'onChange',
    });

    const onCompleted = data => {
        dispatch({
            type: types.UPDATE_CURRENT_USER,
            payload: { ...data.updateUser },
        });

        addToast(
            <p>
                Un e-mail de confirmation vous a été envoyé afin de valider
                votre nouvelle adresse.
            </p>,
            {
                color: 'is-success',
                duration: 7500,
            }
        );

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
                    id: 'toast__update-email-error',
                    color: 'is-danger',
                    duration: 7500,
                }
            );
        }
    };

    const [update, { loading }] = useMutation(UPDATE_USER_EMAIL, {
        onCompleted,
        onError,
    });

    const onSubmit = data => update({ variables: { field: data.email } });

    return (
        <div className="box">
            <h4 className="title is-4">Mise à jour</h4>
            <h6 className="subtitle is-6">Modifier votre adresse e-mail</h6>

            <hr />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="pedlg__settings-email-0"
                    type="email"
                    name="email"
                    label="Adresse e-mail"
                    error={errors.email}
                    register={register({
                        required: rules.required,
                        pattern: rules.email.isValid(),
                        maxLength: rules.email.maxLength(254),
                    })}
                    placeholder={currentValue || ''}
                />

                <Input
                    id="pedlg__settings-email-1"
                    name="confirmation"
                    label="Confirmation"
                    error={errors.confirmation}
                    register={register({
                        required: rules.required,
                        validate: rules.sameAs(
                            ['email', 'Adresse e-mail'],
                            watch
                        ),
                    })}
                    placeholder="Retapez votre adresse e-mail"
                />

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

UpdateEmail.propTypes = {
    currentValue: PropTypes.string,
};

UpdateEmail.defaultProps = {
    currentValue: null,
};

export default UpdateEmail;
