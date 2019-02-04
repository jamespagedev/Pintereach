/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const db = require('../../data/helpers/dbAuthHelper.js');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
function generateToken(id, username) {
  const payload = {
    id: id,
    username: username
  };

  const secret = process.env.JWT_SECRET; // hard coding this in the code is bad practice

  const options = {
    expiresIn: 20 // 60 seconds... otherValues(20, '2 days', '10h', '7d'), a number represents seconds (not milliseconds)
  };

  return jwt.sign(payload, secret, options);
}

function authenticate(req, res, next) {
  // the auth token is normally sent in the authorization header
  const token = req.headers.authorization;
  const secret =
    process.env.JWT_SECRET ||
    'Should configure local .env file for secretString';

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'invalid token' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'no token provided' });
  }
}

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
router.post('/register', (req, res, next) => {
  // Precondition - Username must be unique and not used in database
  const newUserCreds = req.body;

  // const users = ['jamespage', 'catperson', 'reader']; // get list of usernames from database

  // Creates a hash password to store in the database...
  newUserCreds.password = bcrypt.hashSync(
    newUserCreds.password,
    12 // db.settings.pwdHashLength
  );

  // Adds a single user to the database
  db.addUser(newUserCreds)
    .then(Ids => {
      try {
        const token = generateToken(Ids[0], newUserCreds.username);
        res.status(201).send([{ id: Ids[0], token: token }]);
      } catch (err) {
        next(err);
      }
    })
    .catch(err => {
      if (err.errno === 19) {
        res.status(400).json({ error: 'username/email already taken' });
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
        const token = generateToken(user.id, user.username);
        res.status(200).json({ message: 'Logged in', token });
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
