const { gql } = require('apollo-server-express');

const query = gql`
    enum Unit {
        number
        gram
        packet
        stolon
        bulb
        plant
        cutting
    }

    enum List {
        Stock
        Want
    }

    enum Fields {
        Exposition
        GrowingMethod
        Precocity
        SoilNature
        SoilQuality
        WaterNeed
        Usage
    }

    enum FilterStockList {
        quantity
        shared
        shared_quantity
        unit
        createdAt
        updatedAt
        varietyId
        family
        name
    }

    enum FilterWantList {
        createdAt
        updatedAt
        varietyId
        family
        name
    }

    enum Order {
        ASC
        DESC
    }
`;

module.exports = query;
