import { gql } from 'graphql-tag';

const playlistSchema = gql`
    type Playlist {
        id: ID!
        tittle: String
        description: String
        userId: String
        music: [Music]
    }

    extend type Query {
        getAllPlaylist: [Playlist]
        getPlaylistById(id: ID!): Playlist
        getUserPlaylist(id: ID!): [Playlist]
        getPlaylistMusic(id: ID!): Playlist
    }

    extend type Mutation {
        createPlaylist(tittle: String, description: String, userId: String): Playlist
        updatePlaylist(id: ID!, tittle: String, description: String): Playlist
        deletePlaylist(id: ID!): Playlist
    }
`;

export default playlistSchema;