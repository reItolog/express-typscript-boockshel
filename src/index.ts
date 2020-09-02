import App from './app';
import MediaController from './controllers/media.controller';
import UsersController from './controllers/users.controller';
import TodoController from './controllers/todo.controller';

import BodyParserMiddleware from './middlewares/body-parser';
import StaticMiddleware from './middlewares/static';
import loggerMiddleware from './middlewares/logger';

const app = new App({
  port: 5000,
  controllers: [
    new MediaController(),
    new UsersController(),
    new TodoController(),
  ],
  middleWares: [
    BodyParserMiddleware,
    loggerMiddleware,
    StaticMiddleware,
  ],
});

app.listen();