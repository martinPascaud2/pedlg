import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';

import c from 'classnames';

import { useToast, useModal } from 'hooks';

import { DELETE_USER } from 'lib/gql/mutations';
import parse from 'lib/utils/parseApolloErrors';
import { deauthenticate } from 'lib/utils/auth';

const UpdateUsername = () => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { closeModal } = useModal();
    const apollo = useApolloClient();

    const onCompleted = async () => {
        await apollo.clearStore();
        deauthenticate(dispatch);
        closeModal();
    };

    const onError = data => {
        const { serverErrors } = parse(data);

        if (serverErrors.length) {
            addToast(
                "Un problème est survenu, veuillez retenter l'opération.",
                {
                    id: 'toast__delete-account-error',
                    color: 'is-danger',
                    duration: 7500,
                }
            );
        }
    };

    const [deleteUser, { loading }] = useMutation(DELETE_USER, {
        onCompleted,
        onError,
    });

    return (
        <div className="box">
            <h4 className="title is-4">Hic sunt dracones !</h4>
            <h6 className="subtitle is-6">
                La suppression de votre compte entrainera la perte totale de
                toutes vos données sur
                <span className="has-text-weight-bold">
                    {' Prends-en de la Graine'}
                </span>
                .
                <div className="has-padding-top-4 has-text-weight-bold">
                    Cette action est irréversible !
                </div>
            </h6>

            <hr />

            <button
                type="button"
                className={c('button', 'is-danger', 'is-fullwidth', {
                    'is-loading': loading,
                })}
                onClick={deleteUser}
                disabled={loading}
            >
                Supprimer mon compte
            </button>
        </div>
    );
};

export default UpdateUsername;
