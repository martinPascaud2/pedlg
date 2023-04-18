const {
    isAuthenticate,
    isValidJwtMail,
    isValidJwtPass,
} = require('../helpers/middlewares');

const {
    login,
    logout,
    getUser,
    getRoomId,
    getAllUsers,
    getVariety,
    getMessages,
    getAllVarieties,
    getAllRoomByUser,
    getVarietiesFromUser,
    verifyMail,
    resendConfirmationMail,
    forgotPassword,
    currentUser,
    refreshToken,
    getFields,
    getList,
    searchVariety,
    getNumberOfSharesVariety,
    getUsersWithVariety,
} = require('../controllers');

const Query = {
    /*
     * PROTECTED ROUTES
     */

    // AccountCtrl
    verifyMail: (_, params) => isValidJwtMail(params, (id) => verifyMail(id)),
    logout: (_, params, ctx) => isAuthenticate(ctx, (id) => logout(id, ctx)),
    currentUser: (_, params, ctx) => isAuthenticate(ctx, (id) => currentUser(id)),
    protectedRecovery: (_, params) => isValidJwtPass(params),
    refreshToken: (_, params, ctx) => refreshToken(ctx),

    // VarietyCtrl
    searchVariety: (_, params, ctx) => isAuthenticate(ctx, (id) => searchVariety(params, id)),

    getFields: (_, params) => getFields(params),

    // StockCtrl
    getStock: (_, params, ctx) => isAuthenticate(ctx, (id) => getVarietiesFromUser(params, id, 'Stock')),

    // WantCtrl
    getWant: (_, params, ctx) => isAuthenticate(ctx, (id) => getVarietiesFromUser(params, id, 'Want')),

    /*
     * PUBLIC ROUTES
     */

    // AccountCtrl
    login: (_, params, { res }) => login(params, res),
    resendConfirmationMail: (_, params) => resendConfirmationMail(params),
    forgotPassword: (_, params) => forgotPassword(params),

    // UserCtrl
    getUser: (_, params) => getUser(params),
    getAllUsers: (_, params) => getAllUsers(params),
    getUsersWithVariety: (_, params) => getUsersWithVariety(params),

    // VarietyCtrl
    getVariety: (_, params) => getVariety(params),
    getAllVarieties: (_, params) => getAllVarieties(params),
    getNumberOfSharesVariety: (_, params) => getNumberOfSharesVariety(params),

    // ListCtrl
    getWantList: (_, params) => getList(params, 'Want'),
    getStockList: (_, params) => getList(params, 'Stock'),

    // ChatCtrl

    getMessages: (_, params, ctx) => isAuthenticate(ctx, (id) => getMessages(params, id)),
    getRoomId: (_, params, ctx) => isAuthenticate(ctx, (id) => getRoomId(params, id)),
    getAllRoomByUser: (_, params, ctx) => isAuthenticate(ctx, (id) => getAllRoomByUser(id)),
};

module.exports = Query;
