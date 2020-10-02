import { SigninValidateMiddleware, SignupValidateMiddleware } from './validate';
import BodyParserMiddleware from './body-parser';
import CorsMiddleware from './cors';
import loggerMiddleware from './logger';
import StaticMiddleware from './static';
import VerifyTokenMiddleware from './verifyToken';

export {
  SignupValidateMiddleware,
  SigninValidateMiddleware,
  BodyParserMiddleware,
  CorsMiddleware,
  loggerMiddleware,
  StaticMiddleware,
  VerifyTokenMiddleware,
};

