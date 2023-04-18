const { gql } = require('apollo-server-express');

const ChatType = gql`
    type Message {
        id: Int!
        senderId: Int!
        receiverId: Int!
        message: String!
        unread: Boolean
        viewDate: String
        createdAt: String!
        updatedAt: String!
        sender: User
    }

    type Room {
        id: Int!
        roomId: String!
        unread: Boolean!
        viewDate: String
        message: String!
        contact: User!
        receiverId: Int!
    }
`;

module.exports = ChatType;
