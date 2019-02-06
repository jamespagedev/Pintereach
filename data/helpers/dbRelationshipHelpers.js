const db = require('../dbConfig.js');

const addArticleToCategories = relationship => {
  return db('articles_categories_relationship').insert(relationship);
};

module.exports = {
  addArticleToCategories
};
