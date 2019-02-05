exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles_categories_relationship', function(
    tbl
  ) {
    // Primary Key 'id'
    tbl.increments();

    // articles reference key
    tbl
      .integer('article_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('articles');

    // categories reference key
    tbl
      .integer('category_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('categories');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('articles_categories_relationship');
};
