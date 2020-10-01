import * as express from 'express';
import { Request, Response } from 'express';

import IControllerBase from 'interfaces/IControllerBase.interface';
import { authJwt } from '../services/auth.service';
import { IUser } from '../shared/interfaces/users';

import { firebaseAuthService } from '../services/firebaseAuth.service';

import {
  SigninValidateMiddleware,
  SignupValidateMiddleware,
} from '../middlewares/validate';

class AuthController implements IControllerBase {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/signup', SignupValidateMiddleware, this.signup);
    this.router.post(
      '/signinWithEmailAndPassword',
      SigninValidateMiddleware,
      this.signinWithEmailAndPassword,
    );
    this.router.get('/protected', authJwt, this.protected);
    this.router.get('/getuser', this.getUser);
    this.router.post('/verify-email', this.verifyEmail);
  }

  signup = async (req: Request, res: Response) => {
    const { email, password, first_name, last_name }: IUser = req.body;

    try {
      const userPayload = {
        email,
        password,
        displayName: `${first_name} ${last_name}`,
      };
      await firebaseAuthService.createUser(userPayload);

      res.status(201).json({ data: 'We send verify email link to your Email address', error: null });
    } catch (e) {
      if (e.message.includes('ER_DUP_ENTRY')) {
        res.json({ data: null, error: 'email already exists' });
      } else {
        res.json({ data: null, error: e.message });
      }
    }
  };

  signinWithEmailAndPassword = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const { user } = await firebaseAuthService.signInWithEmailAndPassword(
        email,
        password,
      );
      
      const token  = await  user?.getIdTokenResult( ).then(r => r.token)

      const loginedUser = {
        uid: user?.uid,
        email_verified: user?.emailVerified,
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        phoneNumber: user?.phoneNumber,
        token
      }


      res.status(200).json({
        data: loginedUser,
        error: null,
      });
    } catch (e) {
      res.json({ data: null, error: e.message });
    }
  };

  getUser = async (req: Request, res: Response) => {

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

  async verifyEmail(req: Request, res: Response) {
    const { actionCode } = req.body;
    try {
      await firebaseAuthService.verifyEmail(actionCode);

      res.status(200).json({ data: 'email success verified', error: null });
    } catch (error) {
      res.status(400).json({ data: null, error });
    }
  }

}

export default AuthController;
