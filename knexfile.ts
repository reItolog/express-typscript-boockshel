import config from './src/config.json';

export default {
  client: 'mysql',
  connection: {
    host: config.HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
  },
}