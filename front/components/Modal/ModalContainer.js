import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';

const ModalContainer = ({ closeModal, isClosing, modalSize, content }) => {
    return createPortal(
        <Modal size={modalSize} close={closeModal} isClosing={isClosing}>
            {content}
        </Modal>,
        document.body
    );
};

ModalContainer.propTypes = {
    closeModal: PropTypes.func.isRequired,
    isClosing: PropTypes.bool.isRequired,
    content: PropTypes.node.isRequired,
    modalSize: PropTypes.string,
};

ModalContainer.defaultProps = {
    modalSize: null,
};

export default ModalContainer;
