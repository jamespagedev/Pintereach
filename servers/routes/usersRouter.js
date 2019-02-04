/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const db = require('../../data/helpers/dbUsersHelper.js');
// const bcrypt = require('bcryptjs');
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
          next({ code: 401 });
        }
      })
      .catch(err => {
        next(err);
      });
    // if (departments.includes(req.decodedToken.department)) {
    //   next();
    // } else {
    //   res.status(403).json({
    //     message: `Access Denied: You must be in one of the following departments [${departments}]`
    //   });
    // }
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

  // db.getUser(req.params.id)
  //   .then(users => res.status(200).send(users))
  //   .catch(err => next(err));
});

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
