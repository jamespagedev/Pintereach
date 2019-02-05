/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const db = require('../../data/helpers/dbUsersHelper.js');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
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

function authorization() {
  return function(req, res, next) {
    user = db
      .getUser(req.decodedToken.id)
      .then(users => {
        if (users[0].id === Number(req.params.id) || users[0].is_admin) {
          next();
        } else {
          res.status(401).end();
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };
}

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
router.get('/', authenticate, (req, res, next) => {
  db.getUsers()
    .then(users => res.status(200).send(users))
    .catch(err => next(err));
});

router.get('/:id', authenticate, authorization(), (req, res, next) => {
  db.getUser(req.params.id)
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:id', authenticate, authorization(), (req, res, next) => {
  let changes = req.body;

  db.getUser(req.params.id)
    .then(users => {
      if (changes.username) {
        changes.username = changes.username.trim();
      }
      if (changes.display_name) {
        changes.display_name = changes.display_name.trim();
      }
      if (changes.email) {
        changes.email = changes.email.trim();
      }
      if (changes.password) {
        changes.password = bcrypt.hashSync(changes.password, 12);
      }

      // only the database administrator can set this this value
      if (changes.is_admin) {
        changes.is_admin = false;
      }

      db.editUser(users[0].id, changes)
        .then(response => {
          res
            .status(200)
            .json([
              { 'Users Changed': response, message: 'changes successful' }
            ]);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.delete('/:id', authenticate, authorization(), (req, res, next) => {
  db.deleteUser(req.params.id)
    .then(count => {
      // console.log('--- USER ---', user);
      if (count) {
        res.status(200).json([
          {
            'Users Deleted': count,
            message: 'user was successfully removed'
          }
        ]);
      } else {
        res
          .status(404)
          .json([{ error: `student with ID '${req.params.id}' not found` }]);
      }
    })
    .catch(err => {
      // console.log('--- ERR ---', err);
      next(err);
    });
});

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
