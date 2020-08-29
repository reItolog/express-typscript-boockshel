import App from './app';
import MediaController from './controllers/media.controller';
import BodyParserMiddleware from './middlewares/body-parser';

const app = new App({
  port: 5000,
  controllers: [
    new MediaController(),
  ],
  middleWares: [
    BodyParserMiddleware,
  ],
});

app.listen();