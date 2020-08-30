import * as express from 'express';
import { Request, Response } from 'express';
import IControllerBase from 'interfaces/IControllerBase.interface';
import { usersModel } from '../models/users/users.model';

class UsersController implements IControllerBase {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/save_user', this.saveUser);
    this.router.get('/users', this.getAllUsers);
    this.router.get('/user/:id', this.getUser);
    this.router.post('/remove_user/:id', this.removeUser);
  }

  async saveUser(req: Request, res: Response) {
    const { name, email, password, media_id } = req.body;
    try {
      const user = await usersModel.saveUser(name, email, password, media_id);
      res.status(201).json({ user });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const results = await usersModel.findAll();
      res.status(200).json({ users: results });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async getUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const user = await usersModel.findUserById(id);

      res.status(200).json({ user });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async removeUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await usersModel.removeUser(id);
      res.end(`user deleted with id ${id}`);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

}

export default UsersController;