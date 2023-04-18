import gql from 'graphql-tag';

const MESSAGE_ADDED = gql`
    subscription MessageAdded {
        messageAdded {
            message
            id
            senderId
            receiverId
            unread
            viewDate
            createdAt
            updatedAt
        }
    }
`;

export default MESSAGE_ADDED;
