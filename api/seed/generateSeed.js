/* eslint-disable */
const sequelize = require('sequelize');

require('dotenv').config();

const { Op } = sequelize;
const varieties = require('./list_seed.json');
const models = require('../models');

const {
    Family,
    Variety,
    DirectSowingDate,
    ShelteredSowingDate,
    Exposition,
    SoilQuality,
    WaterNeed,
    SoilNature,
    Precocity,
    GrowingMethod,
    HarvestDate,
    Usage,
} = models;

const EMPTY_INFO = null;

const deleteSpecialChar = str => {
    if (typeof str === 'string') {
        let s = str;
        const rawAccentStr = 'ÀÁÂàáâÈÉÊèéêÇçÛûôï';
        const notAccentStr = 'aaaaaaeeeeeeccuuoi';
        const rawAccentTab = rawAccentStr.split('');
        const notAccentTab = notAccentStr.split('');
        const tabCorrAcc = [];
        let i = -1;
        while (rawAccentTab[++i]) {
            tabCorrAcc[rawAccentTab[i]] = notAccentTab[i];
        }
        s = s.replace(/./g, key => (tabCorrAcc[key] ? tabCorrAcc[key] : key));
        return s.toLowerCase();
    }
    return str;
};

const objectKeyByValue = (obj, val) =>
    Object.entries(obj).find(i => i[1] === val);

const parsePeriod = period => {
    const months = {
        janvier: 1,
        fevrier: 2,
        mars: 3,
        avril: 4,
        mai: 5,
        juin: 6,
        juillet: 7,
        aout: 8,
        septembre: 9,
        octobre: 10,
        novembre: 11,
        decembre: 12,
    };
    const splitPeriod = period.split(/, |,|\s/);
    const parsedPeriods = splitPeriod.map(
        month => months[deleteSpecialChar(month)]
    );
    let tmp = 0;
    const periodsArray = [];
    parsedPeriods.forEach((p, i) => {
        const nbrNextMonth = parsedPeriods[i + 1];
        const lenPeriod = parsedPeriods.length;
        if (p + 1 !== nbrNextMonth) {
            periodsArray.push([parsedPeriods[tmp], p]);
            tmp = i + 1;
        }
    });

    return periodsArray;
};

const createFieldDate = async (model, infos, varietyId) => {
    if (infos) {
        const periodsParsed = parsePeriod(infos);

        for (item of periodsParsed) {
            let [startDate, endDate] = item;
            if (!endDate) endDate = startDate;
            const isFound = await model.findOne({
                where: {
                    [Op.and]: [{ startDate }, { endDate }],
                },
            });
            if (!isFound) {
                const field = await model.create({
                    startDate,
                    endDate,
                });
                await field.setVarieties(varietyId);
            } else {
                await isFound.addVariety(varietyId);
            }
        }
    }
};

const parseInfos = infos => {
    const splitInfos = infos.split(/, | ,|,/);
    return splitInfos.map(info => deleteSpecialChar(info));
};

const createField = async (model, infos, varietyId) => {
    if (infos) {
        const infosParsed = parseInfos(infos);

        for (const item of infosParsed) {
            const isFound = await model.findOne({
                where: { nameFr: item },
            });
            if (!isFound) {
                const field = await model.create({ nameFr: item });
                await field.setVarieties(varietyId);
            } else {
                await isFound.addVariety(varietyId);
            }
        }
    }
};
const generateSeed = async nbrToAdd => {
    try {
        let len = varieties.length;
        if (nbrToAdd && nbrToAdd < len) {
            len = nbrToAdd;
        }
        const tab = [];
        for (let i = 0; i < len; i += 1) {
            console.clear();
            console.log(i + 1, '/', len, 'varieties added to the database.');

            // Variety TABLE

            const { family } = varieties[i];
            const latinName = varieties[i].latinName || EMPTY_INFO;
            const name = varieties[i].variety;
            const slug = deleteSpecialChar(family).replace(/[\s'’\/–]+/g, '-');
            if (!tab.includes(slug)) tab.push(slug);

            if (!family || !name) continue;

            const parseName = name.split(/\s\/\s/)[0] || name;
            const description = varieties[i].description || EMPTY_INFO;
            const old = description ? description?.includes('ancien') : false;
            const sowingTips = varieties[i].conseil_semis || EMPTY_INFO;

            const [variety] = await Variety.findOrCreate({
                where: { name: parseName, family },
                defaults: {
                    name: parseName,
                    description,
                    sowingTips,
                    latinName,
                    family,
                    old,
                    icon: slug,
                },
            });

            const varietyId = variety.id;

            // //////////////////////////////////////////////////////////////////////

            // DirectSowingDate TABLE
            await createFieldDate(
                DirectSowingDate,
                varieties[i].periode_semis_terre,
                varietyId
            );

            // //////////////////////////////////////////////////////////////////////

            // ShelteredSowingDate TABLE
            await createFieldDate(
                ShelteredSowingDate,
                varieties[i].periode_semis_abri,
                varietyId
            );

            // //////////////////////////////////////////////////////////////////////

            // HarvestDate TABLE

            await createFieldDate(
                HarvestDate,
                varieties[i].periode_recolte,
                varietyId
            );

            // //////////////////////////////////////////////////////////////////////

            // Exposition TABLE
            await createField(
                Exposition,
                varieties[i].exposition_espece,
                varietyId
            );

            // //////////////////////////////////////////////////////////////////////

            // SoilQuality TABLE
            await createField(
                SoilQuality,
                varieties[i].qualite_sol_espece,
                varietyId
            );

            // //////////////////////////////////////////////////////////////////////

            // WaterNeed TABLE
            await createField(
                WaterNeed,
                varieties[i].besoin_eau_espece,
                varietyId
            );

            // //////////////////////////////////////////////////////////////////////

            // Usage TABLE
            await createField(Usage, varieties[i].utilisation, varietyId);

            // //////////////////////////////////////////////////////////////////////

            // SoilNature TABLE
            await createField(
                SoilNature,
                varieties[i].nature_sol_espece,
                varietyId
            );

            // //////////////////////////////////////////////////////////////////////

            // Precocity TABLE
            await createField(
                Precocity,
                varieties[i].precocite_variete,
                varietyId
            );

            // //////////////////////////////////////////////////////////////////////

            // GrowingMethod TABLE
            const semisVariete = varieties[i].semis_variete || EMPTY_INFO;
            const cultureVariete = varieties[i].culture_variete || EMPTY_INFO;
            const allGrowingMethods =
                semisVariete && cultureVariete
                    ? semisVariete.concat(', ', cultureVariete)
                    : cultureVariete ?? semisVariete ?? null;
            if (!!allGrowingMethods)
                await createField(GrowingMethod, allGrowingMethods, varietyId);

            // //////////////////////////////////////////////////////////////////////
        }
        tab.map(t => console.log(t));
    } catch (e) {
        console.log(e);
    }
};

module.exports = generateSeed;
