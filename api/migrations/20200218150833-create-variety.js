module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Varieties', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
        },
        old: {
            type: Sequelize.BOOLEAN,
        },
        sowingTips: {
            type: Sequelize.TEXT,
            field: 'sowing_tips',
        },
        icon: {
            type: Sequelize.STRING,
        },
        latinName: {
            type: Sequelize.STRING,
            field: 'latin_name',
        },
        family: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'family',
        },
        available: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
    down: (queryInterface) => queryInterface.dropTable('Varieties'),
};
