const { gql } = require('apollo-server-express');

const userType = gql`
    type UserMetadata {
        id: String!
        department: String
        description: String
        avatar: String
    }

    type Profil {
        id: Int!
        online: Boolean!
        username: String!
        hashId: String!
        userMetadata: UserMetadata!
        lastLogin: String
        provider: String
        createdAt: String!
        updatedAt: String!
    }

    type User {
        id: Int!
        email: String!
        online: Boolean!
        username: String!
        register: Boolean!
        hashId: String!
        userMetadata: UserMetadata!
        hasPassword: Boolean!
        providerId: String
        lastLogin: String
        provider: String
        createdAt: String!
        updatedAt: String!
    }

    type LoginResponse {
        user: User!
        token: String!
    }
`;

module.exports = userType;
