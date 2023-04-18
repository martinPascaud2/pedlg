const models = require('../../models');
const ApiError = require('../helpers/ApiError');

const { error } = require('../constante');

const { User } = models;

const UserCtrl = {
    async currentUser(id) {
        const user = await User.findOne({
            where: { id },
            include: 'userMetadata',
        });

        if (!user) throw new ApiError(error.user.FOUND);

        return user;
    },
    async getUser({ hashId }) {
        const user = await User.findOne({
            where: { hashId },
            include: 'userMetadata',
        });

        if (!user) throw new ApiError(error.user.FOUND);

        return user;
    },

    async getAllUsers(args) {
        console.log(args); // TODO: delete this
        return User.findAll();
    },

    async getUsersWithVariety({ varietyId, list }) {
        const where = {
            varietyId,
            deleted: false,
            ...(list === 'Stock' ? { shared: true } : {}),
        };

        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [{ association: list.toLowerCase(), where }],
        });

        return users;
    },
};

module.exports = UserCtrl;
