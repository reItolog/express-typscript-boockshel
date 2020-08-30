import Users from './UserModel';

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
      return await this.users.where({ id }).fetch();

    } catch (e) {
      throw new Error(e.message);
    }
  }

  async saveUser(name: string, email: string, password: string, media_id: string) {
    const newUser = new Users({
      name,
      email,
      password,
      media_id,
    });
    try {
      return await newUser.save();
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
