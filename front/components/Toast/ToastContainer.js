import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

import Toast from 'components/Toast';

import css from './ToastContainer.module.scss';

const ToastContainer = () => {
    const toasts = useSelector(state => state.toasts);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);

        return () => setIsReady(false);
    }, [setIsReady]);

    return (
        isReady &&
        createPortal(
            <aside id={css['pedlg__toast-wrapper']}>
                {toasts.length > 0 && (
                    <div className={css['pedlg__toast-slot']}>
                        {toasts.map(toast => (
                            <Toast
                                id={toast.id}
                                key={toast.id}
                                options={toast.options}
                                modifier={toast.modifier}
                            >
                                {toast.content}
                            </Toast>
                        ))}
                    </div>
                )}
            </aside>,
            document.body
        )
    );
};

export default ToastContainer;
