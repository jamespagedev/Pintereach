exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    // Primary Key 'id'
    tbl.increments();

    // Other Columns
    tbl.boolean('is_admin').defaultTo(false);
    tbl
      .string('username', 128)
      .notNullable()
      .unique();
    tbl.string('display_name', 128).unique();
    tbl.string('password', 128).notNullable();
    tbl.text('email').unique();
    tbl.text('img_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
