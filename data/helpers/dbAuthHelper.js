const db = require('../dbConfig.js');

const doesUsernameExist = username => {
  // db.raw('LOWER("username") = ?', username)
  const usernameInDatabase = db('users')
    .where({ username })
    .select('username');

  if (usernameInDatabase === username) {
    return true;
  }
  return false;
};

const addUser = user => {
  console.log(user);
  return db('users').insert(user);
};

module.exports = {
  doesUsernameExist,
  addUser
};
