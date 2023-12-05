import sequelize from '../db';
import { DataTypes } from 'sequelize';
import { IUserModel } from '../../types/user';

const UserModel = sequelize.define<IUserModel>('users', {
  id: { 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  passwordHash: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

export default UserModel;