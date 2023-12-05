import MusicModel from '../database/models/musicModel';
import { IMusicModel } from '../types/music';
import { AWS_BUCKET_NAME } from '../AWS/awsconfig';
import { DeleteObjectCommandOutput, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import AWSClient from '../AWS/S3/s3';

export default class UserMusic {
    
  static async getMusic (id: string): Promise<IMusicModel[]> {
    const music = await MusicModel.findAll({
      where: {
        userId: id
      }
    });
    return music;
  }

  static async delete(id: string, fileName: string): Promise<DeleteObjectCommandOutput> {
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: `${id}/${fileName}.mp3`
    };
    const command = new DeleteObjectCommand(params);
    await MusicModel.destroy({ where: { id: fileName, userId: id }});
    return await AWSClient.send(command);
  }

  static async getURL (filename: string, id: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: `${id}/${filename}`
    });
    return await getSignedUrl(AWSClient, command, { expiresIn: 3600 });
  }

}