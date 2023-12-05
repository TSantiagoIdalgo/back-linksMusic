import { gql } from 'graphql-tag';

const userMusicSchema = gql`
    extend type Query {
        getUserMusic(email: String): [Music]
        getMusicURL(id: String!, name: String): String!
    }

    type MusicDelete {
        httpCode: Int,
        id: String,
        message: String
    }

    extend type Mutation {
        deleteMusic(id: ID!, filename: String!): MusicDelete
    }
`;

export default userMusicSchema;