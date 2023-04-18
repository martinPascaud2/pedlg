module.exports = (sequelize, DataTypes) => {
    const SoilQuality = sequelize.define(
        'SoilQuality',
        {
            nameFr: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name_fr',
            },
        },
        {},
    );

    SoilQuality.associate = (models) => {
        SoilQuality.belongsToMany(models.Variety, {
            through: 'SoilQualities_Join_Varieties',
            as: 'varieties',
            foreignKey: 'soilQualityId',
            otherKey: 'varietyId',
        });
    };

    return SoilQuality;
};
