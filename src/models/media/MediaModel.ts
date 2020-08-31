import bookshelf from '../../db';
import { MEDIA } from '../../shared/constants/db';

class Media extends bookshelf.Model<Media> {
  get tableName() {
    return MEDIA;
  }
}

export default Media;
