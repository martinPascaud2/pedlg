import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/react-hooks';

import { useToast, useLazyQuery } from 'hooks';

import { LOGOUT } from 'lib/gql/queries';
import { deauthenticate } from 'lib/utils/auth';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const apollo = useApolloClient();

    const onCompleted = async () => {
        await apollo.clearStore();
        deauthenticate(dispatch);
    };

    const onError = () => {
        addToast("Un problème est survenu, veuillez retenter l'opération.", {
            color: 'is-danger',
            duration: 7500,
        });
    };

    const [logout, { loading }] = useLazyQuery(LOGOUT, {
        onError,
        onCompleted,
    });

    return (
        <button
            type="button"
            className="button is-light is-rounded"
            onClick={() => logout()}
            disabled={loading}
        >
            Déconnexion
        </button>
    );
};

export default LogoutButton;
