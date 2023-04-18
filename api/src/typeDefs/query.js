const { gql } = require('apollo-server-express');

const query = gql`
    type Query {
        login(email: String!, password: String!): LoginResponse!
        logout: Boolean
        refreshToken: String!

        currentUser: User!
        getUser(hashId: String!): Profil!
        getAllUsers: [User!]!

        getVariety(id: Int!): Variety!
        getAllVarieties(
            filter: Filter
            search: String
            sortBy: SortWantBy!
            limit: Int!
            page: Int!
            available: Boolean
            old: Boolean
        ): SearchList!

        getStock(
            sortBy: SortStockBy!
            search: String
            limit: Int!
            page: Int!
        ): StockAndCount!
        getAllStocks: [Stock]!

        getWant(
            sortBy: SortWantBy!
            search: String
            limit: Int!
            page: Int!
        ): WantAndCount!

        getStockList(
            hashId: String!
            sortBy: SortStockBy!
            search: String
            limit: Int!
            page: Int!
        ): StockList!

        getWantList(
            hashId: String!
            sortBy: SortWantBy!
            search: String
            limit: Int!
            page: Int!
        ): WantList!

        getNumberOfSharesVariety(VarietyId: Int!, list: List!): Int!

        getAllWants: [Want]!

        getFields(field: Fields!): [VarietyInfos]!
        searchVariety(search: String!): [VarietyName]!
        getUsersWithVariety(varietyId: Int!, list: List!): [User]

        verifyMail(token: String!): Boolean
        resendConfirmationMail(id: Int!): Boolean

        forgotPassword(email: String!): Boolean
        protectedRecovery(guard: Boolean, token: String!): Boolean!

        getMessages(roomId: String!): [Message]!
        getRoomId(contactId: Int!): String
        getAllRoomByUser: [Room]!
    }
`;

module.exports = query;
