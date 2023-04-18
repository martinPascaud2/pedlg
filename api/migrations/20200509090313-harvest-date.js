module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('HarvestDates', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        startDate: {
            type: Sequelize.TINYINT,
            allowNull: false,
            field: 'start_date',
        },
        endDate: {
            type: Sequelize.TINYINT,
            allowNull: false,
            field: 'end_date',
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
    down: (queryInterface) => queryInterface.dropTable('HarvestDates'),
};
