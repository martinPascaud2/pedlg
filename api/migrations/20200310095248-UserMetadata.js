require('dotenv').config();

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('UserMetadata', {
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
        avatar: {
            type: Sequelize.STRING,
            defaultValue: 'avatar-pedlg-0.jpg',
        },
        description: {
            type: Sequelize.STRING,
        },
        department: {
            type: Sequelize.STRING,
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

    down: (queryInterface) => queryInterface.dropTable('UserMetadata'),
};
