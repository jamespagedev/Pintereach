const db = require('../dbConfig.js');

const addArticleToCategories = relationship => {
  return db('articles_categories_relationship').insert(relationship);
};

const deleteArticleToCategories = article_id => {
  return db('articles_categories_relationship')
    .where('article_id', article_id)
    .del();
};

module.exports = {
  addArticleToCategories,
  deleteArticleToCategories
};
