import UserController from '../../controllers/userController';
import { IUserModel } from '../../types/user';

const userResolver = {
  Query: {
    getAllUser: async (): Promise<IUserModel[]> => await UserController.getAllUser(),
    getUserById: async (_root: IUserModel, args: IUserModel) => 
      await UserController.getUserById(args.id),
    getUserLogin: async (_root: IUserModel, args: IUserModel) =>
      await UserController.userLogin(args.email, args.passwordHash)
  },
  Mutation: {
    userCreate: async (_root: IUserModel, args: IUserModel) => 
      await UserController.createUser(args),
    userUpdate: async (_root: IUserModel, args: IUserModel) =>
      await UserController.updateUser(args.email, args),
    userDelete: async (_root: IUserModel, args: IUserModel) =>
      await UserController.deleteUser(args.id),
    userVerify: async (_root: IUserModel, args: IUserModel) =>
      await UserController.verifyUser(args.token)
  }
};

export default userResolver;