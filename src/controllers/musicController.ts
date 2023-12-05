import { Request, Response } from 'express';
import { IMusicModel } from '../types/music';
import { IPlaylistModel } from '../types/playlist';
import { GraphQLError } from 'graphql';
import { fileType } from '../helpers/fileType';
import Music from '../model/music';

export default class MusicController {

  static async getAllMusic (): Promise<IMusicModel[]> {
    try {
      const musics = await Music.getAll();
      if (musics.length === 0) throw new Error('No music found');
      return musics;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: 'NOT_FOUND'}
      });
    }
  }

  static async getMusicById (id: string | undefined): Promise<IMusicModel> {
    try {
      if (id === undefined) throw new Error('Id is undefined');
      const music = await Music.getById(id);
      if (music === undefined || music === null) throw new Error('Music not found');
      return music;
    } catch (error: any) {
      throw new GraphQLError(error.message,{
        extensions: { code: 'BAD_USER_INPUT', argumentName: 'id' }
      });
    }
  }

  static async postMusic (req: Request, res: Response): Promise<void> {
    const file = req.files?.files as IMusicModel | undefined;
    const userId = req.body?.userId;
    try {
      if (!file) throw new Error('File is required');
      if (fileType(file)) throw new Error('File type is not supported');
      if (!userId) throw new Error('Id is required');
      
      const result = await Music.create(file, userId);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async postMusicByUrl (req: Request, res: Response): Promise<void> {
    const { id, userId } = req.body;
    console.log(id);
    try {
      if (!id || !userId) throw new Error('Id and userId are required');
      (await Music.createByUrl(id, userId))
        .on('end', () => res.sendStatus(201))
        .on('error', (error) => { throw new Error(error); })
        .run();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async addMusicToPlaylist (musicId: string | undefined, playlist: string | undefined): Promise<IMusicModel> {
    try {
      if (!musicId || !playlist) throw new Error('Id is required');
      const result = await Music.addPlaylist(musicId, playlist);
      if (result === null) throw new Error('Music or playlist not found');

      return result;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: 'BAD_USER_INPUT' }
      });
    }
  }

  static async getPlaylistByMusic (playlist: string | undefined): Promise<IPlaylistModel[]> {
    try {
      if (!playlist) throw new Error('Id is required');
      const result = await Music.getPlaylist(playlist);
      if (result === null) throw new Error('Music or playlist not found');

      return result;
    } catch (error: any) {
      throw new GraphQLError(error.message, {
        extensions: { code: 'BAD_USER_RESULT' }
      });
    }
  }
}