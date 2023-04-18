const { Op } = require('sequelize');

const models = require('../../models');

const { Variety } = models;
const ApiError = require('../helpers/ApiError');
const {
    setSearchVariety,
    sortSearchBySimilarity,
} = require('../helpers/searchEngine');
const { inRange, isNumber } = require('../helpers/number');
const ThumbnailLink = require('../helpers/ThumbnailLink');

const { error } = require('../constante');

const InventoryCtrl = {
    async getVarietiesFromUser(
        {
            sortBy, limit, page, search = '',
        },
        userId,
        list,
        shared = {},
    ) {
        if (!inRange(limit) || !isNumber(page)) {
            throw new ApiError(error.pagination.TYPE);
        }

        const offset = page * limit;

        const { field, orderBy } = sortBy;

        let order = [[sortBy.field.toLowerCase(), orderBy]];

        if (field === 'family' || field === 'name') {
            order = [['varieties', field, orderBy]];
        }

        const { count, rows } = await models[list].findAndCountAll({
            offset,
            limit,
            order,
            where: { userId, deleted: false, ...shared },
            include: {
                association: 'varieties',
                where: setSearchVariety({ search }),
            },
        });

        if (!rows) throw new ApiError(error[list].FOUND);

        sortSearchBySimilarity(rows, search);

        return { [list]: rows, count };
    },

    async addVarietiesToUser(params, userId, list) {
        const { varietyId, shared } = params;
        const found = await Variety.findByPk(varietyId);

        if (!found) throw new ApiError(error.varieties.FOUND);

        const otherList = list === 'Stock' ? 'Want' : 'Stock';

        const foundInOtherList = await models[otherList].findOne({
            where: { varietyId, userId, deleted: false },
        });

        if (foundInOtherList) throw new ApiError(error.otherList.FOUND, { path: `add${list}` });

        const [row, created] = await models[list].findOrCreate({
            defaults: {
                ...params,
                userId,
            },
            where: { [Op.and]: { varietyId, userId } },
            include: 'varieties',
        });

        if (!row) throw new ApiError(error[list].FOUND);

        if (created) {
            if (shared) await found.increment('available');
            await row.reload();
        } else {
            if ((row.deleted || !row.shared) && shared) {
                found.increment('available');
            } else if (!shared && row.shared) {
                found.decrement('available');
            }
            await row.update({ ...params, userId, deleted: false });
        }

        ThumbnailLink.set(userId);

        return row;
    },

    async delVarietiesToUser({ varietyId }, userId, list) {
        const count = await Variety.count();

        if (varietyId > count) throw new ApiError(error.varieties.FOUND);

        const row = await models[list].findOne({
            where: { [Op.and]: { varietyId, userId } },
            include: 'varieties',
        });
        if (!row) throw new ApiError(error[list].FOUND);

        if (row.deleted) throw new ApiError(error[list].ALREADY_REMOVE);

        if (row.shared) Variety.decrement('available', { where: { id: varietyId } });

        await row.update(
            {
                quantity: 0,
                sharedQuantity: 0,
                deleted: true,
                shared: false,
            },
            { hooks: false },
        );

        ThumbnailLink.set(userId);

        return row;
    },

    async getNumberOfSharesVariety({ VarietyId }) {
        const { available } = await Variety.findOne({
            where: { id: VarietyId },
        });
        return available;
    },
};

module.exports = InventoryCtrl;
