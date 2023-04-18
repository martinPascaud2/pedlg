import { ActionTypes as types } from 'store/actions/auth';

const init = {
    loggedIn: false,
    currentUser: {},
};

export default (state = init, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.AUTHENTICATE:
            return {
                ...state,
                loggedIn: true,
                currentUser: payload,
            };

        case types.DEAUTHENTICATE:
            return init;

        case types.UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...payload,
                },
            };

        case types.UPDATE_CURRENT_USER_META:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    userMetadata: {
                        ...state.currentUser.userMetadata,
                        ...payload,
                    },
                },
            };

        default:
            return state;
    }
};
