module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('SoilNatures', {
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
    down: (queryInterface) => queryInterface.dropTable('SoilNatures'),
};
