import bookshelf from '../../db';
import { MEDIA } from '../../shared/constants/db';
import User from '../users/UserModel';

const MediaWithVirtuals = bookshelf.Model.extend(  {
  tableName: MEDIA,
  user() {
    return this.belongsTo(User);
  }
})

const Media = bookshelf.model('Media', MediaWithVirtuals)

export default Media;
