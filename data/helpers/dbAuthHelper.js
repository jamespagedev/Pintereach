const db = require('../dbConfig.js');

const findByUsername = username => {
  return db('users').where('username', username);
};

const addUser = user => {
  return db('users').insert(user);
};

module.exports = {
  findByUsername,
  addUser
};
