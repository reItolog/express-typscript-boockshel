import bookshelf from '../../db';
import { USERS } from '../../shared/constants/db';
import Media from '../media/MediaModel';

const UsersWithVirtuals = bookshelf.Model.extend({
  tableName: USERS,
  media() {
    // @ts-ignore
    return this.hasMany(Media, 'owner_id');
  },

  avatar() {

    return this.media()
  },
  virtuals: {
    fullName(): string {
      // @ts-ignore
      return this.get('first_name') + ' ' + this.get('last_name')
    }
  },
});

const Users = bookshelf.model('Users', UsersWithVirtuals);

export default Users;