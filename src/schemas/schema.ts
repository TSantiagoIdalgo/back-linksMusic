import { gql } from 'graphql-tag';
import userSchema from './userSchema/userSchema';
import musicSchema from './musicSchema/musicSchema';
import userMusicSchema from './userMusicSchema/userMusicSchema';
import playlistSchema from './playlistSchema/playlistSchema';

const rootSchema = gql`
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
`;

export const typeDefs = [rootSchema, userSchema, musicSchema, userMusicSchema, playlistSchema];