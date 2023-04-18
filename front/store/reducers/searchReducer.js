import { ActionTypes as types } from 'store/actions/search';

const init = null;

export default (state = init, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SEARCH: {
            return payload;
        }

        default:
            return state;
    }
};
