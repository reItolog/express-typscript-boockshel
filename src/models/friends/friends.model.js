const bookshelf = require('../../db');
const model = require('./FriendsModel');

class Friends {
  constructor() {}

  createFriendstable() {
    return bookshelf.knex.schema.hasTable('users').then(function (exists) {
      if (!exists) {
        return bookshelf.knex.schema
          .createTable('users', function (t) {
            // t.increments('id').primary();
            // t.string('name', 100);
            // t.string('email', 100);
            // t.string('password');
          })
          .then(() => {
            console.log('table friends created');
          })
          .catch((e) => {
            console.log('Error', e.message);
          });
      }
    });
  }
}
