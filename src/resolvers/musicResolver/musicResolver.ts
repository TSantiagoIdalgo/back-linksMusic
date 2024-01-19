import MusicController from '../../controllers/musicController';
import { IMusicModel } from '../../types/music';
import { IPlaylistModel } from '../../types/playlist';

interface PlaylistMusic {
  musicId: string;
  playlistId: string;
}

const musicResolver = {
  Query: {
    getAllMusic: async (): Promise<IMusicModel[]> => 
      await MusicController.getAllMusic(),
    getMusicById: async (_: any, args: IMusicModel): Promise<IMusicModel> => 
      await MusicController.getMusicById(args.id),
    getPlaylistToMusic: async (_: any, args: IMusicModel): Promise<IPlaylistModel[]> =>
      await MusicController.getPlaylistByMusic(args.id)
  },
  Mutation: {
    addMusicToPlaylist: async (_: any, args: PlaylistMusic): Promise<IMusicModel> =>
      await MusicController.addMusicToPlaylist(args.musicId, args.playlistId),
    removeFromPlaylist: async (_: any, args: PlaylistMusic): Promise<IMusicModel> =>
      await MusicController.removeMusicFromPlaylist(args.musicId, args.playlistId),
  }
};

export default musicResolver;