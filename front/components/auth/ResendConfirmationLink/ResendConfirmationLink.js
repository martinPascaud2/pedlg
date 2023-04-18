import { useState } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@iconify/react';
import mail from '@iconify/icons-mdi/email-sync';
import mailCheck from '@iconify/icons-mdi/email-check';
import spin from '@iconify/icons-mdi/loading';
import alert from '@iconify/icons-mdi/alert-circle';

import useLazyQuery from 'hooks/useLazyQuery';

import { RESEND_CONFIRMATION_MAIL } from 'lib/gql/queries';
import parse from 'lib/utils/parseApolloErrors';

const ResendConfirmationLink = ({ id }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [validated, setValidated] = useState(false);

    const onError = error => {
        const { serverErrors } = parse(error);

        if (serverErrors[0].message === 'USER_ALREADY_VALIDATED') {
            setErrorMessage('Votre compte est déjà validé !');
            setValidated(true);
        } else {
            setErrorMessage('Une erreur est survenue, veuillez réessayer.');
        }
    };

    const [resendMail, { called, loading, success }] = useLazyQuery(
        RESEND_CONFIRMATION_MAIL,
        {
            variables: { id },
            onError,
        }
    );

    const resendLink = event => {
        event.preventDefault();

        if (!loading && !validated) {
            resendMail();
        }
    };

    return (
        <a href="#" role="button" className="icon-wrapper" onClick={resendLink}>
            <span className="icon is-left">
                {called || <Icon icon={mail} />}
                {called && loading && (
                    <Icon icon={spin} className="is-spinning" />
                )}
                {called && success && <Icon icon={mailCheck} />}
                {called && !loading && errorMessage && <Icon icon={alert} />}
            </span>

            {errorMessage || "Renvoyez l'e-mail de confirmation"}
        </a>
    );
};

ResendConfirmationLink.propTypes = {
    id: PropTypes.number.isRequired,
};

export default ResendConfirmationLink;
