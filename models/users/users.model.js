const bookshelf = require('../../dbconfig');
const model = require('./UserModel');
const constants = require('../../shared/constants/db');

class Users {
  constructor() {
    this.createUsersTable();
    this.users = model.UserModel;
  }

  createUsersTable() {
    // TODO:migrations add
    return bookshelf.knex.schema
      .hasTable(`${constants.USERS}`)
      .then(function (exists) {
        if (!exists) {
          return bookshelf.knex.schema
            .createTable(`${constants.USERS}`, function (t) {
              t.increments('id').primary();
              t.string('name', 100);
              t.string('email', 100);
              t.string('password');
              t.string('media_id').references('media.id');
            })
            .then(() => {
              console.log(`table ${constants.USERS} created`);
            })
            .catch((e) => {
              console.log('Error', e.message);
            });
        }
      });
  }

  async findAll() {
    try {
      return await this.users.fetchAll();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findUserById(id) {
    try {
      return await this.users.where({ id }).fetch();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async saveUser(name, email, password, media_id) {
    try {
      return await this.users
        .forge({ name, email, password, media_id })
        .save()
        .catch((e) => {
          console.log(e.message);
        });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async removeUser(id) {
    try {
      return await this.users.where({ id }).destroy();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = Users;
