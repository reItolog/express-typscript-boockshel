import  bookshelf from '../../db';
import Users from'./UserModel';
const constants = require('../../shared/constants/db');

class UsersModel {
  constructor(private users = new Users) {
    this.createUsersTable();
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
              t.string('media_id');
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

  async findUserById(id: number) {
    try {
      return await this.users.where({ id }).fetch();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async saveUser(name: string, email: string, password: string, media_id: string) {
    try {
      // return await this.users
      //   .forge({ name, email, password, media_id })
      //   .save()
      //   .catch((e: Error) => {
      //     console.log(e.message);
      //   });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async removeUser(id: string) {
    try {
      return await this.users.where({ id }).destroy();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const usersModel = new UsersModel();
