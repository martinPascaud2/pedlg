import gql from 'graphql-tag';

export const userFragment = gql`
    fragment User_user on User {
        id
        username
        email
        register
        online
        provider
        hashId
        hasPassword
        lastLogin
        createdAt
        updatedAt
        userMetadata {
            department
            description
            avatar
        }
    }
`;

export const profileFragment = gql`
    fragment Profile_profile on Profil {
        id
        online
        username
        hashId
        userMetadata {
            id
            department
            description
            avatar
        }
        lastLogin
        provider
        createdAt
        updatedAt
    }
`;

export const stockFragment = gql`
    fragment Stock_stock on Stock {
        quantity
        shared
        sharedQuantity
        deleted
        userId
        Variety {
            id
            name
            description
            sowing_tips
            family {
                icon
                latinName
                nameFr
            }
            shelteredSowingDate {
                startDate
                endDate
            }
            directSowingDate {
                startDate
                endDate
            }
            expositions {
                nameFr
            }
            growingMethods {
                nameFr
            }
            waterNeeds {
                nameFr
            }
            soilNatures {
                nameFr
            }
            soilQualities {
                nameFr
            }
            precocities {
                nameFr
            }
            harvestDate {
                startDate
                endDate
            }
        }
        unit
    }
`;

export const lightStockFragment = gql`
    fragment lightStock_lightStock on lightStock {
        id
        quantity
        shared
        sharedQuantity
        userId
        varieties {
            id
            name
            description
            sowing_tips
            icon
            latinName
            family
        }
        unit
    }
`;

export const GET_CURRENT_USER = gql`
    {
        currentUser {
            ...User_user
        }
    }
    ${userFragment}
`;

export const LOGIN = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                ...User_user
            }
        }
    }
    ${userFragment}
`;

export const LOGOUT = gql`
    {
        logout
    }
`;

export const SEND_PASSWORD_RESET_LINK = gql`
    query ForgotPassword($email: String!) {
        forgotPassword(email: $email)
    }
`;

export const RESEND_CONFIRMATION_MAIL = gql`
    query ResendConfirmationMail($id: Int!) {
        resendConfirmationMail(id: $id)
    }
`;

export const VERIFY_TOKEN = gql`
    query ProtectedRecovery($guard: Boolean!, $token: String!) {
        protectedRecovery(guard: $guard, token: $token)
    }
`;

export const VERIFY_MAIL = gql`
    query VerifyMail($token: String!) {
        verifyMail(token: $token)
    }
`;

export const GET_STOCK = gql`
    query GetStock(
        $sortBy: SortStockBy!
        $search: String!
        $limit: Int!
        $page: Int!
    ) {
        getStock(sortBy: $sortBy, search: $search, limit: $limit, page: $page) {
            count
            stock: Stock {
                id
                quantity
                unit
                shared
                sharedQuantity
                variety: varieties {
                    id
                    name
                    family
                }
            }
        }
    }
`;

export const GET_WANT = gql`
    query GetWant(
        $sortBy: SortWantBy!
        $search: String
        $limit: Int!
        $page: Int!
    ) {
        getWant(sortBy: $sortBy, search: $search, limit: $limit, page: $page) {
            count
            want: Want {
                id
                variety: varieties {
                    id
                    name
                    family
                }
            }
        }
    }
`;

export const GET_LIGHT_STOCK = gql`
    {
        getLightStock {
            ...lightStock_lightStock
        }
    }
    ${lightStockFragment}
`;

export const GET_USER = gql`
    query GetUser($hashId: String!) {
        info: getUser(hashId: $hashId) {
            ...Profile_profile
        }
    }
    ${profileFragment}
`;

export const GET_PUBLIC_STOCK_LIST = gql`
    query GetList(
        $hashId: String!
        $limit: Int!
        $page: Int!
        $search: String
        $sortBy: SortStockBy!
    ) {
        list: getStockList(
            hashId: $hashId
            sortBy: $sortBy
            limit: $limit
            page: $page
            search: $search
        ) {
            count
            Stock {
                id
                quantity
                shared
                sharedQuantity
                userId
                varieties {
                    id
                    name
                    description
                    sowingTips
                    icon
                    latinName
                    family
                }
                unit
            }
        }
    }
`;

export const SEARCH_VARIETY = gql`
    query search($search: String!) {
        searchVariety(search: $search) {
            id
            name
            family
        }
    }
`;

export const GET_PUBLIC_WANT_LIST = gql`
    query GetList(
        $hashId: String!
        $limit: Int!
        $page: Int!
        $search: String
        $sortBy: SortWantBy!
    ) {
        list: getWantList(
            hashId: $hashId
            sortBy: $sortBy
            limit: $limit
            page: $page
            search: $search
        ) {
            count
            Want {
                id
                userId
                varieties {
                    id
                    name
                    description
                    sowingTips
                    icon
                    latinName
                    family
                }
            }
        }
    }
`;

export const GET_VARIETY = gql`
    query GetVariety($id: Int!) {
        variety_request: getVariety(id: $id) {
            id
            name
            description
            sowingTips
            icon
            latinName
            family
            shelteredSowingDate {
                id
                startDate
                endDate
            }
            directSowingDate {
                id
                startDate
                endDate
            }
            expositions {
                id
                nameFr
            }
            growingMethods {
                id
                nameFr
            }
            waterNeeds {
                id
                nameFr
            }
            soilNatures {
                id
                nameFr
            }
            soilQualities {
                id
                nameFr
            }
            precocities {
                id
                nameFr
            }
            harvestDate {
                id
                startDate
                endDate
            }
        }
    }
`;

export const GET_USERS_WITH_VARIETY = gql`
    query GetUsersWithVariety($varietyId: Int!, $list: List!) {
        whohas_request: getUsersWithVariety(
            varietyId: $varietyId
            list: $list
        ) {
            id
            email
            online
            username
            register
            hashId
            hasPassword
            providerId
            lastLogin
            provider
            createdAt
            updatedAt
        }
    }
`;

export const GET_ALL_VARIETIES = gql`
    query GetAllVarieties(
        $sortBy: SortWantBy!
        $search: String
        $limit: Int!
        $page: Int!
        $filter: Filter
        $available: Boolean
    ) {
        get: getAllVarieties(
            sortBy: $sortBy
            search: $search
            limit: $limit
            page: $page
            filter: $filter
            available: $available
        ) {
            count
            result: search {
                name
                id
                icon
                latinName
                family
                available
            }
        }
    }
`;

export const GET_MESSAGES = gql`
    query GetMessages($roomId: String!) {
        messages: getMessages(roomId: $roomId) {
            id
            senderId
            receiverId
            message
            unread
            viewDate
            createdAt
            updatedAt
            sender {
                id
                email
                online
                username
                register
                hashId
                userMetadata {
                    id
                    department
                    description
                    avatar
                }
                hasPassword
                providerId
                lastLogin
                provider
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_ROOM_ID = gql`
    query GetRoomId($contactId: Int!) {
        roomId: getRoomId(contactId: $contactId)
    }
`;

export const GET_ALL_ROOM_BY_USER = gql`
    query GetAllRoomByUser {
        allRoom: getAllRoomByUser {
            id
            roomId
            unread
            viewDate
            message
            contact {
                id
                email
                online
                username
                register
                hashId
                userMetadata {
                    id
                    department
                    description
                    avatar
                }
                hasPassword
                providerId
                lastLogin
                provider
                createdAt
                updatedAt
            }
            receiverId
        }
    }
`;
