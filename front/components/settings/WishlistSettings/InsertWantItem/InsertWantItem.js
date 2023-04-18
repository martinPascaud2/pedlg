import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import { useToast, useModal } from 'hooks';

import c from 'classnames';

import { ADD_WANT } from 'lib/gql/mutations';
import parse from 'lib/utils/parseApolloErrors';

const InsertWantItem = ({ title, item }) => {
    const { variety } = item;
    const { addToast } = useToast();
    const { closeModal } = useModal();

    const [add, { loading }] = useMutation(ADD_WANT, {
        onCompleted: () => {
            addToast('Votre liste de souhaits a été mise à jour avec succès.', {
                color: 'is-success',
                duration: 7500,
            });
            closeModal();
        },
        onError: data => {
            const { serverErrors } = parse(data);
            let isWarning = false;

            serverErrors.forEach(error => {
                if (
                    error?.message &&
                    error.message === 'ALREADY_EXIST_IN_OTHER_LIST'
                ) {
                    isWarning = true;
                    addToast(
                        'Cette variété est présente dans la liste de votre inventaire.',
                        {
                            id: 'toast__already-exists-error',
                            color: 'is-warning',
                            duration: 7500,
                        }
                    );
                }
            });
            if (!isWarning && serverErrors.length) {
                addToast(
                    "Un problème est survenu, veuillez retenter l'opération.",
                    {
                        id: 'toast__unexpected-error',
                        color: 'is-danger',
                        duration: 7500,
                    }
                );
            }
        },
    });

    const onSubmit = () => {
        const varietyId = variety.id;
        add({ variables: { varietyId } });
    };

    return (
        <div className="box">
            <h4 className="title is-4">{title}</h4>
            <h6 className="subtitle is-6">
                {`${variety.family}, ${variety.name}`}
            </h6>

            <hr />
            <div className="content">
                Souhaitez-vous ajouter cette variété à votre liste de souhaits ?
            </div>

            <button
                disabled={loading}
                loading={loading ? 'true' : undefined}
                type="button"
                onClick={onSubmit}
                className={c('button is-primary is-fullwidth', {
                    'is-loading': loading,
                })}
            >
                Ajouter
            </button>
        </div>
    );
};

InsertWantItem.propTypes = {
    title: PropTypes.string.isRequired,
    item: PropTypes.shape({
        variety: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            family: PropTypes.string,
        }),
    }).isRequired,
};

export default InsertWantItem;
