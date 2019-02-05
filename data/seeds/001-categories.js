exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert([
        { user_id: 1, name: 'General' },
        { user_id: 2, name: 'Lambda Times' },
        { user_id: 3, name: 'Other' }
      ]);
    });
};
