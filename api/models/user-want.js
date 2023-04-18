module.exports = (sequelize, DataTypes) => {
    const Want = sequelize.define(
        'Want',
        {
            deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {},
    );
    Want.associate = (models) => {
        Want.belongsTo(models.User, {
            foreignKey: 'userId',
        });
        Want.belongsTo(models.Variety, {
            foreignKey: 'varietyId',
            as: 'varieties',
        });
    };
    return Want;
};
