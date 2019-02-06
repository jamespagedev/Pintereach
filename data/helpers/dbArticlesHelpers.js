const db = require('../dbConfig.js');

const getCategoriesByArticleId = articleId => {
  // select categories.id from `articles_categories_relationship` join `categories` on `articles_categories_relationship`.`article_id` = `categories`.`id` where `articles_categories_relationship`.`category_id` = '1'
  return db
    .select('categories.id', 'categories.name')
    .from('articles_categories_relationship')
    .innerJoin(
      'categories',
      'articles_categories_relationship.article_id',
      'categories.id'
    )
    .where('articles_categories_relationship.category_id', articleId);
};

const addArticle = async article => {
  let doesExist;

  doesExist = await db('articles')
    .where(
      db
        .raw('LOWER("cover_page") = ?', article.cover_page.toLowerCase())
        .whereNot('cover_page', '')
    )
    .orWhere(
      db
        .raw('LOWER("title") = ?', article.title.toLowerCase())
        .andWhereNot('title', '')
    )
    .orWhere(
      db
        .raw('LOWER("link") = ?', article.link.toLowerCase())
        .andWhereNot('link', '')
    )
    .first();
  if (doesExist) {
    throw { errno: 19 };
  }
  return db('articles').insert(article);
};

module.exports = {
  getCategoriesByArticleId,
  addArticle
};
