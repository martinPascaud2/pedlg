module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING(64),
        },
        hasPassword: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'has_password',
        },
        register: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        hashId: {
            type: Sequelize.STRING,
            field: 'hash_id',
        },
        online: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        lastLogin: {
            type: Sequelize.DATE,
            field: 'last_login',
        },
        provider: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'local',
        },
        providerId: {
            type: Sequelize.STRING,
            field: 'provider_id',
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
    down: (queryInterface) => queryInterface.dropTable('Users'),
};
