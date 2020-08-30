import bookshelf from '../../db';
import { MEDIA } from '../../shared/constants/db';
import Users from '../users/UserModel';

class Media extends bookshelf.Model<Media> {
  get tableName() {
    return MEDIA;
  }
  media() {
    return this.hasMany(Users);
  }
}

export default Media;