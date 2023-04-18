/* eslint no-param-reassign:
  ["error", { "props": true, "ignorePropertyModificationsFor": ["varieties"] }]
*/

const { Op, Sequelize } = require('sequelize');

const stringSimilarity = require('string-similarity');

const setSearchVariety = (params, required = false) => {
    const { search, available, old } = params;

    const splitedSearch = search.split(
        /[!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~\s\t\r\n\v\f0-9]+/g,
    );
    const keywords = splitedSearch
        .map((keyword) => {
            if (!keyword && required) return null;
            return { [Op.like]: `%${keyword.trim()}%` };
        })
        .filter((word) => word !== null);

    return {
        [Op.or]: [
            Sequelize.where(
                Sequelize.fn(
                    'concat',
                    Sequelize.col('family'),
                    ' ',
                    Sequelize.col('name'),
                ),
                {
                    [Op.and]: keywords,
                },
            ),
            { family: { [Op.and]: keywords } },
            { name: { [Op.and]: keywords } },
        ],
        ...(available ? { available: { [Op.gt]: 0 } } : {}),
        ...(old ? { old: { [Op.gt]: 0 } } : {}),
    };
};

const setFiltersVariety = (filter) => {
    const include = [];

    if (filter) {
        Object.keys(filter).forEach((key) => {
            const value = filter[key];

            if (
                key === 'shelteredSowingDate'
                || key === 'directSowingDate'
                || key === 'harvestDate'
            ) {
                if (value) {
                    include.push({
                        association: key,
                        where: {
                            startDate: { [Op.gte]: value.startDate },
                            endDate: { [Op.lte]: value.endDate },
                        },
                    });
                }
            } else if (value) {
                include.push({
                    association: key,
                    where: { id: { [Op.in]: value } },
                });
            }
        });
    }
    return include;
};

const sortSearchBySimilarity = (varieties, search) => {
    varieties.forEach((variety, i) => {
        const { family, name } = variety;
        const dbString = `${family} ${name}`;
        varieties[i].similarity = stringSimilarity.compareTwoStrings(
            dbString,
            search,
        );
    });
    varieties.sort((first, second) => second.similarity - first.similarity);
};

module.exports = {
    sortSearchBySimilarity,
    setFiltersVariety,
    setSearchVariety,
};
