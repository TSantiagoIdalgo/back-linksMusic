import { createReadStream, unlinkSync, statSync } from 'fs';
import { AWS_BUCKET_NAME } from '../AWS/awsconfig';
import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import AWSClient from '../AWS/S3/s3';
import { IMusicModel } from '../types/music';
import { fileUrlUpload } from '../helpers/fileURLupload';
import crypto from 'crypto';
import mm from 'music-metadata';
import MusicModel from '../database/models/musicModel';
import PlayListModel from '../database/models/playlistModel';

export default class Music {
  
  static async getAll(): Promise<IMusicModel[]> {
    return await MusicModel.findAll();
  }

  static async getById(id: string): Promise<IMusicModel | null> {
    return await MusicModel.findOne({ where: { id } });
  }

  static async create(file: IMusicModel, id: string): Promise<PutObjectCommandOutput> {
    const stream = createReadStream(file.tempFilePath as string);
    const metadata = await mm.parseFile(file.tempFilePath as string);
    const size = statSync(file.tempFilePath as string);
    const uuid = crypto.randomUUID();
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: `${id}/${uuid}.mp3`,
      Body: stream
    };

    const command = new PutObjectCommand(params);
    await MusicModel.create({
      id: uuid,
      name: metadata.common.title !== undefined ? metadata.common.title : file.name,
      author: metadata.common.artist !== undefined ?  metadata.common.artist : 'Unknow',
      album: metadata.common.album !== undefined ?  metadata.common.album : 'Unknow',
      size: size.size,
      duration: metadata.format.duration,
      userId: id
    });
    const result = await AWSClient.send(command);
    unlinkSync(file.tempFilePath as string);
    
    return result;
  }

  static async createByUrl (id: string, userId: string) {
    const { mpeg, file } = await fileUrlUpload(id);

    mpeg.on('end', async () => {
      const stream = createReadStream(file.tempFilePath);
      const metadata = await mm.parseFile(file.tempFilePath);
      console.log(metadata);
      const size = statSync(file.tempFilePath);
      const uuid = crypto.randomUUID();
      const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${userId}/${uuid}.mp3`,
        Body: stream
      };
      console.log(stream);
      await MusicModel.create({
        id: uuid,
        name: metadata.common.title,
        author: metadata.common.artist,
        album: metadata.common.album,
        size: size.size,
        duration: metadata.format.duration,
        image: file.image,
        userId: userId
      });
      const command = new PutObjectCommand(params);
      await AWSClient.send(command);
      unlinkSync(file.tempFilePath);
    });
    return mpeg;
  }

  static async addPlaylist (musicId: string, playlistId: string) {
    const music = await MusicModel.findByPk(musicId);
    const playlist = await PlayListModel.findByPk(playlistId);
    if (music && playlist) {
      await playlist?.addMusic(music);
      return music;
    }
    return null;
  }

  static async getPlaylist (musicId: string) {
    const music = await MusicModel.findByPk(musicId);
    if (music) {
      const result = await music?.getPlaylists();
      return result;
    }
    return null;
  }
}