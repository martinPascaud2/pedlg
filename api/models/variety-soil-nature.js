module.exports = (sequelize, DataTypes) => {
    const SoilNature = sequelize.define(
        'SoilNature',
        {
            nameFr: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name_fr',
            },
        },
        {},
    );

    SoilNature.associate = (models) => {
        SoilNature.belongsToMany(models.Variety, {
            through: 'SoilNatures_Join_Varieties',
            as: 'varieties',
            foreignKey: 'soilNatureId',
            otherKey: 'varietyId',
        });
    };

    return SoilNature;
};
