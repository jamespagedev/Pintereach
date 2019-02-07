const db = require('../dbConfig.js');

const addArticleToCategories = relationship => {
  console.log(relationship);
  return db('articles_categories_relationship').insert(relationship);
};

const deleteArticleToCategories = article_id => {
  return db('articles_categories_relationship')
    .where('article_id', article_id)
    .del();
};

const deleteCategoryToArticles = category_id => {
  return db('articles_categories_relationship')
    .where('category_id', category_id)
    .del();
};

module.exports = {
  addArticleToCategories,
  deleteArticleToCategories,
  deleteCategoryToArticles
};
