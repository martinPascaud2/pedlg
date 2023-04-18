module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Precocities', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        nameFr: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'name_fr',
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
    down: (queryInterface) => queryInterface.dropTable('Precocities'),
};
