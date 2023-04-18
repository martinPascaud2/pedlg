const ADD_TOAST = 'ADD_TOAST';
const REMOVE_TOAST = 'REMOVE_TOAST';
const UPDATE_TOAST_MODIFIER = 'UPDATE_TOAST';

export const ActionTypes = {
    ADD_TOAST,
    REMOVE_TOAST,
    UPDATE_TOAST_MODIFIER,
};

export const addToast = payload => ({
    type: ADD_TOAST,
    payload,
});

export const removeToast = payload => ({
    type: REMOVE_TOAST,
    payload,
});

export const updateToastModifier = payload => ({
    type: UPDATE_TOAST_MODIFIER,
    payload,
});
