/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const db = require('../../data/helpers/dbAuthHelpers.js');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
function generateToken(id, username, isAdmin) {
  const payload = {
    id: id,
    username: username,
    is_admin: isAdmin
  };

  const secret =
    process.env.JWT_SECRET ||
    'Should configure local .env file for secretString'; // hard coding this in the code is bad practice

  const options = {
    expiresIn: '24h' // 60 seconds... otherValues(20, '2 days', '10h', '7d'), a number represents seconds (not milliseconds)
  };

  return jwt.sign(payload, secret, options);
}

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
router.post('/register', (req, res, next) => {
  // Precondition - Username must be unique and not used in database
  let newUserCreds = req.body;

  // no trailing spaces for unique properties
  newUserCreds.username = newUserCreds.username.trim();
  req.body.display_name
    ? (newUserCreds.display_name = newUserCreds.display_name.trim())
    : (newUserCreds.display_name = newUserCreds.username.trim());
  if (req.body.email) newUserCreds.email = newUserCreds.email.trim();

  // only the database administrator can set this this value
  if (newUserCreds.is_admin) {
    newUserCreds.is_admin = false;
  }

  // Creates a hash password to store in the database...
  newUserCreds.password = bcrypt.hashSync(
    newUserCreds.password,
    12 // db.settings.pwdHashLength
  );

  // Adds a single user to the database
  db.addUser(newUserCreds)
    .then(Ids => {
      try {
        const token = generateToken(
          Ids[0],
          newUserCreds.username,
          newUserCreds.is_admin
        );
        res.status(201).send({ id: Ids[0], token });
      } catch (err) {
        next(err);
      }
    })
    .catch(err => {
      if (err.errno === 19) {
        res
          .status(400)
          .json({ error: 'username/display_name/email already taken' });
      } else {
        next(err);
      }
    });
});

router.post('/login', (req, res, next) => {
  // Check username exist AND client password matches hash password in db
  const userCreds = req.body;

  db.findByUsername(userCreds.username)
    .first() // returns the first single object (containing the user found) in the array. If no objects were found, an empty array is returned.
    .then(user => {
      // If user object was obtained AND...
      // the client password matches the db hash password
      if (user && bcrypt.compareSync(userCreds.password, user.password)) {
        const token = generateToken(user.id, user.username, user.is_admin);
        res.status(201).json({ id: user.id, token });
      } else {
        next({ code: 401 });
      }
    })
    .catch(err => next(err));
});

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
