import * as express from 'express';
import { Request, Response } from 'express';
import IControllerBase from 'interfaces/IControllerBase.interface';

import { VerifyTokenMiddleware } from '../middlewares';

import { firebaseUsersService } from '../services/firebase/';

class UsersController implements IControllerBase {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/users', this.getAllUsers);
    this.router.get('/user/:id', VerifyTokenMiddleware, this.getUser);
    // this.router.delete('/user/:id', VerifyTokenMiddleware, this.removeUser);
    // this.router.patch('/user/:id', VerifyTokenMiddleware, this.updateUser);
  }

  // async updateUser(req: Request, res: Response) {
  //   const { id, ...payload } = req.body;
  //   try {
  //     const updatedUser = await usersModel.updateUser(id, payload);
  //
  //     res.status(200).json({ data: updatedUser, error: null });
  //   } catch (e) {
  //     res.status(400).json({ data: null, error: e.message });
  //   }
  // }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await firebaseUsersService.getAllUsers();

      res.status(200).json({ data: users, error: null });
    } catch (error) {
      res.json({ data: null, error });
    }
  }


  async getUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const user = await firebaseUsersService.getUserById(id)

      res.status(200).json({ data: user, error: null });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ data: null, error: error.message });
    }
  }

  // async removeUser(req: Request, res: Response) {
  //   const id = Number(req.params.id);
  //   try {
  //     await usersModel.removeUser(id);
  //     res.status(200).json({ data: `user deleted with id ${id}`, error: null });
  //   } catch (error) {
  //     res.status(400).json({ data: null, error: error.message });
  //   }
  // }

}

export default UsersController;