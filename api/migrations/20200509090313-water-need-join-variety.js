module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('WaterNeeds_Join_Varieties', {
        waterNeedId: {
            type: Sequelize.INTEGER,
            primaryKey: false,
            reference: {
                model: 'WaterNeeds',
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
    down: (queryInterface) => queryInterface.dropTable('WaterNeeds_Join_Varieties'),
};
