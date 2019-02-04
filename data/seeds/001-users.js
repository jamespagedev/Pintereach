exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'jamespage',
          display_name: 'RandomBlogger',
          password: 'pass123',
          email: 'jp@email.com',
          img_url: 'https://i.imgur.com/mACq7e7.jpg'
        },
        {
          username: 'catperson',
          display_name: 'catperson',
          password: 'cats1',
          email: 'kitty@email.com',
          img_url:
            'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg'
        },
        {
          username: 'reader',
          display_name: 'reader',
          password: 'pass123',
          email: '',
          img_url: ''
        }
      ]);
    });
};
