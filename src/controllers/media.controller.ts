import * as express from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import IControllerBase from 'interfaces/IControllerBase.interface';
import { mediaModel } from '../models/media/media.models';
import { IMedia } from '../shared/interfaces/media';

class MediaController implements IControllerBase {
  public path = '/';
  public router = express.Router();
  public upload = multer({ dest: 'uploads/' });

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/save_media', this.upload.single('url'), this.saveMedia);
    this.router.get('/media', this.getAllMedia);
  }

  saveMedia = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const { path, mimetype } = req.file;
    const newMedia: IMedia = {
      url: path,
      'mime type': mimetype,
      description,
      title,
    };
    try {
      const mediRes = await mediaModel.saveMedia(newMedia);

      res.json({ media: mediRes });
    } catch (error) {
      res.json({ error });
    }
  };

  getAllMedia = async (req: Request, res: Response) => {
    try {
      const mediRes = await mediaModel.getAllMedia();
      res.json({ media: mediRes });
    } catch (error) {
      res.json({ error });
    }
  };
}

export default MediaController;