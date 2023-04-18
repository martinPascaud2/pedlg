const AUTHENTICATE = 'AUTHENTICATE';
const DEAUTHENTICATE = 'DEAUTHENTICATE';
const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
const UPDATE_CURRENT_USER_META = 'UPDATE_CURRENT_USER_META';

export const ActionTypes = {
    AUTHENTICATE,
    DEAUTHENTICATE,
    UPDATE_CURRENT_USER,
    UPDATE_CURRENT_USER_META,
};

export const authenticate = payload => ({
    type: AUTHENTICATE,
    payload,
});

export const deauthenticate = () => ({
    type: DEAUTHENTICATE,
});

export const updateCurrentUser = payload => ({
    type: UPDATE_CURRENT_USER,
    payload,
});

export const updateCurrentUserMeta = payload => ({
    type: UPDATE_CURRENT_USER_META,
    payload,
});
