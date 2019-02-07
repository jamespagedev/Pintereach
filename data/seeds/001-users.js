const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'jamespage',
          is_admin: true,
          display_name: 'RandomBlogger',
          password: bcrypt.hashSync('pass123', 12),
          email: 'jp@email.com',
          img_url: 'https://i.imgur.com/mACq7e7.jpg'
        },
        {
          username: 'catperson',
          is_admin: false,
          display_name: 'catperson',
          password: bcrypt.hashSync('cats123', 12),
          email: 'kitty@email.com',
          img_url:
            'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg'
        },
        {
          username: 'reader',
          is_admin: false,
          display_name: 'reader',
          password: bcrypt.hashSync('reader123', 12)
        }
      ]);
    });
};
