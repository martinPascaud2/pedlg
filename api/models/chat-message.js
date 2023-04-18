const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const key = 'k7df478k2272d3ace7c528kf4e426k7a';

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        'Message',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            roomId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            message: {
                type: DataTypes.STRING(1024),
                validate: {
                    notEmpty: {
                        msg: 'MESSAGE_EMPTY',
                    },
                    len: {
                        args: [1, 1024],
                        msg: 'MESSAGE_LEN',
                    },
                },
            },
            unread: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            viewDate: {
                type: DataTypes.DATE,
            },
        },
        {
            hooks: {
                afterValidate: async (chat) => {
                    const { message } = chat;
                    if (chat.changed('message')) {
                        const iv = new Buffer.from(crypto.randomBytes(16));
                        const cipher = crypto.createCipheriv(
                            algorithm,
                            key,
                            iv,
                        );
                        let crypted = cipher.update(message, 'utf8', 'hex');
                        crypted += cipher.final('hex');
                        await chat.set(
                            {
                                message: `${iv.toString(
                                    'hex',
                                )}:${crypted.toString()}`,
                            },
                            { hooks: false },
                        );
                    }
                },
                afterFind: async (chat) => {
                    if (Array.isArray(chat) && chat[0] && chat[0].message) {
                        chat.forEach((data, i) => {
                            const { message } = data;
                            const textParts = message.split(':');
                            const iv = new Buffer.from(
                                textParts.shift(),
                                'hex',
                            );
                            const encryptedText = new Buffer.from(
                                textParts.join(':'),
                                'hex',
                            );
                            const decipher = crypto.createDecipheriv(
                                algorithm,
                                key,
                                iv,
                            );
                            let decrypted = decipher.update(
                                encryptedText,
                                'hex',
                                'utf8',
                            );
                            decrypted += decipher.final('utf8');
                            chat[i].message = decrypted;
                        });
                    }
                },
            },
        },
    );

    Message.associate = (models) => {
        Message.belongsTo(models.User, {
            foreignKey: 'senderId',
            as: 'sender',
        });
        Message.belongsTo(models.User, {
            foreignKey: 'receiverId',
            as: 'receiver',
        });
    };

    return Message;
};
