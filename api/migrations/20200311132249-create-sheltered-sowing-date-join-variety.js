module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('ShelteredSowingDate_Join_Varieties', {
        shelteredSowingDateId: {
            type: Sequelize.INTEGER,
            primaryKey: false,
            reference: {
                model: 'ShelteredSowingDates',
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
    down: (queryInterface) => queryInterface.dropTable('ShelteredSowingDate_Join_Varieties'),
};
