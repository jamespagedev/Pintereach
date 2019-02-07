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

async function isAdmin(req, res, next) {
  try {
    if (req.decodedToken.is_admin) {
      next();
    } else {
      next({ code: 403 });
    }
  } catch (err) {
    next(err);
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

router.put('/:id', async (req, res, next) => {
  const changes = req.body;
  try {
    changes.id = Number(req.params.id);
    req.body.name
      ? (changes.name = req.body.name.trim())
      : function() {
          throw { code: 400 };
        };
    const count = await db.updateCategory(changes.id, changes);
    res.status(200).json([
      {
        categoriesChange: count,
        message: `Category name '${changes.name}' with id '${
          changes.id
        }' was successfully changed`
      }
    ]);
  } catch (err) {
    if (err.errno === 19) {
      res.status(400).json({
        error: 400,
        message: `Category name '${changes.name}' already taken`
      });
    } else {
      next(err);
    }
  }
});

// Delete Category
router.delete('/:id', authenticate, isAdmin, async (req, res, next) => {
  try {
    const count = await db.deleteCategory(req.params.id);
    if (count > 0) {
      res.status(202).json([
        {
          categoriesDeleted: count,
          message: 'Category was successfully removed'
        }
      ]);
    } else {
      res.status(404).json([
        {
          error: 404,
          message: `The category with id ${req.params.id} was not found`
        }
      ]);
    }
  } catch (err) {
    next(500);
  }
});

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
