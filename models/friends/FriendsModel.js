const bookshelf = require('../../dbconfig');

exports.FriendsModel = bookshelf.model('Friends', {
  tableName: 'friends',
});
