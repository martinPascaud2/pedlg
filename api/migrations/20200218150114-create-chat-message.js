module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Messages', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        roomId: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        senderId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        receiverId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        message: {
            type: Sequelize.STRING(1024),
        },
        unread: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        viewDate: {
            type: Sequelize.DATE,
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
    down: (queryInterface) => queryInterface.dropTable('Messages'),
};
