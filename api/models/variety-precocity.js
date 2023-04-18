module.exports = (sequelize, DataTypes) => {
    const Precocity = sequelize.define(
        'Precocity',
        {
            nameFr: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name_fr',
            },
        },
        {},
    );

    Precocity.associate = (models) => {
        Precocity.belongsToMany(models.Variety, {
            through: 'Precocities_Join_Varieties',
            as: 'varieties',
            foreignKey: 'precocityId',
            otherKey: 'varietyId',
        });
    };

    return Precocity;
};
