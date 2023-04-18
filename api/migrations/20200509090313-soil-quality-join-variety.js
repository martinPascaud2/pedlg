module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('SoilQualities_Join_Varieties', {
        soilQualityId: {
            type: Sequelize.INTEGER,
            primaryKey: false,
            reference: {
                model: 'SoilQualities',
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
    down: (queryInterface) => queryInterface.dropTable('SoilQualities_Join_Varieties'),
};
