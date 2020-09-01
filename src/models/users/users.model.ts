import Users from './UserModel';
import { IUser } from '../../shared/interfaces/users';

class UsersModel {
  constructor(private users = new Users) {
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
      const user = await this.users.where({ id }).fetch({ withRelated: ['media'] }).catch(e => {
        console.log('user found error', e.message);
      });
      if (!user) {
        throw new Error('user not found');
      }

      await user.media().fetch().catch(e => {
        console.log(e.message);
      });
      return user;
    } catch (e) {
      console.log('emo', e.message);
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
      const upUser = await this.users.where({ id }).save(paylod, { patch: true })
        .catch(e => {
          console.log(e);
        });

      return upUser;
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
