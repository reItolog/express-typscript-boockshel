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



/*  ROW SQL */

// const mysql = require('mysql');
// const config = require("./config.json")

// const pool  = mysql.createPool({
//   connectionLimit : 10,
//   queueLimit: 100,
//   host : config.HOST,
//   port : config.PORT,
//   user : config.MYSQL_USER,
//   password : config.MYSQL_PASSWORD,
//   database : config.MYSQL_DATABASE,
//   connectTimeout : 10000,
//   waitForConnections: true,
//   acquireTimeout: 10000,
//   debug : false
// });

// pool.on('connection', function (connection) {
//   console.log('MySQL DB Connection established');
// });

// pool.on('acquire', function (connection) {
//   console.log('Connection %d acquired', connection.threadId);
// });

// pool.on('enqueue', function () {
//   console.log('Waiting for available connection slot...');
// });

// pool.on('release', function (connection) {
//   console.log('Connection %d released', connection.threadId);
// });

// module.exports = pool;