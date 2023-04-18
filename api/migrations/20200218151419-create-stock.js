module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Stocks', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        UserId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        VarietyId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Varieties',
                key: 'id',
            },
        },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        shared: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        sharedQuantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'shared_quantity',
        },
        deleted: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
        },
        unit: {
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
    down: (queryInterface) => queryInterface.dropTable('Stocks'),
};
