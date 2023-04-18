import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import { useToast, useModal } from 'hooks';

import { UPDATE_USER_META_DEP } from 'lib/gql/mutations';
import { rules, getMessage } from 'lib/rules';
import parse from 'lib/utils/parseApolloErrors';
import depList from 'lib/depList';

import { ActionTypes as types } from 'store/actions/auth';

import { Select, Submit } from 'components/Form';

const UpdateMetaDepartment = ({ currentValue }) => {
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
                    id: 'toast__update-meta-dep-error',
                    color: 'is-danger',
                    duration: 7500,
                }
            );
        }
    };

    const [update, { loading }] = useMutation(UPDATE_USER_META_DEP, {
        onCompleted,
        onError,
    });

    const onSubmit = data => update({ variables: { field: data.department } });

    return (
        <div className="box">
            <h4 className="title is-4">Mise à jour</h4>
            <h6 className="subtitle is-6">Choisissez votre département</h6>

            <hr />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Select
                    id="pedlg__settings-department-0"
                    label="Département"
                    name="department"
                    error={errors.username}
                    register={register({
                        required: rules.required,
                    })}
                    defaultValue={currentValue || '01'}
                    fullwidth
                >
                    {depList.map(dep => (
                        <option value={dep.num_dep} key={dep.num_dep}>
                            {`${dep.num_dep} - ${dep.dep_name}`}
                        </option>
                    ))}
                </Select>

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

UpdateMetaDepartment.propTypes = {
    currentValue: PropTypes.string,
};

UpdateMetaDepartment.defaultProps = {
    currentValue: null,
};

export default UpdateMetaDepartment;
