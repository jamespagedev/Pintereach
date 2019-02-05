exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles_categories_relationship')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('articles_categories_relationship').insert([
        { article_id: 1, category_id: 1 },
        { article_id: 1, category_id: 3 },
        { article_id: 2, category_id: 2 },
        { article_id: 3, category_id: 1 },
        { article_id: 4, category_id: 1 },
        { article_id: 5, category_id: 3 },
        { article_id: 6, category_id: 1 },
        { article_id: 7, category_id: 3 },
        { article_id: 8, category_id: 3 },
        { article_id: 9, category_id: 1 }
      ]);
    });
};
