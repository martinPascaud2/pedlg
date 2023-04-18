import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import { VERIFY_TOKEN } from 'lib/gql/queries';
import { isGuest } from 'lib/utils/auth';

import { useModal } from 'hooks';

import PasswordResetModal from 'components/auth/PasswordResetModal';

const Index = dynamic(() => import('../index'));

const Recovery = ({ token, result }) => {
    const router = useRouter();
    const { openModal } = useModal();

    useEffect(() => {
        if (token && result) {
            router.replace('/');
            openModal(<PasswordResetModal token={token} />, 'is-small');
        }
    }, [token, result, router, openModal]);

    return token && result ? <Index /> : <Error statusCode={404} />;
};

Recovery.getInitialProps = async context => {
    const { apolloClient, query } = context;
    const { token } = query;

    if (token) {
        try {
            const response = await apolloClient.query({
                query: VERIFY_TOKEN,
                variables: { guard: true, token },
            });

            return { token, result: response.data.protectedRecovery };
        } catch {
            return {};
        }
    }

    return {};
};

Recovery.propTypes = {
    token: PropTypes.string,
    result: PropTypes.bool,
};

Recovery.defaultProps = {
    token: null,
    result: false,
};

export default isGuest(Recovery);
