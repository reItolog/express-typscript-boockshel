import App from './app';
import UsersController from './controllers/users.controller';
import TodoController from './controllers/todo.controller';
import AuthController from './controllers/auth.controller';

import {
  BodyParserMiddleware,
  StaticMiddleware,
  loggerMiddleware,
  CorsMiddleware,
} from './middlewares';

const app = new App({
  port: 5000,
  controllers: [
    new UsersController(),
    new TodoController(),
    new AuthController(),
  ],
  middleWares: [
    BodyParserMiddleware,
    loggerMiddleware,
    StaticMiddleware,
    CorsMiddleware,
  ],
});

app.listen();

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

