import Users from './UserModel';
import { IUser } from '../../shared/interfaces/users';

class UsersModel {
  constructor(
    private users = new Users,
  ) {
  }

  async findAll() {
    try {
      return await this.users.fetchAll();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findUserById(id: number) {
    // {
    //   'avatar': function(qb) {
    //   //always select the primary Id of the table, otherwise there will be no relations between the tables
    //   return qb.select('owner_id', 'url'); //Table1Id is omitted!
    // }
    // }
    try {
      const user: any = await this.users.where({ id }).fetch(
        { withRelated: ['avatar'] },
      )
        .then(use => {
          use.set('fullName', [use.toJSON().first_name, use.toJSON().last_name]);

          return {
            ...use.toJSON(),
            avatar: use.related('avatar').pluck('url'),
          };
        })
        .catch(e => {
          console.log('Find User Error', e.message);
        });

      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async saveUser(user: IUser) {
    const newUser = new Users(user);

    try {
      return await newUser.save();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async updateUser(id: number, paylod: IUser) {
    try {
      return await this.users.where({ id }).save(paylod, { patch: true })
        .catch(e => {
          console.log(e);
        });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async removeUser(id: number) {
    try {
      return await this.users.where({ id }).destroy();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const usersModel = new UsersModel();
