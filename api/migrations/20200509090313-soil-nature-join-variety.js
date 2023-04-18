module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('SoilNatures_Join_Varieties', {
        soilNatureId: {
            type: Sequelize.INTEGER,
            primaryKey: false,
            reference: {
                model: 'SoilNatures',
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
    down: (queryInterface) => queryInterface.dropTable('SoilNatures_Join_Varieties'),
};
