const sequelize = require('sequelize');
const models = require('../../models');
const ApiError = require('../helpers/ApiError');

const { Op } = sequelize;
// const { error } = require('../constante');

const { Message } = models;
const MESSAGE_CREATED = 'MESSAGE_CREATED';

const ChatCtrl = {
    async createMessage({ receiverId, message, roomId }, senderId, pubsub) {
        const createdMessage = await Message.create({
            senderId,
            receiverId,
            message,
            roomId,
        });

        if (!createdMessage) throw new ApiError('MESSAGE_NOT_CREATED');

        createdMessage.message = message;
        await pubsub.publish(MESSAGE_CREATED, {
            messageAdded: createdMessage,
        });

        return createdMessage;
    },
    async getRoomId({ contactId }, userId) {
        const room = await Message.findOne({
            where: {
                [Op.or]: [
                    { receiverId: contactId, senderId: userId },
                    { receiverId: userId, senderId: contactId },
                ],
            },
        });
        if (!room || !room.roomId) return null;
        return room.roomId;
    },

    async getAllRoomByUser(userId) {
        const allRooms = await Message.findAll({
            limit: 10,
            offset: 0,
            attributes: [
                [sequelize.fn('max', sequelize.col('message.id')), 'max'],
            ],
            group: ['roomId'],
            where: {
                [Op.or]: [{ receiverId: userId }, { senderId: userId }],
            },
        }).then((ids) => {
            const idsArray = ids.map((id) => id.dataValues.max);
            return Message.findAll({
                order: [['id', 'DESC']],
                where: { id: idsArray },
                include: [
                    { association: 'receiver', include: ['userMetadata'] },
                    { association: 'sender', include: ['userMetadata'] },
                ],
            });
        });

        if (allRooms && allRooms.length) {
            allRooms.forEach((room, index) => {
                if (room.receiver.id !== userId) allRooms[index].contact = room.receiver;
                else if (room.sender.id !== userId) allRooms[index].contact = room.sender;
            });
        }
        return allRooms;
    },

    async getMessages({ roomId }, userId) {
        const messages = await Message.findAll({
            limit: 10,
            offset: 0,
            order: [['id', 'DESC']],
            where: { roomId },
            include: [{ association: 'sender', include: ['userMetadata'] }],
        });

        Message.update(
            { unread: false, viewDate: Date.now() },
            { where: { receiverId: userId, roomId } },
        );

        if (!messages) throw new ApiError('MESSAGE_NOT_CREATED');
        return messages.reverse();
    },
};

module.exports = ChatCtrl;
