const { gql } = require('apollo-server-express');

const StockType = gql`
    type Stock {
        id: Int!
        quantity: Int!
        shared: Boolean!
        sharedQuantity: Int!
        userId: Int!
        varieties: LightVariety!
        unit: String!
    }

    type StockAndCount {
        Stock: [Stock]!
        count: Int!
    }
`;

module.exports = StockType;
