const db = require('../dbConfig.js');

const findByUsername = username => {
  return db('users').where('username', username);
};

const findByID = id => {
  return db('users')
    .where('id', id)
    .first();
};

const addUser = user => {
  return db('users').insert(user);
};

module.exports = {
  findByUsername,
  findByID,
  addUser
};
