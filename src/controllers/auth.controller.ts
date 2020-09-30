import * as express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config.json';
import IControllerBase from 'interfaces/IControllerBase.interface';
import { authJwt } from '../services/auth.service';
import { usersModel } from '../models/users/users.model';
import { IUser } from '../shared/interfaces/users';
import { hash, compare } from '../shared/utils/bCrypt';

import { firebaseAuthService } from '../services/firebaseAuth.service';

import { SigninWithEmailValidateMiddleware, SignupValidateMiddleware } from '../middlewares/validate';

class AuthController implements IControllerBase {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/signup', SignupValidateMiddleware, this.signup);
    this.router.post('/signinWithEmail', SigninWithEmailValidateMiddleware, this.signinWithEmail);
    this.router.get('/protected', authJwt, this.protected);
    this.router.get('/getuser', this.getUser);
  }

  signup = async (req: Request, res: Response) => {
    const payload: IUser = req.body;

    try {
      if (!payload.password?.trim()) {
        return res.send('enter your password');
      }

      payload.password = await hash(payload.password, 10);

      // const newUser = await usersModel.saveUser(payload);
      // const { password, ...user } = newUser.toJSON();

      const newUser = await firebaseAuthService.createUser(payload);

      res.status(201).json({ data: newUser, error: null });
    } catch (e) {
      if (e.message.includes('ER_DUP_ENTRY')) {
        res.json({ data: null, error: 'email already exists' });

      } else {
        res.json({ data: null, error: e.message });
      }
    }
  };

  signinWithEmail = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      await firebaseAuthService.signInWithLinkEmail(email);

      res.status(200).json({ data: { message: 'we send confirm link in your email' }, error: null });
    } catch (e) {
      res.status(400).json({ data: null, error: e.message });
    }
  };

  getUser= async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      const user = await firebaseAuthService.getUser();

      res.status(200).json({ data: user, error: null });
    } catch (e) {
      res.status(400).json({ data: null, error: e.message });
    }
  };

  protected = async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      msg: 'You are successfully authenticated to this route!',
    });
  };

}

export default AuthController;