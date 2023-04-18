import { ActionTypes as types } from 'store/actions/toast';

const init = [];

export default (state = init, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.ADD_TOAST:
            return [...state, payload];

        case types.REMOVE_TOAST:
            return state.filter(toast => toast.id !== payload);

        case types.UPDATE_TOAST_MODIFIER:
            return state.map((toast, index) =>
                index !== payload.index
                    ? toast
                    : { ...toast, modifier: payload.modifier }
            );

        default:
            return state;
    }
};
