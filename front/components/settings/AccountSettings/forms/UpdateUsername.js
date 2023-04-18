import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import { useToast, useModal } from 'hooks';

import { UPDATE_USER_USERNAME } from 'lib/gql/mutations';
import { rules, getMessage } from 'lib/rules';
import parse from 'lib/utils/parseApolloErrors';

import { ActionTypes as types } from 'store/actions/auth';

import { Input, Submit } from 'components/Form';

const UpdateUsername = ({ currentValue }) => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { closeModal } = useModal();
    const { register, handleSubmit, errors, setError } = useForm({
        mode: 'onChange',
    });

    const onCompleted = data => {
        dispatch({
            type: types.UPDATE_CURRENT_USER,
            payload: { ...data.updateUser },
        });

        addToast('Votre compte a été mis à jour avec succès.', {
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
                    id: 'toast__update-username-error',
                    color: 'is-danger',
                    duration: 7500,
                }
            );
        }
    };

    const [update, { loading }] = useMutation(UPDATE_USER_USERNAME, {
        onCompleted,
        onError,
    });

    const onSubmit = data => update({ variables: { field: data.username } });

    return (
        <div className="box">
            <h4 className="title is-4">Mise à jour</h4>
            <h6 className="subtitle is-6">
                Modifier votre nom d&#39;utilisateur
            </h6>

            <hr />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="pedlg__settings-username-0"
                    name="username"
                    label="Nom d'utilisateur"
                    error={errors.username}
                    register={register({
                        required: rules.required,
                        pattern: rules.username.isValid(),
                        validate: rules.username.len([3, 15]),
                    })}
                    placeholder={currentValue || ''}
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

UpdateUsername.propTypes = {
    currentValue: PropTypes.string,
};

UpdateUsername.defaultProps = {
    currentValue: null,
};

export default UpdateUsername;
