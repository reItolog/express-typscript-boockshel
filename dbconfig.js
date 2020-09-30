const config = require('./config.json');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : config.HOST,
    user : config.MYSQL_USER,
    password : config.MYSQL_PASSWORD,
    database : config.MYSQL_DATABASE
  }
});

const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;