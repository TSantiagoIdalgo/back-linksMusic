import UserModel from '../database/models/userModel';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { AWS_BUCKET_NAME } from '../AWS/awsconfig';
import AWSClient from '../AWS/S3/s3';
import { IUser, IUserModel } from '../types/user';
import { GraphQLError } from 'graphql';
import { ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { sendVerifyMail } from '../services/mail/mail.services';
dotenv.config();

export default class User {

  static async getAll (): Promise<IUserModel[]> {
    const users = await UserModel.findAll();
    return users;
  }

  static async getById (id: string): Promise<IUserModel | null> {
    const user = await UserModel.findByPk(id);
    return user;
  }

  static async create (user: IUser): Promise<IUserModel> {
    const userFind = await UserModel.findOne({ where: { email: user.email } });
    if (userFind) throw new GraphQLError('User already exists', {
      extensions: { code: 'BAD_USER_INPUT' }
    });
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.passwordHash, salt);
    const newUser = await UserModel.create({
      userName: user.userName,
      email: user.email,
      passwordHash,
      verify: false
    });

    const userToken = {
      email: user?.email
    };
    const token = Jwt.sign(userToken, process.env.SECRET as string);
    await sendVerifyMail(user.email, user.userName, token);

    return newUser;
  }

  static async update (id: string, user: IUser): Promise<IUserModel | null> {
    const userUpdated = await UserModel.findOne({
      where: {
        email: id,
        verify: true
      }
    });
    userUpdated?.set(user);
    userUpdated?.save();
    return userUpdated;
  }

  static async delete (id: string): Promise<IUserModel | null> {
    const user = await UserModel.findByPk(id);

    if (!user) return null;
    await user.destroy();
    
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Prefix: id
    };

    const list = new ListObjectsV2Command(params);
    const result = await AWSClient.send(list);
    
    if (result.Contents?.length === 0 || result.Contents === undefined) return user;
    else {
      for (const content of result.Contents) {
        const deleteParams = {
          Bucket: AWS_BUCKET_NAME,
          Key: content.Key
        };

        const command = new DeleteObjectCommand(deleteParams);
        await AWSClient.send(command);
      }
      return user;
    }
  }

  static async login (email: string, password: string): Promise<IUser> {
    const user = await UserModel.findOne({
      where: {
        email,
        verify: true
      }
    });

    if (!user) throw new Error('Invalid user or password');
    
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.dataValues.passwordHash);

    if (!passwordCorrect) throw new Error('Invalid user or password');
    const userToken = {
      name: user?.dataValues.userName,
      email: user?.dataValues.email
    };

    const token = Jwt.sign(userToken, process.env.SECRET as string);
    return { ...user?.dataValues, token };
  }

  static async networkLogin (userName: string, email: string) {
    const userFind = await UserModel.findOne({ where: { email: email } });
    const pwd = crypto.randomUUID();
    const userToken = {
      userName,
      email
    };

    const token = Jwt.sign(userToken, process.env.SECRET as string);

    if (userFind === null) {
      await UserModel.create({
        userName,
        email,
        passwordHash: pwd,
      });
    }

    return token;

  }

  static async verify (token: string): Promise<IUser> {
    const user = Jwt.verify(token, process.env.SECRET as string) as IUserModel;

    if (!user) throw new Error('Invalid token');
    const userFind = await UserModel.findOne({ where: { email: user.email } });

    if (!userFind) throw new Error('Invalid token');

    userFind?.set({ verify: true });
    userFind?.save();

    return userFind;
  }

  static async tokenVerify (token: string): Promise<boolean> {
    const tokenVerify = Jwt.verify(token, process.env.SECRET as string);

    if (!tokenVerify) throw new GraphQLError('Invalid token', {
      extensions: { code: 'BAD_USER_INPUT' }
    });
    else return true;
  }
}