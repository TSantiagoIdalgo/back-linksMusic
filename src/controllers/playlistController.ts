import PlayList from '../model/playlist';
import { IPlaylistModel } from '../types/playlist';
import { GraphQLError } from 'graphql';

export default class PlaylistController {
  static async getAllPlaylist (): Promise<IPlaylistModel[]> {
    try {
      const playlists = await PlayList.getAll();
      if (playlists.length === 0) throw new Error('No playlist found');
      return playlists;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: 'OPERATION_RESOLUTION_FAILURE' }
      });
    }
  }

  static async getPlaylistById (id: string | undefined): Promise<IPlaylistModel> {
    try {
      if (id === undefined) throw new Error('Playlist id is undefined');

      const playlist = await PlayList.getById(id);
      if (!playlist) throw new Error('Playlist not found');

      return playlist;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: 'OPERATION_RESOLUTION_FAILURE' }
      });
    }
  }

  // UserMusicController
  static async getUserPlaylist (id: string | undefined): Promise<IPlaylistModel[]> {
    try {
      if (!id) throw new Error('User id is undefined');
      const playlists = await PlayList.getByUser(id);
      if (playlists.length === 0) throw new Error('No playlist found');

      return playlists;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: 'OPERATION_RESOLUTION_FAILURE' }
      });
    }
  }

  static async getPlaylistMusic (id: string | undefined): Promise<IPlaylistModel> {
    try {
      if (!id) throw new Error('Playlist id is undefined');

      const playlist = await PlayList.getMusic(id);
      if (playlist === null) throw new Error('No music found');

      return playlist;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: 'OPERATION_RESOLUTION_FAILURE' }
      });
    }
  }

  static async createPlaylist (playlist: IPlaylistModel): Promise<IPlaylistModel> {
    try {
      const playlistCreated = await PlayList.create(playlist);
      return playlistCreated;
    } catch (error: any) {
      throw new GraphQLError(error);
    }
  }

  static async deletePlaylist (id: string | undefined): Promise<number> {
    try {
      if (!id) throw new Error('Playlist id is undefined');

      const playlist = await PlayList.delete(id);
      return playlist;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: 'BAD_USER_INPUT', argumentName: 'id' }
      });
    }
  }

  static async updatePlaylist (id: string | undefined, playlist: IPlaylistModel): Promise<IPlaylistModel> {
    try {
      if (!id) throw new GraphQLError('Playlist id is undefined', {
        extensions: { code: 'BAD_USER_INPUT', argumentName: 'id' }
      });
      if (!playlist) throw new GraphQLError('Playlist data is undefined', {
        extensions: { code: 'BAD_USER_INPUT', argumentName: 'playlist' }
      });
      
      const playlistUpdated = await PlayList.update(id, playlist);
      if (playlistUpdated === null) throw new GraphQLError('Playlist not found', {
        extensions: { code: 'OPERATION_RESOLUTION_FAILURE' }
      });

      return playlistUpdated;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code }
      });
    }
  }

}