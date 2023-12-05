import { Model } from 'sequelize';
import { 
  BelongsToManyAddAssociationMixin, 
  BelongsToManyGetAssociationsMixin, 
  BelongsToManyRemoveAssociationMixin } from 'sequelize';
import PlayListModel from '../database/models/playlistModel';

export interface IMusicDelete {
    httpCode: number | undefined,
    id: string | undefined,
    message: string
}

export interface IMusicModel extends Model{
  id: string;
  name: string;
  author: string;
  album: string;
  size: number;
  duration: number
  tempFilePath?: string;
  image?: string;
  userId: string;
  addPlaylist: BelongsToManyAddAssociationMixin<PlayListModel, 'playlist'>;
  getPlaylists: BelongsToManyGetAssociationsMixin<PlayListModel>;
  removePlaylist: BelongsToManyRemoveAssociationMixin<PlayListModel, 'playlist'>;
}