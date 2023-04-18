import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import decode from 'jwt-decode';

import { VERIFY_MAIL } from 'lib/gql/queries';
import { isGuest } from 'lib/utils/auth';
import parser from 'lib/utils/parseApolloErrors';

import { useToast, useModal } from 'hooks';

import LoginModal from 'components/auth/LoginModal';
import ResendConfirmationLink from 'components/auth/ResendConfirmationLink';

const Index = dynamic(() => import('../index'));

const Confirmation = ({ token, data, error }) => {
    const router = useRouter();
    const { addToast } = useToast();
    const { openModal } = useModal();
    let notify;

    useEffect(() => {
        if (notify) {
            router.replace('/');
            notify();
        }
    }, [notify, router]);

    if (error) {
        const { serverErrors } = parser(error);

        if (serverErrors[0].message === 'NOT_UPDATED') {
            const { userId } = decode(token);

            notify = () =>
                addToast(
                    <>
                        <p className="has-padding-bottom-2">
                            Une erreur est survenue lors de la validation de
                            votre inscription.
                        </p>
                        <ResendConfirmationLink id={userId} />
                    </>,
                    {
                        color: 'is-danger',
                    }
                );

            return <Index />;
        }
    }

    if (data && ['verifyMail'].indexOf(Object.keys(data) !== -1)) {
        notify = () => {
            if (data.verifyMail) {
                openModal(<LoginModal />);
                addToast(
                    'Votre compte a été validé, vous pouvez à présent vous connecter !',
                    {
                        color: 'is-success',
                        duration: 7500,
                    }
                );
            } else {
                addToast('Votre compte est déjà validé !', {
                    color: 'is-info',
                    duration: 7500,
                });
            }
        };

        return <Index />;
    }

    return <Error statusCode={404} />;
};

Confirmation.getInitialProps = async context => {
    const { apolloClient, query } = context;
    const { token } = query;

    if (token) {
        try {
            const response = await apolloClient.query({
                query: VERIFY_MAIL,
                variables: { token },
            });

            return { token, data: response.data };
        } catch (error) {
            return { token, error };
        }
    }

    return {};
};

Confirmation.propTypes = {
    token: PropTypes.string,
    data: PropTypes.shape({
        verifyMail: PropTypes.bool,
    }),
    error: PropTypes.shape({
        path: PropTypes.string,
        message: PropTypes.string,
        type: PropTypes.string,
    }),
};

Confirmation.defaultProps = {
    token: null,
    data: null,
    error: null,
};

export default isGuest(Confirmation);
