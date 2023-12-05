import sequelize from '../db';
import { DataTypes } from 'sequelize';
import { IPlaylistModel } from '../../types/playlist';

const PlayListModel = sequelize.define<IPlaylistModel>('playlist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  tittle: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  }
});

export default PlayListModel;