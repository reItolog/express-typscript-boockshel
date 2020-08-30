import App from './app';
import MediaController from './controllers/media.controller';
import UsersController from './controllers/users.controller';

import BodyParserMiddleware from './middlewares/body-parser';
import loggerMiddleware from './middlewares/logger';

const app = new App({
  port: 5000,
  controllers: [
    new MediaController(),
    new UsersController(),
  ],
  middleWares: [
    BodyParserMiddleware,
    loggerMiddleware,
  ],
});

app.listen();