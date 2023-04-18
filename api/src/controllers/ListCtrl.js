const { User } = require('../../models');

const { getVarietiesFromUser } = require('./InventoryCtrl');

const ApiError = require('../helpers/ApiError');
const { error } = require('../constante');

const listCtrl = {
    async getList(params, list) {
        const { hashId } = params;
        const user = await User.findOne({ where: { hashId } });

        if (!user) throw new ApiError(error.user.FOUND);

        const { id } = user;

        const shared = list === 'Stock' ? { shared: true } : {};
        return getVarietiesFromUser(params, id, list, shared);
    },
};

module.exports = listCtrl;
