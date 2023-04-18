module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('DirectSowingDate_Join_Varieties', {
        directSowingDateId: {
            type: Sequelize.INTEGER,
            primaryKey: false,
            reference: {
                model: 'DirectSowingDates',
                key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        varietyId: {
            type: Sequelize.INTEGER,
            primaryKey: false,
            reference: {
                model: 'Varieties',
                key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),
    down: (queryInterface) => queryInterface.dropTable('DirectSowingDate_Join_Varieties'),
};
