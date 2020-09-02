import bookshelf from '../../db';
import { USERS } from '../../shared/constants/db';
import Media from '../media/MediaModel';
//
// class Users extends bookshelf.Model<Users> {
//   get tableName() {
//     return USERS;
//   }
//
//   media() {
//     return this.hasMany(Media, 'id');
//   }
//
//    avatar() {
//     return this.media();
//   }
// }

const UsersWithVirtuals = bookshelf.Model.extend({
  tableName: USERS,
  media() {
    return this.hasMany(Media, 'id');
  },
  virtuals: {
    fullName: {
      get(payload?: any): string {
        return this.get('full Name');
      },
      set(key: any, value: any, options?: any) {
        console.log('key', key.join(' '));
        console.log('value', value);
        // value = key.split(' ')
        this.set('FullName', key.join(' '));
      },
    },
  },
});

const Users = bookshelf.model('Users', UsersWithVirtuals);

export default Users;