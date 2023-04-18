import { createContext, useCallback, useState, useEffect } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';

import ModalContainer from 'components/Modal/ModalContainer';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(null);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [modalSize, setModalSize] = useState(null);

    const openModal = useCallback(
        (content, size = null) => {
            setModalSize(size);
            setModalContent(content);
        },
        [setModalSize, setModalContent]
    );

    const closeModal = useCallback(() => {
        if (modalContent && !isModalClosing) {
            setIsModalClosing(true);

            setTimeout(() => {
                setIsModalClosing(false);
                setModalContent(null);
                setModalSize(null);
            }, 250);
        }
    }, [
        modalContent,
        setModalContent,
        isModalClosing,
        setIsModalClosing,
        setModalSize,
    ]);

    useEffect(() => {
        const onKeydown = event => event.key === 'Escape' && closeModal();

        if (modalContent) {
            window.addEventListener('keydown', onKeydown);
        }

        if (isModalClosing) {
            window.removeEventListener('keydown', onKeydown);
        }

        return () => window.removeEventListener('keydown', onKeydown);
    }, [closeModal, modalContent, isModalClosing]);

    useEffect(() => {
        Router.events.on('routeChangeStart', closeModal);

        return () => Router.events.off('routeChangeStart', closeModal);
    }, [closeModal]);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {modalContent && (
                <ModalContainer
                    content={modalContent}
                    isClosing={isModalClosing}
                    closeModal={closeModal}
                    modalSize={modalSize}
                />
            )}
            {children}
        </ModalContext.Provider>
    );
};

ModalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ModalContext, ModalProvider };
