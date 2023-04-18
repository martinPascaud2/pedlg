import Router from 'next/router';
import Error from 'next/error';
import { useSelector } from 'react-redux';

import { ActionTypes as types } from 'store/actions/auth';
import { setInMemoryToken, unsetInMemoryToken } from 'lib/utils/auth/token';

const authenticate = (token, user, dispatch) => {
    setInMemoryToken(token);
    dispatch({ type: types.AUTHENTICATE, payload: user });
};

const deauthenticate = (dispatch, sync = true) => {
    unsetInMemoryToken();
    dispatch({ type: types.DEAUTHENTICATE });

    if (sync) {
        window.localStorage.setItem('logout', Date.now());
    }

    Router.push('/');
};

const isAuth = Component => {
    const IsAuth = props => {
        const { loggedIn } = useSelector(state => state.auth);

        return loggedIn ? <Component {...props} /> : <Error statusCode={401} />;
    };

    IsAuth.getInitialProps = async context => {
        const props =
            Component.getInitialProps &&
            (await Component.getInitialProps(context));

        return { ...props };
    };

    return IsAuth;
};

const isGuest = Component => {
    const IsGuest = props => {
        const { loggedIn } = useSelector(state => state.auth);
        /// / TODO: workaround solution, see with matthieu

        if (!loggedIn) return <Component {...props} />;
        Router.push('/');
        return <Error statusCode={401} />;

        /// ///////////////////////////////////////////////
    };

    IsGuest.getInitialProps = async context => {
        const props =
            Component.getInitialProps &&
            (await Component.getInitialProps(context));

        return { ...props };
    };

    return IsGuest;
};

export { authenticate, deauthenticate, isAuth, isGuest };
