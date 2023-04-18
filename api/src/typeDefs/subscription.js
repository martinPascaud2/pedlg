const { gql } = require('apollo-server-express');

const subscription = gql`
    type Subscription {
        messageAdded: Message
    }
`;

module.exports = subscription;
