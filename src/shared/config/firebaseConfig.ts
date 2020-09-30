import * as admin from 'firebase-admin';
import serviceAccount from './express-vue-typescript-firebase-adminsdk-7qf8p-7acea55d2c.json';

export const firebaseConfig = {
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
  apiKey: 'AIzaSyDQPwc8ybg8gbCLufQoHzwAdxykJo8JWe0',
  authDomain: 'express-vue-typescript.firebaseapp.com',
  databaseURL: 'https://express-vue-typescript.firebaseio.com',
  projectId: 'express-vue-typescript',
  storageBucket: 'express-vue-typescript.appspot.com',
  messagingSenderId: '1025312299407',
  appId: '1:1025312299407:web:36f6ce883daea943d653fa',
};
