module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('HarvestDate_Join_Varieties', {
        harvestDateId: {
            type: Sequelize.INTEGER,
            primaryKey: false,
            reference: {
                model: 'HarvestDates',
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
    down: (queryInterface) => queryInterface.dropTable('HarvestDate_Join_Varieties'),
};
