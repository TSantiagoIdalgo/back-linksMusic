import { Router } from 'express';
import MusicController from '../controllers/musicController';


const musicRoute = Router();

musicRoute.post('/upload', MusicController.postMusic);

musicRoute.post('/url', MusicController.postMusicByUrl);

export default musicRoute;