module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Precocities_Join_Varieties', {
        precocityId: {
            type: Sequelize.INTEGER,
            primaryKey: false,
            reference: {
                model: 'Precocities',
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
    down: (queryInterface) => queryInterface.dropTable('Precocities_Join_Varieties'),
};
