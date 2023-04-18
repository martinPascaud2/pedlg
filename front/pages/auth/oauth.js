import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import { useApolloClient } from '@apollo/react-hooks';
import Error from 'next/error';
import PropTypes from 'prop-types';
import Loading from 'components/Loading';

import { GET_CURRENT_USER } from 'lib/gql/queries';
import { authenticate } from 'lib/utils/auth';

import { useToast } from 'hooks';

const OAuth = ({ hasQuery }) => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const router = useRouter();

    const apollo = useApolloClient();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const newUserToast = username =>
        addToast(
            <>
                <div className="has-margin-bottom-2">
                    Bienvenue sur
                    <span className="has-text-weight-bold">
                        {' Prends-en de la Graine'}
                    </span>
                    {' !'}
                    <p>
                        Un nom d&#39;utilisateur vous a été automatiquement
                        attribué :
                        <span className="has-text-weight-bold">{` ${username}`}</span>
                    </p>
                </div>
                <p>
                    {`Vous pouvez le modifier à tout moment depuis les `}
                    <Link href="/settings" as="/parametres">
                        <a>paramètres de votre compte</a>
                    </Link>
                    .
                </p>
            </>,
            {
                color: 'is-success',
            }
        );
    const errorToast = message => {
        setLoading(false);

        addToast(
            message ||
                "Un problème est survenu, veuillez retenter l'opération.",
            {
                id: 'toast__social-login-error',
                color: 'is-danger',
                duration: 7500,
            }
        );
    };

    const onMessage = async (data, provider) => {
        if (data) {
            const callbackUrl = `${process.env.API_URL}/auth/${provider}/callback${data}`;
            const response = await fetch(callbackUrl, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status >= 400) {
                return errorToast();
            }

            const { token, newUser } = await response.json();

            try {
                const query = await apollo.query({
                    query: GET_CURRENT_USER,
                    context: { token },
                });

                const { currentUser } = query.data;

                authenticate(token, currentUser, dispatch);
                router.push('/');
                if (newUser) {
                    newUserToast(currentUser.username);
                }
            } catch {
                router.push('/');
                errorToast();
            }
            return null;
        }

        return errorToast();
    };

    useEffect(() => {
        const { query } = router;

        setLoading(true);

        if (hasQuery) {
            const queryString = window.location.search;
            onMessage(queryString, query.p);
            setLoading(null);

            return;
        }

        setLoading(false);
        setError(true);
    }, [hasQuery]);

    if (!hasQuery) {
        return <Error statusCode={404} />;
    }

    if (error && !loading) {
        return (
            <p>Une erreur est survenue, veuillez retenter l&#39;opération.</p>
        );
    }
    return <Loading onClick={() => router.push('/')} />;
};

OAuth.propTypes = {
    hasQuery: PropTypes.bool.isRequired,
};

OAuth.getInitialProps = context => ({
    hasQuery: !!Object.keys(context.query).length,
});

export default OAuth;
