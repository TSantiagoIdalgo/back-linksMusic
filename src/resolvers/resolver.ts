import userResolver from './userResolver/userResolver';
import musicResolver from './musicResolver/musicResolver';
import userMusicResolver from './userMusicResolver/userMusicResolver';
import playlistResolver from './playlistResolver/playlistResolver';

export const resolvers = [userResolver, musicResolver, userMusicResolver, playlistResolver];