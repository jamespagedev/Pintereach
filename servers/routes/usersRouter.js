/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
require('dotenv').config();
const express = require('express');
const db = require('../../data/helpers/dbUsersHelpers.js');
const dbCategories = require('../../data/helpers/dbCategoriesHelpers.js');
const dbArticles = require('../../data/helpers/dbArticlesHelpers.js');
const dbRelationships = require('../../data/helpers/dbRelationshipHelpers.js');
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

/*  Difference between authorization and isUserAndAdmin...
    authorization - checks to see if the user id in the endpoint link is the same as the user id on the token
    isUserAndAdmin - checks to see if the user id in the token is equal to the userId (alias for user_id in the database table)
*/
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

async function isUserAndAdmin(req, res, next) {
  try {
    let userInCheck = await db.getUserDetails(req.decodedToken.id);
    if (userInCheck.id === Number(req.params.userId) || userInCheck.is_admin) {
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
// Gets a list of users with just the user id and display name
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

// Gets a list of articles belonging to users
router.get('/:id/articles', authenticate, async (req, res, next) => {
  try {
    let user = await db.getUserIdName(req.params.id);

    if (user) {
      user.articles = await db.getUserArticles(req.params.id);
      let finalUser = await Object.assign({}, user);

      for (let articleI = 0; articleI < user.articles.length; articleI++) {
        categories = await dbArticles.getCategoriesByArticleId(
          finalUser.articles[articleI].id
        );

        finalUser.articles[articleI].categories = [];

        for (const category of categories) {
          finalUser.articles[articleI].categories.push(category);
        }
      }

      res.status(200).json(finalUser);
    } else {
      next({ code: 400 });
    }
  } catch (err) {
    next(err);
  }
});

// Creates article for user
router.post('/articles', authenticate, async (req, res, next) => {
  res.status(201).send('success');
  // try {
  //   // needs at least 1 (cover_page OR title OR link)
  //   if (!req.body.cover_page && !req.body.title && !req.body.link) {
  //     throw { code: 400 };
  //   }

  //   // create modified article object for query
  //   let article = { user_id: Number(req.decodedToken.id) };
  //   req.body.cover_page
  //     ? (article.cover_page = req.body.cover_page)
  //     : (article.cover_page = '');
  //   req.body.title ? (article.title = req.body.title) : (article.title = '');
  //   req.body.link ? (article.link = req.body.link) : (article.link = '');

  //   // check for duplicate articles
  //   db.getUserArticles(req.decodedToken.id)
  //     .then(response => {
  //       let articleExists = response.some(articleInCheck => {
  //         if (
  //           ((req.body.title &&
  //             articleInCheck.title.toLowerCase() ===
  //               req.body.title.toLowerCase()) ||
  //             (req.body.link &&
  //               articleInCheck.link.toLowerCase() ===
  //                 req.body.link.toLowerCase()) ||
  //             (req.body.cover_page &&
  //               articleInCheck.cover_page.toLowerCase() ===
  //                 req.body.cover_page.toLowerCase())) &&
  //           articleInCheck.user_id === req.decodedToken.id
  //         )
  //           return true;
  //         return false;
  //       });
  //       if (articleExists) throw { errno: 19 };
  //     })
  //     .catch(err => {
  //       if (err.errno == 19) {
  //         res
  //           .status(400)
  //           .json({ error: 'article cover_page/title/link already taken' });
  //       } else {
  //         next(err);
  //       }
  //     });

  //   // query article
  //   const results = await dbArticles.addArticle(article);
  //   const article_id = results[0];

  //   // if categories were given, add the row(s) to the relational table
  //   if (req.body.category_ids) {
  //     const category_ids = req.body.category_ids.slice();
  //     for (let i = 0; i < category_ids.length; i++) {
  //       await dbRelationships.addArticleToCategories({
  //         article_id: article_id,
  //         category_id: category_ids[i]
  //       });
  //     }
  //   }
  //   res.status(201).json([{ id: article_id }]);
  // } catch (err) {
  //   if (err.errno === 19) {
  //     res
  //       .status(400)
  //       .json({ error: 'article cover_page/title/link already taken' });
  //   } else {
  //     next(err);
  //   }
  // }
});

// Creates category
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

// Edits user properties
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

// Edits the article for the user
router.put(
  '/:userid/articles/:id',
  authenticate,
  isUserAndAdmin,
  async (req, res, next) => {
    res.status(200).send('success');
  }
);

// Delete User
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

// Delete User Article
router.delete(
  '/:userId/articles/:id',
  authenticate,
  isUserAndAdmin,
  async (req, res, next) => {
    try {
      const count = await dbArticles.deleteArticle(req.params.id);
      if (count > 0) {
        res.status(200).json([
          {
            articlesDeleted: count,
            message: 'Article was successfully removed'
          }
        ]);
      } else {
        res.status(404).json([
          {
            error: 404,
            message: `The article with id ${req.params.id} was not found`
          }
        ]);
      }
    } catch (err) {
      next(500);
    }
  }
);

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
