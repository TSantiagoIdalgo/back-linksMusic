import UserMusicController from '../../controllers/userMusicController';
import { IUserModel } from '../../types/user';
import { IMusicDelete, IMusicModel } from '../../types/music';

const userMusicResolver = {
  Query: {
    getUserMusic: async (_root: IUserModel, args: IUserModel) => 
      await UserMusicController.getUserMusics(args.email),
    getMusicURL: async (_: any, args: IMusicModel): Promise<string> => 
      await UserMusicController.getMusicURL(args.id, args.name)
  },
  Mutation: {
    deleteMusic: 
      async (_: any, args: {id: string, filename: string}): Promise<IMusicDelete> => 
        await UserMusicController.deleteMusic(args.id, args.filename),
  }
};

export default userMusicResolver;