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
    try {
      const user: any = await this.users.where({ id }).fetch(
        {withRelated: ['avatar']}
      ).catch(e => {
        console.log('Find User Error', e.message);
      });
      user.set('fullName', [user.toJSON().first_name, user.toJSON().last_name])
      // console.log(user.get('FullName'));
      if (!user) {
        throw new Error(`User not found whith id: ${id}`);
      }
       console.log(user.toJSON());

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
