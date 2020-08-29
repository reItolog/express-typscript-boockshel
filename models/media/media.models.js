const bookshelf = require('../../dbconfig');
const model = require('./MediaModel');
const constants = require('../../shared/constants/db');

class Media {
  constructor() {
    this.media = model.MediaModel;
    this.createMediaTable();
  }

  createMediaTable() {
    return bookshelf.knex.schema
      .hasTable(`${constants.MEDIA}`)
      .then(function (exists) {
        if (!exists) {
          return bookshelf.knex.schema
            .createTable(`${constants.MEDIA}`, function (t) {
              t.increments('id').primary();
              t.string('url');
              t.string('mime type');
              t.string('title');
              t.string('description');
            })
            .then(() => {
              console.log(`table ${constants.MEDIA} created`);
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

  async saveMedia(url, mimetype, title, description) {
    try {
      return await this.media
        .forge({ url, 'mime type': mimetype, title, description })
        .save();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async drop() {
    try {
      bookshelf.knex.schema.dropTable('media');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Media;
