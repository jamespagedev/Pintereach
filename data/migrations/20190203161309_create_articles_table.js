exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', function(tbl) {
    // Primary Key 'id'
    tbl.increments();

    // users reference key
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');

    // Other Columns
    tbl.string('cover_page', 255);
    tbl.string('title', 255);
    tbl.text('link');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('articles');
};
