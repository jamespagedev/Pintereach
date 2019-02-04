const db = require('../dbConfig.js');

const getUsers = () => {
  return db.select('id', 'display_name').from('users');
};

const getUser = id => {
  return db
    .select('id', 'is_admin', 'username', 'display_name', 'email', 'img_url')
    .from('users')
    .where('id', id);
};

module.exports = {
  getUsers,
  getUser
};
