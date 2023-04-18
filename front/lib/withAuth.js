import { useEffect } from 'react';
import PropTypes from 'prop-types';
import nextCookie from 'next-cookies';

import { GET_CURRENT_USER } from 'lib/gql/queries';
import { authenticate, deauthenticate } from 'lib/utils/auth';
import {
    getInMemoryToken,
    setInMemoryToken,
    unsetInMemoryToken,
    refreshToken,
} from 'lib/utils/auth/token';

const withAuth = Component => {
    const WithAuth = props => {
        const { token, user, ...rest } = props;
        const { apollo, store } = rest;
        if (!!token && !!user) {
            authenticate(token, user, store.dispatch);
        }

        useEffect(() => {
            const syncLogout = async event => {
                if (event.key === 'logout') {
                    await apollo.clearStore();
                    deauthenticate(store.dispatch, false);
                }
            };

            const checkToken = async () => {
                const { expiry } = getInMemoryToken();

                if (expiry) {
                    const now = new Date().getTime();

                    if (new Date(now + 60000) >= new Date(expiry * 1000)) {
                        unsetInMemoryToken();

                        if (!setInMemoryToken(await refreshToken())) {
                            await apollo.clearStore();
                            deauthenticate(store.dispatch);
                        }
                    }
                }
            };

            const timer = setInterval(checkToken, 60000);
            window.addEventListener('storage', syncLogout);

            return () => {
                clearInterval(timer);
                window.removeEventListener('storage', syncLogout);
                window.localStorage.removeItem('logout');
            };
        }, [store, apollo]);

        return <Component {...rest} />;
    };

    WithAuth.getInitialProps = async context => {
        let token;
        let user;
        const { ctx } = context;

        if (ctx.isServer) {
            const { refreshToken: cookie } = nextCookie(ctx);

            if (cookie) {
                try {
                    token = await refreshToken(cookie);

                    if (token) {
                        try {
                            const { apolloClient } = ctx;
                            const response = await apolloClient.query({
                                query: GET_CURRENT_USER,
                                context: { token },
                            });

                            user = response.data.currentUser;
                        } catch (error) {
                            console.log(error);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        const props =
            Component.getInitialProps &&
            (await Component.getInitialProps(context));

        return { token, user, ...props };
    };

    WithAuth.propTypes = {
        token: PropTypes.string,
        user: PropTypes.instanceOf(Object),
    };

    WithAuth.defaultProps = {
        token: null,
        user: null,
    };

    return WithAuth;
};

export default withAuth;
