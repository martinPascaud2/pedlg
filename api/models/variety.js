module.exports = (sequelize, DataTypes) => {
    const Variety = sequelize.define(
        'Variety',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'VARIETY_UNIQUE',
                },
                validate: {
                    len: {
                        args: [1, 100],
                        msg: 'VARIETY_NAME_LEN',
                    },
                },
            },
            family: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'family',
                validate: {
                    len: {
                        args: [1, 100],
                        msg: 'FAMILY_LEN',
                    },
                },
            },
            description: {
                type: DataTypes.TEXT,
                validate: {
                    len: {
                        args: [1, 2048],
                        msg: 'DESCRIPTION_LEN',
                    },
                },
            },
            old: {
                type: DataTypes.BOOLEAN,
            },
            sowingTips: {
                type: DataTypes.TEXT,
                field: 'sowing_tips',
                validate: {
                    len: {
                        args: [1, 2048],
                        msg: 'SOWING_TIPS_LEN',
                    },
                },
            },
            icon: {
                type: DataTypes.STRING,
            },
            latinName: {
                type: DataTypes.STRING,
                field: 'latin_name',
                validate: {
                    len: {
                        args: [1, 100],
                        msg: 'LATIN_NAME_LEN',
                    },
                },
            },
            available: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {},
    );
    Variety.associate = (models) => {
        Variety.hasMany(models.Want, {
            foreignKey: 'varietyId',
        });

        // Variety.hasMany(models.Request, {
        //     foreignKey: 'varietyId',
        // });

        Variety.hasMany(models.Stock, {
            foreignKey: 'varietyId',
        });

        Variety.belongsToMany(models.HarvestDate, {
            through: 'HarvestDate_Join_Varieties',
            as: 'harvestDate',
            foreignKey: 'varietyId',
            otherKey: 'HarvestDateId',
        });
        Variety.belongsToMany(models.ShelteredSowingDate, {
            through: 'ShelteredSowingDate_Join_Varieties',
            as: 'shelteredSowingDate',
            foreignKey: 'varietyId',
            otherKey: 'ShelteredSowingDateId',
        });

        Variety.belongsToMany(models.DirectSowingDate, {
            through: 'DirectSowingDate_Join_Varieties',
            as: 'directSowingDate',
            foreignKey: 'varietyId',
            otherKey: 'DirectSowingDateId',
        });

        Variety.belongsToMany(models.GrowingMethod, {
            through: 'GrowingMethods_Join_Varieties',
            as: 'growingMethods',
            foreignKey: 'varietyId',
            otherKey: 'growingMethodId',
        });

        Variety.belongsToMany(models.Exposition, {
            through: 'Expositions_Join_Varieties',
            as: 'expositions',
            foreignKey: 'varietyId',
            otherKey: 'expositionId',
        });

        Variety.belongsToMany(models.WaterNeed, {
            through: 'WaterNeeds_Join_Varieties',
            as: 'waterNeeds',
            foreignKey: 'varietyId',
            otherKey: 'waterNeedId',
        });

        Variety.belongsToMany(models.Usage, {
            through: 'Usages_Join_Varieties',
            as: 'usages',
            foreignKey: 'varietyId',
            otherKey: 'usageId',
        });

        Variety.belongsToMany(models.SoilNature, {
            through: 'SoilNatures_Join_Varieties',
            as: 'soilNatures',
            foreignKey: 'varietyId',
            otherKey: 'soilNatureId',
        });

        Variety.belongsToMany(models.SoilQuality, {
            through: 'SoilQualities_Join_Varieties',
            as: 'soilQualities',
            foreignKey: 'varietyId',
            otherKey: 'soilQualityId',
        });

        Variety.belongsToMany(models.Precocity, {
            through: 'Precocities_Join_Varieties',
            as: 'precocities',
            foreignKey: 'varietyId',
            otherKey: 'precocityId',
        });
    };
    return Variety;
};
