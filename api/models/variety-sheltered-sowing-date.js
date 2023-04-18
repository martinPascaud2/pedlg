module.exports = (sequelize, DataTypes) => {
    const ShelteredSowingDate = sequelize.define(
        'ShelteredSowingDate',
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
    ShelteredSowingDate.associate = (models) => {
        ShelteredSowingDate.belongsToMany(models.Variety, {
            through: 'ShelteredSowingDate_Join_Varieties',
            otherKey: 'varietyId',
            as: 'varieties',
            foreignKey: 'ShelteredSowingDateId',
        });
    };
    return ShelteredSowingDate;
};
