import { gql } from 'graphql-tag';

const musicSchema = gql`

  type Music {
    id: ID!
    name: String!
    author: String!
    album: String!
    size: Int!
    duration: String!
    image: String
    userId: String!
  }

  extend type Query {
    getAllMusic: [Music]
    getMusicById(id: ID!): Music
    getPlaylistToMusic(id: String): [Playlist]
  }

  extend type Mutation {
    addMusicToPlaylist(musicId: String, playlistId: String): Music
    removeFromPlaylist(musicId: String, playlistId: String): Music
  }
`;

export default musicSchema;