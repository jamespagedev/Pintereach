const db = require('../dbConfig.js');

const getUsers = () => {
  return db.select('id', 'display_name').from('users');
};

const getUser = id => {
  return db
    .select('id', 'is_admin', 'username', 'display_name', 'email', 'img_url')
    .from('users')
    .where('id', id)
    .first();
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
  getUser,
  editUser,
  deleteUser
};
