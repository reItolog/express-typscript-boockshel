import { Router, Request, Response } from 'express';
import  multer from 'multer';
import { mediaModel } from '../models/media/media.models';

const router = Router();


const upload = multer({ dest: 'uploads/' });

router.post('/save_media', upload.single('url'), async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { path, mimetype } = req.file;
  try {
    const mediRes = await mediaModel.saveMedia(path, mimetype, title, description);

    res.json({ media: mediRes });
  } catch (error) {
    res.json({ error });
  }
});

router.get('/get_all_media', async (req, res) => {
  try {
    const mediRes = await mediaModel.getAllMedia();
    // console.log(mediRes);
    res.json({ media: mediRes });
  } catch (error) {
    res.json({ error });
  }
});



export default router;
