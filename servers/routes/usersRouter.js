/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const db = require('../../data/helpers/dbUsersHelpers.js');
const dbCategories = require('../../data/helpers/dbCategoriesHelpers.js');
const dbArticles = require('../../data/helpers/dbArticlesHelpers.js');
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

async function authorization(req, res, next) {
  try {
    let userInCheck = await db.getUserDetails(req.decodedToken.id);
    if (userInCheck.id === Number(req.params.id) || userInCheck.is_admin) {
      next();
    } else {
      next({ code: 401 });
    }
  } catch (err) {
    next(err);
  }
}

/***************************************************************************************************
 ********************************************* Endpoints *******************************************
 **************************************************************************************************/
router.get('/', authenticate, (req, res, next) => {
  db.getUsers()
    .then(users => res.status(200).send(users))
    .catch(err => next(err));
});

router.get('/:id', authenticate, authorization, async (req, res, next) => {
  try {
    const user = await db.getUserDetails(req.params.id);
    res.status(200).send([user]);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/articles', authenticate, async (req, res, next) => {
  try {
    let user = await db.getUserIdName(req.params.id);

    if (user) {
      articles = await db.getUserArticles(req.params.id);
      user.articles = articles;

      // select categories.id from `articles_categories_relationship` join `categories` on `articles_categories_relationship`.`article_id` = `categories`.`id` where `articles_categories_relationship`.`category_id` = '1'

      let finalUser = Object.assign({}, user);

      user.articles.forEach(async (article, index) => {
        finalUser.articles[index].categories = [];
        const newCategories = await dbArticles.getCategoriesByArticleId(
          article.id
        );
        finalUser.articles[index].categories = newCategories;
        console.log(newCategories);
        console.log(finalUser.articles[index].categories);
      });
      console.log(finalUser);
      // console.log(user.articles[0]);

      res.status(200).json(finalUser);
    } else {
      next({ code: 400 });
    }
  } catch (err) {
    next(err);
  }
});

router.post(
  '/:id/categories',
  authenticate,
  authorization,
  async (req, res, next) => {
    try {
      category = req.body;
      category.name = category.name.trim();
      if (!(category.user_id === Number(req.params.id))) {
        next({ code: 400 });
      } else {
        const ids = await dbCategories.addCategory(category);
        res.status(201).send([{ id: ids[0] }]);
      }
    } catch (err) {
      if (err.errno === 19) {
        res.status(400).json({ error: 'category name already taken' });
      } else {
        next(err);
      }
    }
  }
);

router.put('/:id', authenticate, authorization, (req, res, next) => {
  let changes = req.body;

  db.getUserDetails(req.params.id)
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

router.delete('/:id', authenticate, authorization, (req, res, next) => {
  db.deleteUser(req.params.id)
    .then(count => {
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
      next(err);
    });
});

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
