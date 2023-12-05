import User from '../model/user';
import { IUser, IUserModel } from '../types/user';
import { GraphQLError } from 'graphql';

export default class UserController {

  static async getAllUser (): Promise<IUserModel[]> {
    try {
      const users = await User.getAll();
      if (users.length === 0) throw new Error('Users not found');
      return users;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code },
      });
    }
  }

  static async getUserById (id: string | undefined): Promise<IUserModel> {
    try {
      if (id === undefined) throw new GraphQLError('User id is undefined', {
        extensions: { code: 'BAD_USER_INPUT', argumentName: 'id' }
      });

      const user = await User.getById(id);
      if (user === undefined || user === null) throw new GraphQLError('User not found', {
        extensions: { code: 'NOT_FOUND' }
      });
      return user;

    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code }
      });
    }
  }
 
  static async createUser (user: IUser): Promise<IUserModel> {
    try {
      if (!user.userName || !user.email || !user.passwordHash) {
        throw new GraphQLError('User data is incomplete', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }
      const newUser = await User.create(user);
      return newUser;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code }
      });
    }
  }

  static async updateUser (id: string | undefined, user: IUser): Promise<IUserModel | null> {
    try {
      if (id === undefined) throw new GraphQLError('User id is undefined', {
        extensions: { code: 'BAD_USER_INPUT', argumentName: 'id' }
      });
      
      const userUpdated = await User.update(id, user);
      return userUpdated;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code }
      });
    }
  }

  static async deleteUser (id: string | undefined): Promise<IUserModel | null>  {
    try {
      if (id === undefined) throw new GraphQLError('User id is undefined', {
        extensions: { code: 'BAD_USER_INPUT', argumentName: 'id' }
      });

      const user = await User.delete(id);
      return user;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code }
      });
    }
  }

  static async userLogin (email: string, passwordHash: string): Promise<IUser>{
    try {
      if (!email || !passwordHash) throw new GraphQLError('User data is incomplete', {
        extensions: { code: 'BAD_USER_INPUT' }
      });

      const user = await User.login(email, passwordHash);
      return user;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code }
      });
    }
  }

  static async verifyUser (token: string | undefined): Promise<IUser>{
    try {
      if (token === undefined) throw new GraphQLError('Token is undefined', {
        extensions: { code: 'BAD_USER_INPUT', argumentName: 'token' }
      });
      
      const user = await User.verify(token);
      return user;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code, argumentName: error.extensions.argumentName }
      });
    }
  }
}