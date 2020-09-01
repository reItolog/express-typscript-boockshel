import bookshelf from '../../db';
import { MEDIA } from '../../shared/constants/db';
import User from '../users/UserModel';

class Media extends bookshelf.Model<Media> {
  get tableName() {
    return MEDIA;
  }

  user() {
    return this.belongsTo(User);
  }
}

export default Media;
