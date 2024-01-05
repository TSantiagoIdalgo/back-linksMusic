import { gql } from 'graphql-tag';

const userSchema = gql`
    type User {
        id: ID!
        userName: String!
        email: String!
        passwordHash: String!
        token: String
        verify: Boolean
        Music: [Music]
        Playlist: [Playlist]
    }
    extend type Query {
        getAllUser: [User]
        getUserById(id: ID!): User
        getUserLogin(email: String!, passwordHash: String!): User
        getUserNetworkLogin(email: String!, userName: String!): String
    }

    extend type Mutation {
        userCreate(
            userName: String
            email: String
            passwordHash: String
            ) : User
        userUpdate(
            userName: String
            email: String!
            passwordHash: String
        ): User
        userDelete(id: ID!): User
        userVerify(token: String!): User
    }
`;

export default userSchema;