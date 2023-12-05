import { Model } from 'sequelize';
import { 
  BelongsToManyAddAssociationMixin, 
  BelongsToManyGetAssociationsMixin, 
  BelongsToManyRemoveAssociationMixin } from 'sequelize';
import MusicModel from '../database/models/musicModel';

export interface IPlaylistModel extends Model {
  id: string;
  tittle: string;
  description: string;
  userId: string;
  addMusic: BelongsToManyAddAssociationMixin<MusicModel, 'music'>;
  getMusics: BelongsToManyGetAssociationsMixin<MusicModel>;
  removeMusic: BelongsToManyRemoveAssociationMixin<MusicModel, 'music'>;
}