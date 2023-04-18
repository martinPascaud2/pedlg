module.exports = (sequelize, DataTypes) => {
    const WaterNeed = sequelize.define(
        'WaterNeed',
        {
            nameFr: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name_fr',
            },
        },
        {},
    );

    WaterNeed.associate = (models) => {
        WaterNeed.belongsToMany(models.Variety, {
            through: 'WaterNeeds_Join_Varieties',
            as: 'varieties',
            foreignKey: 'waterNeedId',
            otherKey: 'varietyId',
        });
    };

    return WaterNeed;
};
