const { gql } = require('apollo-server-express');

const mutation = gql`
    type Mutation {
        createUser(username: String!, email: String!, password: String!): User!
        createVariety(
            growingMethods: [Int] = null
            soilQualities: [Int] = null
            description: String = null
            sowingTips: String = null
            expositions: [Int] = null
            soilNatures: [Int] = null
            precocities: [Int] = null
            waterNeeds: [Int] = null
            latinName: String = null
            icon: String = "none"
            family: String!
            name: String!
            isUser: Boolean = true

            shelteredSowingDate: [BetweenDate]
            harvestDate: [BetweenDate]
            directSowingDate: [BetweenDate]
        ): LightVariety!

        addStock(
            varietyId: Int!
            quantity: Int!
            unit: Unit!
            shared: Boolean!
            sharedQuantity: Int
        ): Stock!
        deleteStock(varietyId: Int!): Stock!

        addWant(varietyId: Int!): Want!
        deleteWant(varietyId: Int!): Want!

        updateUser(email: String, username: String): User!
        updatePassword(newPassword: String!, password: String): User!
        updateUserMetadata(
            description: String
            department: String
            avatar: String
        ): UserMetadata!

        deleteUser: Boolean

        recoveryPassword(password: String!, token: String!): LoginResponse!

        createMessage(
            roomId: String
            receiverId: Int!
            message: String!
        ): Message!

        createFeedback(
            email: String!
            subject: String!
            message: String!
            rating: String!
        ): Boolean!
    }
`;

module.exports = mutation;
