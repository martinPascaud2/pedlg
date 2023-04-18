const SEARCH = 'SEARCH';

export const ActionTypes = {
    SEARCH,
};

export const searchTerm = payload => ({
    type: SEARCH,
    payload,
});
