const { gql } = require('apollo-server-express');

const VarietyType = gql`
    type Period {
        id: Int!
        startDate: Int!
        endDate: Int!
    }

    type VarietyInfos {
        id: Int!
        nameFr: String!
    }

    type VarietyName {
        id: Int!
        name: String!
        family: String!
        foundIn: String
    }

    type LightVariety {
        id: Int!
        name: String!
        description: String
        sowingTips: String
        icon: String
        latinName: String
        family: String!
        available: Int!
        old: Boolean!
    }

    type SearchList {
        count: Int!
        search: [LightVariety]!
    }

    type Variety {
        id: Int!
        name: String!
        description: String
        sowingTips: String
        icon: String
        latinName: String
        family: String!
        available: Int!
        old: Boolean!
        shelteredSowingDate: [Period]!
        directSowingDate: [Period]!
        expositions: [VarietyInfos]!
        growingMethods: [VarietyInfos]!
        waterNeeds: [VarietyInfos]!
        soilNatures: [VarietyInfos]!
        soilQualities: [VarietyInfos]!
        precocities: [VarietyInfos]!
        harvestDate: [Period]!
    }
`;

module.exports = VarietyType;
