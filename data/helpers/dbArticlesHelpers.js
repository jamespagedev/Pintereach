const db = require('../dbConfig.js');
const dbRelationship = require('./dbRelationshipHelpers.js');

const getArticle = article_id => {
  return db('articles')
    .where('id', article_id)
    .first();
};

const getCategoriesByArticleId = articleId => {
  // select categories.id from `articles_categories_relationship` join `categories` on `articles_categories_relationship`.`article_id` = `categories`.`id` where `articles_categories_relationship`.`category_id` = '1'
  return db
    .select('categories.id', 'categories.name')
    .from('articles_categories_relationship')
    .innerJoin(
      'categories',
      'articles_categories_relationship.article_id',
      'categories.category_id'
    )
    .where('articles_categories_relationship.category_id', articleId);
};

const addArticle = article => {
  /*  These sql commands work on SQLiteStudio,
      but I was not able to get them to work with knex methods...
      `select * from 'articles' where LOWER("cover_page") = ? AND "cover_page" != "" AND "user_id" = ?`
      OR
      `select * from 'articles' where LOWER("title") = ? AND "title" != "" AND "user_id" = ?`
      OR
      `select * from 'articles' where LOWER("link") = ? AND "link" != "" AND "user_id" = ?`

      ... so instead, I am using javascript to validate
      the input before calling this method.
      (See '// check for duplicate articles' on file usersRouter.js)
  */
  return db('articles').insert(article);
};

const updateArticle = (id, changes) => {
  return db('articles')
    .where('id', id)
    .update(changes);
};

const deleteArticle = async article_id => {
  const articleToCategoryIds = await dbRelationship.deleteArticleToCategories(
    article_id
  );

  return await db('articles')
    .where('id', article_id)
    .del();
};

module.exports = {
  getArticle,
  getCategoriesByArticleId,
  addArticle,
  updateArticle,
  deleteArticle
};
