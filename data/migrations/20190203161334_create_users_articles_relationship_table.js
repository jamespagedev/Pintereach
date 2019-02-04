exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_articles_relationship', function(tbl) {
    // users reference key
    tbl
      .integer('users_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');

    // articles reference key
    tbl
      .integer('articles_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('articles');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropUnique('name')
    .dropTableIfExists('users_articles_relationship');
};
