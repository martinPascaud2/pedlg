module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('ShelteredSowingDates', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        start_date: {
            type: Sequelize.TINYINT,
        },
        end_date: {
            type: Sequelize.TINYINT,
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
    down: (queryInterface) => queryInterface.dropTable('ShelteredSowingDates'),
};
