exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', function(tbl) {
    // Primary Key 'id'
    tbl.increments();

    // Other Columns
    tbl.string('categories', 255);
    tbl.string('cover_page', 255);
    tbl.string('title', 255);
    tbl.text('link');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('articles');
};
