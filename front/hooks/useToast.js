import { useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { ActionTypes as types } from 'store/actions/toast';

const defaultOptions = { color: '', duration: 0 };

const makeId = () =>
    `_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

const newToast = (id, options, content) => ({
    id,
    options: { ...defaultOptions, ...options },
    modifier: 'is-created',
    content,
});

const useToast = () => {
    const dispatch = useDispatch();
    const toasts = useSelector(state => state.toasts);

    const updateToast = useCallback(
        (id, modifier) => {
            const index = toasts.findIndex(item => item.id === id);

            if (index !== -1) {
                return dispatch({
                    type: types.UPDATE_TOAST_MODIFIER,
                    payload: { index, modifier },
                });
            }

            throw new Error({
                location: 'updateToast',
                message: 'Toast not found',
            });
        },
        [toasts, dispatch]
    );

    const addToast = useCallback(
        (content, customOptions = {}) => {
            const { id, ...options } = customOptions;

            if (id) {
                try {
                    return updateToast(id, 'is-shakey');
                } catch {
                    return dispatch({
                        type: types.ADD_TOAST,
                        payload: newToast(id, options, content),
                    });
                }
            }

            return dispatch({
                type: types.ADD_TOAST,
                payload: newToast(makeId(), options, content),
            });
        },
        [dispatch, updateToast]
    );

    const removeToast = useCallback(
        id =>
            dispatch({
                type: types.REMOVE_TOAST,
                payload: id,
            }),
        [dispatch]
    );

    useEffect(() => {
        const handler = () => {
            toasts.forEach(toast => removeToast(toast.id));
        };

        Router.events.on('routeChangeStart', handler);

        return () => Router.events.off('routeChangeStart', handler);
    }, [toasts, removeToast]);

    return {
        addToast,
        removeToast,
        updateToast,
    };
};

export default useToast;
