/* eslint max-len: 0 */
const { isAuthenticate, isValidJwtPass } = require('../helpers/middlewares');
const {
    createUser,
    deleteUser,
    updateUser,
    createMessage,
    createVariety,
    createFeedback,
    updatePassword,
    recoveryPassword,
    updateUserMetadata,
    addVarietiesToUser,
    delVarietiesToUser,
} = require('../controllers');

const Mutation = {
    /*
     * PROTECTED ROUTES
     */

    // AccountCtrl
    deleteUser: (_, params, ctx) => isAuthenticate(ctx, (id) => deleteUser(id)),

    updateUser: (_, params, ctx) => isAuthenticate(ctx, (id) => updateUser(params, id)),
    updatePassword: (_, params, ctx) => isAuthenticate(ctx, (id) => updatePassword(params, id)),
    updateUserMetadata: (_, params, ctx) => isAuthenticate(ctx, (id) => updateUserMetadata(params, id)),

    // VarietyCtrl
    createVariety: (_, params, ctx) => isAuthenticate(ctx, (id) => createVariety(params, id)),

    // WantCtrl
    addWant: (_, params, ctx) => isAuthenticate(ctx, (id) => addVarietiesToUser(params, id, 'Want')),
    deleteWant: (_, params, ctx) => isAuthenticate(ctx, (id) => delVarietiesToUser(params, id, 'Want')),
    // StockCtrl
    addStock: (_, params, ctx) => isAuthenticate(ctx, (id) => addVarietiesToUser(params, id, 'Stock')),
    deleteStock: (_, params, ctx) => isAuthenticate(ctx, (id) => delVarietiesToUser(params, id, 'Stock')),
    recoveryPassword: (_, params, ctx) => isValidJwtPass(params, (id) => recoveryPassword(params, ctx, id)),

    // ChatCtrl
    createMessage: async (_, params, ctx) => isAuthenticate(ctx, async (id) => createMessage(params, id, ctx.pubsub)),
    /*
     * PUBLIC ROUTES
     */

    // AccountCtrl
    createUser: (_, params) => createUser(params),

    createFeedback: (_, params) => createFeedback(params),
};

module.exports = Mutation;
