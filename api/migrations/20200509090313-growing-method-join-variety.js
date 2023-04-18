module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('GrowingMethods_Join_Varieties', {
        growingMethodId: {
            type: Sequelize.INTEGER,
            primaryKey: false,
            reference: {
                model: 'GrowingMethods',
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
    down: (queryInterface) => queryInterface.dropTable('GrowingMethods_Join_Varieties'),
};
