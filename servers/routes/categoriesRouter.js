/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const db = require('../../data/helpers/dbCategoriesHelpers.js');
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

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
router.get('/', authenticate, async (req, res, next) => {
  try {
    const categories = await db.getCategories(req.decodedToken.is_admin);
    res.status(200).send(categories);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const category = await db.getCategory(
      req.params.id,
      req.decodedToken.is_admin
    );
    res.status(200).send(category);
  } catch (err) {
    next(err);
  }
});

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
