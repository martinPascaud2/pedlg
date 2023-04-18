module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Usages_Join_Varieties', {
        UsageId: {
            type: Sequelize.INTEGER,
            primaryKey: false,
            reference: {
                model: 'Usages',
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
    down: (queryInterface) => queryInterface.dropTable('Usages_Join_Varieties'),
};
