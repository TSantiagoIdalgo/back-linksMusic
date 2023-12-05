import sequelize from '../db';
import { DataTypes } from 'sequelize';
import { IMusicModel } from '../../types/music';

const MusicModel = sequelize.define<IMusicModel>('music',{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  album: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default MusicModel;