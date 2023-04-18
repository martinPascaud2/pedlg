module.exports = (sequelize, DataTypes) => {
    const HarvestDate = sequelize.define(
        'HarvestDate',
        {
            startDate: {
                type: DataTypes.TINYINT,
                allowNull: false,
                field: 'start_date',
            },
            endDate: {
                type: DataTypes.TINYINT,
                allowNull: false,
                field: 'end_date',
            },
        },
        {},
    );
    HarvestDate.associate = (models) => {
        HarvestDate.belongsToMany(models.Variety, {
            through: 'HarvestDate_Join_Varieties',
            otherKey: 'varietyId',
            as: 'varieties',
            foreignKey: 'HarvestDateId',
        });
    };
    return HarvestDate;
};
