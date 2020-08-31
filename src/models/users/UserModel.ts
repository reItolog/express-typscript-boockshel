import bookshelf from '../../db';
import { USERS } from '../../shared/constants/db';
import Media from '../media/MediaModel';

class Users extends bookshelf.Model<Users> {
  get tableName() {
    return USERS;
  }

  media() {
    return this.belongsTo(Media, 'id');
  }
}

export default Users;