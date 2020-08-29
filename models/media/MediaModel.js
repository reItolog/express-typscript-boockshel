const bookshelf = require('../../dbconfig');
const constants = require('../../shared/constants/db');

exports.MediaModel = bookshelf.model('Media', {
  tableName: constants.MEDIA,
  users() {
    return this.hasMany('Users');
  },
});
