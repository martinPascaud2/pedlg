import gql from 'graphql-tag';
import { userFragment } from './queries';

// AUTH
export const CREATE_USER = gql`
    mutation CreateUser(
        $username: String!
        $email: String!
        $password: String!
    ) {
        createUser(username: $username, email: $email, password: $password) {
            id
        }
    }
`;

export const RESET_PASSWORD = gql`
    mutation ResetPassword($token: String!, $password: String!) {
        recoveryPassword(token: $token, password: $password) {
            token
            user {
                ...User_user
            }
        }
    }
    ${userFragment}
`;

// USER
export const UPDATE_USER_USERNAME = gql`
    mutation UpdateUser($field: String!) {
        updateUser(username: $field) {
            username
        }
    }
`;

export const UPDATE_USER_EMAIL = gql`
    mutation UpdateUser($field: String!) {
        updateUser(email: $field) {
            email
            register
        }
    }
`;

export const UPDATE_USER_PASSWORD = gql`
    mutation UpdateUserPassword($password: String!, $newPassword: String!) {
        updatePassword(password: $password, newPassword: $newPassword) {
            hasPassword
        }
    }
`;

export const UPDATE_USER_AVATAR = gql`
    mutation UpdateUserAvatar($field: String!) {
        updateUserMetadata(avatar: $field) {
            avatar
        }
    }
`;

export const UPDATE_USER_META_DEP = gql`
    mutation UpdateUserMetaDep($field: String!) {
        updateUserMetadata(department: $field) {
            department
        }
    }
`;

export const UPDATE_USER_META_DESC = gql`
    mutation UpdateUserMetaDesc($field: String!) {
        updateUserMetadata(description: $field) {
            description
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser {
        deleteUser
    }
`;

// STOCK

export const ADD_STOCK = gql`
    mutation AddStock(
        $varietyId: Int!
        $quantity: Int!
        $unit: Unit!
        $shared: Boolean!
        $sharedQuantity: Int!
    ) {
        addStock(
            varietyId: $varietyId
            quantity: $quantity
            unit: $unit
            shared: $shared
            sharedQuantity: $sharedQuantity
        ) {
            id
        }
    }
`;

export const DEL_STOCK = gql`
    mutation DeleteStock($varietyId: Int!) {
        deleteStock(varietyId: $varietyId) {
            id
        }
    }
`;

export const ADD_WANT = gql`
    mutation AddWant($varietyId: Int!) {
        addWant(varietyId: $varietyId) {
            id
        }
    }
`;

export const DEL_WANT = gql`
    mutation DeleteWant($varietyId: Int!) {
        deleteWant(varietyId: $varietyId) {
            id
        }
    }
`;

export const CREATE_FEEDBACK = gql`
    mutation CreateFeedback(
        $email: String!
        $subject: String!
        $message: String!
        $rating: String!
    ) {
        createFeedback(
            email: $email
            subject: $subject
            message: $message
            rating: $rating
        )
    }
`;

export const CREATE_VARIETY = gql`
    mutation CreateVariety($name: String!, $family: String!) {
        createVariety(name: $name, family: $family) {
            id
        }
    }
`;

export const CREATE_MESSAGE = gql`
    mutation CreateMessage(
        $roomId: String
        $receiverId: Int!
        $message: String!
    ) {
        createMessage(
            roomId: $roomId
            receiverId: $receiverId
            message: $message
        ) {
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
                hasPassword
                providerId
                lastLogin
                provider
                createdAt
                updatedAt
                userMetadata {
                    id
                    department
                    description
                    avatar
                }
            }
        }
    }
`;
