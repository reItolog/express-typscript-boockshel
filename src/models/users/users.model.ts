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
      return await this.users.where({ id }).fetch(
        { withRelated: ['avatar'] },
      )
        .then(use => {
          const userMedia = use.toJSON();
          console.log(userMedia);
          const mimetype = userMedia.avatar.mime_type.split('/')[1]
          return {
            ...userMedia,
            avatar: {
              url: `${userMedia.avatar.url}.${mimetype}`,
              mimetype,
            },
          };
        })
        .catch(e => {
          throw new Error(e.message);
        });
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
