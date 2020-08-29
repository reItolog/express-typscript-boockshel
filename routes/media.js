const { Router } = require('express');
const multer = require('multer');
const router = Router();

const Media = require('../models/media/media.models');
const media = new Media();

const upload = multer({ dest: 'uploads/' });

router.post('/save_media', upload.single('url'), async (req, res) => {
  const { title, description } = req.body;
  const { path, mimetype } = req.file;
  try {
    const mediRes = await media.saveMedia(path, mimetype, title, description);

    res.json({ media: mediRes });
  } catch (error) {
    res.json({ error });
  }
});

router.get('/get_all_media', async (req, res) => {
  try {
    const mediRes = await media.getAllMedia();
    // console.log(mediRes);
    res.json({ media: mediRes });
  } catch (error) {
    res.json({ error });
  }
});

router.get('/drop', async (req, res) => {
  try {
    await media.drop();
    // console.log(mediRes);
    res.end('dropo');
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
