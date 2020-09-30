import App from './app';
import MediaController from './controllers/media.controller';
import UsersController from './controllers/users.controller';
import TodoController from './controllers/todo.controller';
import AuthController from './controllers/auth.controller';

import BodyParserMiddleware from './middlewares/body-parser';
import StaticMiddleware from './middlewares/static';
import loggerMiddleware from './middlewares/logger';
import CorsMiddleware from './middlewares/cors';

const app = new App({
  port: 5000,
  controllers: [
    new MediaController(),
    new UsersController(),
    new TodoController(),
    new AuthController(),
  ],
  middleWares: [
    BodyParserMiddleware,
    loggerMiddleware,
    StaticMiddleware,
    CorsMiddleware
  ],
});

app.listen();

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

