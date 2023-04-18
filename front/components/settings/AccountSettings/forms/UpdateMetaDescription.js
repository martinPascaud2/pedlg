import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import { useToast, useModal } from 'hooks';

import { UPDATE_USER_META_DESC } from 'lib/gql/mutations';
import { rules, getMessage } from 'lib/rules';
import parse from 'lib/utils/parseApolloErrors';

import { ActionTypes as types } from 'store/actions/auth';

import { TextArea, Submit } from 'components/Form';

const UpdateMetaDescription = ({ currentValue }) => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { closeModal } = useModal();
    const { register, handleSubmit, errors, setError } = useForm({
        mode: 'onChange',
    });

    const onCompleted = data => {
        dispatch({
            type: types.UPDATE_CURRENT_USER_META,
            payload: { ...data.updateUserMetadata },
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
                    id: 'toast__update-meta-desc-error',
                    color: 'is-danger',
                    duration: 7500,
                }
            );
        }
    };

    const [update, { loading }] = useMutation(UPDATE_USER_META_DESC, {
        onCompleted,
        onError,
    });

    const onSubmit = data => update({ variables: { field: data.description } });

    return (
        <div className="box">
            <h4 className="title is-4">Mise à jour</h4>
            <h6 className="subtitle is-6">
                Présentez-vous en quelques lignes...
            </h6>

            <hr />

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextArea
                    id="pedlg__settings-description-0"
                    label="Description"
                    name="description"
                    error={errors.description}
                    register={register({
                        required: rules.required,
                        validate: rules.description.len([25, 255]),
                    })}
                    defaultValue={currentValue}
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

UpdateMetaDescription.propTypes = {
    currentValue: PropTypes.string,
};

UpdateMetaDescription.defaultProps = {
    currentValue: null,
};

export default UpdateMetaDescription;
