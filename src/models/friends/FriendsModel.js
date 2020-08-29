const bookshelf = require('../../db');

exports.FriendsModel = bookshelf.model('Friends', {
  tableName: 'friends',
});
