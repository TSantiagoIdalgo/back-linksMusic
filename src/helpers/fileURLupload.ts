import { createWriteStream, unlinkSync } from 'fs';
import crypto from 'crypto';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import { path } from '@ffmpeg-installer/ffmpeg';
ffmpeg.setFfmpegPath(path as string);

export const fileUrlUpload = async (id: string) => {
  const link = `https://www.youtube.com/watch?v=${id}`;
  const audio = ytdl(link, { filter: 'audioonly', quality: 'highestaudio'});
  const audioData = await ytdl.getInfo(link);
  const uuid = crypto.randomUUID().split('-').join('');
  
  const pathFile = `./src/format/${uuid}.mp3`;
  const outputPathFile = `./src/uploads/${uuid}.mp3`;

  audio.pipe(createWriteStream(pathFile));

  await new Promise((resolve, reject) => {
    audio.on('end', resolve);
    audio.on('error', reject);
  });

  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(pathFile)
      .output(outputPathFile)
      .outputOptions('-metadata', `title=${audioData.videoDetails.title}`)
      .outputOptions('-metadata', `artist=${audioData.videoDetails.author.user}`)
      .outputOptions('-metadata', `album=${audioData.videoDetails.author.name}`)
      .on('end', () => unlinkSync(pathFile))
      .on('end', resolve)
      .on('error', reject)
      .run();
  });
  return { file: outputPathFile, image: audioData.videoDetails.thumbnails[0].url, uuid };
};