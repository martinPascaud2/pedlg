import { useContext } from 'react';

import { ModalContext } from 'components/Modal/ModalContext';

const useModal = () => {
    const { openModal, closeModal } = useContext(ModalContext);

    return {
        openModal,
        closeModal,
    };
};

export default useModal;
