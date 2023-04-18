module.exports = (sequelize, DataTypes) => {
    const Usage = sequelize.define(
        'Usage',
        {
            nameFr: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name_fr',
            },
        },
        {},
    );

    Usage.associate = (models) => {
        Usage.belongsToMany(models.Variety, {
            through: 'Usages_Join_Varieties',
            as: 'varieties',
            foreignKey: 'usageId',
            otherKey: 'varietyId',
        });
    };

    return Usage;
};
