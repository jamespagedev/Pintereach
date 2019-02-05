const db = require('../dbConfig.js');

const getCategoriesByArticleId = articleId => {
  // select categories.id from `articles_categories_relationship` join `categories` on `articles_categories_relationship`.`article_id` = `categories`.`id` where `articles_categories_relationship`.`category_id` = '1'
  return db
    .select('categories.id')
    .from('articles_categories_relationship')
    .innerJoin(
      'categories',
      'articles_categories_relationship.article_id',
      'categories.id'
    )
    .where('articles_categories_relationship.category_id', articleId);
};

module.exports = {
  getCategoriesByArticleId
};
