import MusicModel from '../models/musicModel';
import UserModel from '../models/userModel';
import PlayListModel from '../models/playlistModel';

// 1/n UserModel-MusicModel

UserModel.hasMany(MusicModel, {
  foreignKey: 'userId',
  sourceKey: 'email'
});

MusicModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  targetKey: 'email'
});

// 1/n UserModel-PlayListModel

UserModel.hasMany(PlayListModel, {
  foreignKey: 'userId',
  sourceKey: 'email'
});

PlayListModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  targetKey: 'email'
});

// n/n MusicModel-PlayListModel

MusicModel.belongsToMany(PlayListModel, { 
  through: 'playlist_music',
  foreignKey: 'musicId',
  otherKey: 'playlistId',
  timestamps: false
});

PlayListModel.belongsToMany(MusicModel, {
  through: 'playlist_music',
  foreignKey: 'playlistId',
  otherKey: 'musicId',
  timestamps: false
});