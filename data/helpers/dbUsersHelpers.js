const db = require('../dbConfig.js');

const getUsers = () => {
  return db.select('id', 'display_name').from('users');
};

const getUserDetails = id => {
  return db
    .select('id', 'is_admin', 'username', 'display_name', 'email', 'img_url')
    .from('users')
    .where('id', id)
    .first();
};

const getUserIdName = id => {
  return db
    .select('id', 'display_name')
    .from('users')
    .where('id', id)
    .first();
};

const getUserArticles = id => {
  return db('articles').where('user_id', id);
};

const editUser = (id, changes) => {
  return db('users')
    .where('id', id)
    .update(changes);
};

const deleteUser = id => {
  return db('users')
    .where('id', id)
    .del();
};

module.exports = {
  getUsers,
  getUserDetails,
  getUserIdName,
  getUserArticles,
  editUser,
  deleteUser
};
