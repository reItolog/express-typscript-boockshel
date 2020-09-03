import * as express from 'express';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config.json';
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
    this.router.post('/login', this.login);
    // @ts-ignore
    this.router.get('/protected',this.protected);
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
    const { email, password } = req.body;

    try {
      const user = await usersModel.findUserByEmail(email);

      if (!user) {
        return res.send(`user whith email ${email} not found`);
      }

      const isMatchPassword = await bcrypt.compare(password, user.password!);

      if (!isMatchPassword) {
        return res.status(401).send('wrong password');
      }

      const token = await jwt.sign({
          id: user.id,
        },
        config.PASSPORT_JWT_SECRET,
        {  expiresIn: '1h' });

      res.status(200).json({ token : `Bearer ${token}`,  userId: user.id });
    } catch (e) {
      res.status(401).json({ error: e.message });
    }

  };

  protected = async (req: Request, res: Response) => {
    console.log(req.headers.authorization);
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
  }

}

export default AuthController;