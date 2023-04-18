const { gql } = require('apollo-server-express');

const query = gql`
    input BetweenDate {
        startDate: Int! = null
        endDate: Int! = null
    }

    input SortStockBy {
        field: FilterStockList!
        orderBy: Order!
    }

    input SortWantBy {
        field: FilterWantList!
        orderBy: Order!
    }

    input Filter {
        expositions: [Int]
        growingMethods: [Int]
        precocities: [Int]
        soilNatures: [Int]
        soilQualities: [Int]
        waterNeeds: [Int]
        usages: [Int]
        shelteredSowingDate: [BetweenDate]
        directSowingDate: [BetweenDate]
        harvestDate: [BetweenDate]
    }
`;

module.exports = query;
