const { Op } = require('sequelize');

const models = require('../../models');
const ApiError = require('../helpers/ApiError');
const textToSlug = require('../helpers/deleteSpecialChar');

const { sendNewVariety } = require('./MailCtrl');

const {
    setSearchVariety,
    setFiltersVariety,
    sortSearchBySimilarity,
} = require('../helpers/searchEngine');

const { error } = require('../constante');
const { inRange, isNumber } = require('../helpers/number');

const { Variety, Stock, Want } = models;

const VarietyCtrl = {
    // GET VARIETY BY ID
    async getVariety({ id }) {
        const variety = await Variety.findByPk(id, {
            include: { all: true },
        });
        if (!variety) throw new ApiError(error.varieties.FOUND);
        return variety;
    },

    // GET ALL VARIETIES WITH FILTERS AND PAGINATION
    async getAllVarieties(params) {
        console.log(params);
        const {
            filter,
            limit,
            page,
            sortBy,
            available,
            old,
            search = '',
        } = params;

        if (!inRange(limit) || !isNumber(page)) {
            throw new ApiError(error.pagination.TYPE);
        }
        const offset = page * limit;

        const { field, orderBy } = sortBy;

        let order = [[sortBy.field.toLowerCase(), orderBy]];

        if (field === 'family' || field === 'name') {
            order = [[field, orderBy]];
        }

        const { count, rows } = await Variety.findAndCountAll({
            limit,
            offset,
            order,
            where: setSearchVariety({ search, available, old }),
            include: setFiltersVariety(filter),
            attributes: [
                'name',
                'id',
                'icon',
                'latinName',
                'family',
                'available',
                'old',
            ],
        });

        sortSearchBySimilarity(rows, search);
        return { search: rows, count };
    },

    async getFields({ field }) {
        const fields = await models[field].findAll();
        return fields;
    },

    async searchVariety({ search = null }, userId) {
        const varieties = await Variety.findAll({
            limit: 20,
            where: setSearchVariety({ search }, true),
            attributes: ['name', 'family', 'id'],
        });

        const stock = await Stock.findAll({ where: { userId } });
        const want = await Want.findAll({ where: { userId } });

        sortSearchBySimilarity(varieties, search);
        varieties.map((variety) => {
            if (stock.filter((s) => s.varietyId === variety.id).length) {
                return Object.assign(variety, { foundIn: 'stock' });
            }
            if (want.filter((w) => w.varietyId === variety.id).length) {
                return Object.assign(variety, { foundIn: 'want' });
            }
            return variety;
        });
        return varieties;
    },

    // TODO: Temporary ! to delete
    async createVariety(params, id) {
        if (params.isUser) {
            const { name } = params;
            sendNewVariety({ name, id });
            return { id };
        }
        const {
            description, sowingTips, latinName, family, name,
        } = params;

        const icon = textToSlug(family);

        const [row, created] = await Variety.findOrCreate({
            defaults: {
                description,
                sowingTips,
                latinName,
                family,
                icon,
                name,
            },
            where: { [Op.and]: { family, name } },
        });

        if (!created) throw new ApiError(error.varieties.ALREADY_EXIST);

        row.setGrowingMethods(params.growingMethods);
        row.setSoilQualities(params.soilQualities);
        row.setPrecocities(params.precocities);
        row.setSoilNatures(params.soilNatures);
        row.setExpositions(params.expositions);
        row.setWaterNeeds(params.waterNeeds);

        const setPeriods = (model, arrayPeriods) => {
            if (arrayPeriods && arrayPeriods.length) {
                arrayPeriods.map(async (date) => {
                    const { startDate, endDate } = date;
                    const field = await model.create({
                        startDate,
                        endDate,
                    });
                    field.setVarieties(row.id);
                });
            }
        };
        setPeriods(models.ShelteredSowingDate, params.shelteredSowingDate);
        setPeriods(models.DirectSowingDate, params.directSowingDate);
        setPeriods(models.HarvestDate, params.harvestDate);

        return row;
    },
};

module.exports = VarietyCtrl;
