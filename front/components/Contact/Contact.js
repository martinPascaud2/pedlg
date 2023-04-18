import Feedback from 'components/Contact/Feedback';
import PropTypes from 'prop-types';

import { useMutation } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import { useToast } from 'hooks';

import { CREATE_FEEDBACK } from 'lib/gql/mutations';

import parse from 'lib/utils/parseApolloErrors';

const Contact = ({ popup }) => {
    const {
        currentUser: { email },
    } = useSelector(state => state.auth);

    const { addToast } = useToast();

    const onCompleted = () => {
        addToast(
            <>
                <div className="has-margin-bottom-2">
                    <span className="has-text-weight-bold">Merci beaucoup</span>
                    {' !'}
                </div>
                <p>Votre avis est important pour nous.</p>
                <p>
                    {`Cela permet une amélioration continue de notre
                site web.`}
                </p>
            </>,
            {
                color: 'is-success',
            }
        );
    };

    const onError = data => {
        const { inputErrors, serverErrors } = parse(data);

        if (serverErrors.length || inputErrors.length) {
            addToast(
                "Un problème est survenu, veuillez retenter l'opération.",
                {
                    id: 'toast__register-error',
                    color: 'is-danger',
                    duration: 7500,
                }
            );
        }
    };

    const [createFeedback, { loading }] = useMutation(CREATE_FEEDBACK, {
        onCompleted,
        onError,
    });

    return (
        <Feedback
            popup={popup}
            loading={loading}
            onSubmit={data => {
                createFeedback({
                    variables: data.email ? data : { ...data, email },
                });
            }}
        />
    );
};

Contact.propTypes = {
    popup: PropTypes.bool,
};

Contact.defaultProps = {
    popup: false,
};

export default Contact;
