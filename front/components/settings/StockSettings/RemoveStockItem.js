import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import { useToast, useModal } from 'hooks';

import { DEL_STOCK } from 'lib/gql/mutations';

const RemoveStockItem = ({ variety, onUpdate }) => {
    const { addToast } = useToast();
    const { closeModal } = useModal();
    const [del, { loading }] = useMutation(DEL_STOCK, {
        onCompleted: () => {
            addToast('Votre inventaire a été mis à jour avec succès.', {
                id: 'toast__remove-stock-item-success',
                color: 'is-success',
                duration: 7500,
            });
            onUpdate();
            closeModal();
        },
        onError: () => {
            addToast(
                "Un problème est survenu, veuillez retenter l'opération.",
                {
                    id: 'toast__remove-stock-item-error',
                    color: 'is-danger',
                    duration: 7500,
                }
            );
        },
    });

    return (
        <div className="box">
            <h4 className="title is-4">Retrait</h4>
            <h6 className="subtitle is-6">
                Voulez-vous retirer
                <span className="has-text-weight-bold">
                    {` ${variety.family}, ${variety.name} `}
                </span>
                de votre inventaire ?
            </h6>

            <hr />

            <button
                type="button"
                className="button is-fullwidth is-danger"
                onClick={() => del({ variables: { varietyId: variety.id } })}
                disabled={loading}
            >
                Confirmer
            </button>
        </div>
    );
};

RemoveStockItem.propTypes = {
    variety: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        family: PropTypes.string,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default RemoveStockItem;
