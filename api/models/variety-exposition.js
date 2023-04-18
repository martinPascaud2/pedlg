module.exports = (sequelize, DataTypes) => {
    const Exposition = sequelize.define(
        'Exposition',
        {
            nameFr: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name_fr',
            },
        },
        {},
    );

    Exposition.associate = (models) => {
        Exposition.belongsToMany(models.Variety, {
            through: 'Expositions_Join_Varieties',
            as: 'varieties',
            foreignKey: 'expositionId',
            otherKey: 'varietyId',
        });
    };

    return Exposition;
};
