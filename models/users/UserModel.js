const bookshelf = require('../../dbconfig');
const constants = require('../../shared/constants/db');

exports.UserModel = bookshelf.model('Users', {
  tableName: constants.USERS,
  media() {
    return this.belongsTo('Media');
  },
});
