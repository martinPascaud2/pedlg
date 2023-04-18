const { gql } = require('apollo-server-express');

const WantType = gql`
    type Want {
        id: Int!
        userId: Int!
        varieties: LightVariety!
        count: Int!
    }

    type WantAndCount {
        Want: [Want]!
        count: Int!
    }
`;

module.exports = WantType;
