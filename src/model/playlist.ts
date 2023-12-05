import PlayListModel from '../database/models/playlistModel';
import MusicModel from '../database/models/musicModel';
import { IPlaylistModel } from '../types/playlist';

export default class PlayList {
  static async getAll () {
    return await PlayListModel.findAll();
  }

  static async getById (id: string) {
    return await PlayListModel.findByPk(id);
  }
  
  static async getByUser (id: string) {
    const playlist = await PlayListModel.findAll({
      where: {
        userId: id
      }
    });
    return playlist;
  }

  static async getMusic (id: string) {
    const playlist = await PlayListModel.findOne({
      where: {
        id: id
      },
      include: [MusicModel]
    });
    return playlist;
  }

  static async create (playlist: IPlaylistModel) {
    return await PlayListModel.create({
      tittle: playlist.tittle,
      description: playlist.description,
      userId: playlist.userId,
    });
  }

  static async update (id: string, playlist: IPlaylistModel) {
    const playlistUpdated = await PlayListModel.findByPk(id);
    playlistUpdated?.set(playlist);
    playlistUpdated?.save();
    return playlistUpdated;
  }

  static async delete (id: string) {
    const playlist = await PlayListModel.destroy({
      where: {
        id: id
      }
    });
    return playlist;
  }

}