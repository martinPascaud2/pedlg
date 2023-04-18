module.exports = (sequelize, DataTypes) => {
    const DirectSowingDate = sequelize.define(
        'DirectSowingDate',
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
    DirectSowingDate.associate = (models) => {
        DirectSowingDate.belongsToMany(models.Variety, {
            through: 'DirectSowingDate_Join_Varieties',
            otherKey: 'varietyId',
            as: 'varieties',
            foreignKey: 'DirectSowingDateId',
            sourceKey: 'id',
        });
    };
    return DirectSowingDate;
};
