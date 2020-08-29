import bookshelf from '../../db';
import Media from './MediaModel';
import { MEDIA } from '../../shared/constants/db';

class MediaModel {
  constructor(private media = new Media) {
    this.createMediaTable();
  }

  createMediaTable() {
    return bookshelf.knex.schema
      .hasTable(`${MEDIA}`)
      .then(function(exists) {
        if (!exists) {
          return bookshelf.knex.schema
            .createTable(`${MEDIA}`, function(t) {
              t.increments('id').primary();
              t.string('url');
              t.string('mime type');
              t.string('title');
              t.string('description');
            })
            .then(() => {
              console.log(`table ${MEDIA} created`);
            })
            .catch((e) => {
              console.log('Error', e.message);
            });
        }
      });
  }

  async getAllMedia() {
    try {
      return await this.media.fetchAll();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async saveMedia(url: string, mimetype: string, title: string, description: string) {
    const newMedia = new Media({
      url,
      'mime type': mimetype,
      title,
      description,
    })
    try {
      return await  newMedia.save()

    } catch (e) {
      throw new Error(e.message);
    }
  }

}

export const mediaModel = new MediaModel();
