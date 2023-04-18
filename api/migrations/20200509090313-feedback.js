module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Feedbacks', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: false,
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
    down: (queryInterface) => queryInterface.dropTable('Feedbacks'),
};
