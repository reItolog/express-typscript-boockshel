import Users from './UserModel';
import Media from '../media/MediaModel';
import { IUser } from '../../shared/interfaces/users';

class UsersModel {
  constructor(
    private users = new Users,
    private media = new Media,
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
      const fetchOptions = {withRelated: ['avatar']}
      const user: any = await this.users.where({ id }).fetch( fetchOptions).catch(e => {
        console.log('Find User Error', e.message);
      });

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
