module.exports = (sequelize, DataTypes) => {
    const GrowingMethod = sequelize.define(
        'GrowingMethod',
        {
            nameFr: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name_fr',
            },
        },
        {},
    );

    GrowingMethod.associate = (models) => {
        GrowingMethod.belongsToMany(models.Variety, {
            through: 'GrowingMethods_Join_Varieties',
            as: 'varieties',
            foreignKey: 'growingMethodId',
            otherKey: 'varietyId',
        });
    };

    return GrowingMethod;
};
