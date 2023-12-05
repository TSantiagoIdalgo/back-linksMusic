import { IPlaylistModel } from '../../types/playlist';
import PlaylistController from '../../controllers/playlistController';

const playlistResolver = {
  Query: {
    getAllPlaylist: async () => 
      await PlaylistController.getAllPlaylist(),
    getPlaylistById: async (_parent: IPlaylistModel, args: IPlaylistModel) => 
      await PlaylistController.getPlaylistById(args.id),
    getUserPlaylist: async (_parent: IPlaylistModel, args: IPlaylistModel) =>
      await PlaylistController.getUserPlaylist(args.id),
    getPlaylistMusic: async (_parent: IPlaylistModel, args: IPlaylistModel) =>
      await PlaylistController.getPlaylistMusic(args.id)
  },
  Mutation: {
    createPlaylist: async (_parent: IPlaylistModel, args: IPlaylistModel) =>
      await PlaylistController.createPlaylist(args),
    updatePlaylist: async (_parent: IPlaylistModel, args: IPlaylistModel) =>
      await PlaylistController.updatePlaylist(args.id, args),
    deletePlaylist: async (_parent: IPlaylistModel, args: IPlaylistModel) =>
      await PlaylistController.deletePlaylist(args.id)
  }
};

export default playlistResolver;