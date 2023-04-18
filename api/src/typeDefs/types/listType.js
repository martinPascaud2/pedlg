const { gql } = require('apollo-server-express');

const ListType = gql`
    type StockList {
        count: Int!
        Stock: [Stock]!
    }

    type WantList {
        count: Int!
        Want: [Want]!
    }
`;

module.exports = ListType;
