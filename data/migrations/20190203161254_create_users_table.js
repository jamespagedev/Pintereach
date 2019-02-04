exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    // Primary Key 'id'
    tbl.increments();

    // Other Columns
    tbl
      .string('username', 128)
      .notNullable()
      .unique();
    tbl
      .string('display_name', 128)
      .notNullable()
      .unique();
    tbl.string('password', 128).notNullable();
    tbl.text('email').unique();
    tbl.boolean('img_url').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropUnique('name').dropTableIfExists('users');
};
