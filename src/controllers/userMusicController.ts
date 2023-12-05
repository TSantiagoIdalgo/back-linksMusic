import { GraphQLError } from 'graphql';
import { IMusicDelete } from '../types/music';
import UserMusic from '../model/userMusic';

export default class UserMusicController {
    
  static async getUserMusics (userId: string | undefined) {
    try {
      if (userId === undefined) throw new GraphQLError('User id is undefined', {
        extensions: { code: 'BAD_USER_INPUT', argumentName: 'id' }
      });
          
      const userMusics = await UserMusic.getMusic(userId);
      if (userMusics.length === 0) throw new GraphQLError('User musics not found', {
        extensions: { code: 'OPERATION_RESOLUTION_FAILURE' }
      });
    
      return userMusics;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code}
      });
    }
  }

  static async deleteMusic (userId: string, filename: string): Promise<IMusicDelete> {
    try {
      if (!userId || !filename) throw new GraphQLError('Id or filename is undefined',{
        extensions: { code: 'BAD_USER_INPUT', argumentName: 'id' }
      });
      const result = await UserMusic.delete(userId, filename);
      const response = {
        httpCode: result.$metadata.httpStatusCode,
        id: result.$metadata.requestId,
        message: `${filename} deleted successfully`
      };
      return response;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code}
      });
    }
  }

  static async getMusicURL (userId: string | undefined, filename: string | undefined): Promise<string> {
    try {
      if (!userId || !filename) throw new GraphQLError('Id is undefined', {
        extensions: { code: 'BAD_USER_INPUT', argumentName: 'id' }
      });
      const url = await UserMusic.getURL(filename, userId);
      return url;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: error.extensions.code }
      });
    }
  }

}