const { Router } = require('express');
const router = Router();

const Users = require('../models/users/users.model');
const users = new Users();

router.get('/get_all_user', async (req, res) => {
  try {
    const results = await users.findAll();
    res.json({ users: results });
  } catch (error) {
    res.json({ error });
  }
});

router.get('/get_user', async (req, res) => {
  const { id } = req.query;
  try {
    const user = await users.findUserById(id);
    res.json({ user });
  } catch (error) {
    res.json({ error });
  }
});

router.post('/save_user', async (req, res) => {
  const { name, email, password, media_id } = req.body;
  try {
    const usr = await users.saveUser(name, email, password, media_id);
    res.json({ user: usr });
  } catch (error) {
    res.json({ error });
  }
});

router.post('/remove_user', async (req, res) => {
  const id = req.body.id;
  try {
    await users.removeUser(id);
    res.end(`user deleted`);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
