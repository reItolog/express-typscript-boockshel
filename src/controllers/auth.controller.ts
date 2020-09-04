import * as express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config.json';
import IControllerBase from 'interfaces/IControllerBase.interface';
import { authJwt } from '../services/auth.service';
import { usersModel } from '../models/users/users.model';
import { IUser } from '../shared/interfaces/users';
import { hash, compare } from '../shared/utils/bCrypt';

import cors from 'cors'

class AuthController implements IControllerBase {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/signup', this.signup);
    this.router.post('/signin',  cors(), this.signin);
    this.router.get('/protected', authJwt, this.protected);
  }

  signup = async (req: Request, res: Response) => {
    const payload: IUser = req.body;
    try {
      if (!payload.password?.trim()) {
        return res.send('enter your password');
      }

      payload.password = await hash(payload.password, 10);

      const newUser = await usersModel.saveUser(payload);

      res.status(201).json({ user: newUser });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  };

  signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await usersModel.findUserByEmail(email);

      if (!user) {
        return res.send(`user whith email ${email} not found`);
      }

      const isMatchPassword = await compare(password, user.password!);

      if (!isMatchPassword) {
        return res.status(401).send('wrong password or email');
      }

      //TODO: make async(add cb(err, token))
      const token = jwt.sign({
          id: user.id,
        },
        config.PASSPORT_JWT_SECRET,
        { expiresIn: '1m' },
      );


      res.status(200).json({ token, userId: user.id });
    } catch (e) {
      res.status(401).json({ error: e.message });
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