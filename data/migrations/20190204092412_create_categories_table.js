exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', function(tbl) {
    // Primary Key 'id'
    tbl.increments();

    // users reference key
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');

    tbl
      .string('name', 255)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('categories');
};
