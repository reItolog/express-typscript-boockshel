import * as express from 'express';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import IControllerBase from 'interfaces/IControllerBase.interface';

import AuthService from '../services/auth.service';
import { usersModel } from '../models/users/users.model';
import { IUser } from '../shared/interfaces/users';

class AuthController implements IControllerBase {
  public path = '/';
  public router = express.Router();
  private saltRounds = 10;

  constructor(private authService = new AuthService) {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/registration', this.registration);
  }

  registration = async (req: Request, res: Response) => {
    const payload: IUser = req.body;
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      payload.password = await bcrypt.hash(payload.password, salt);

      await usersModel.saveUser(payload);

      res.status(201).send('user registration success');
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  };

  login = async (req: Request, res: Response) => {

  };

}

export default AuthController;