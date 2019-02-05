exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('articles').insert([
        {
          user_id: 1,
          title: 'Hello World',
          cover_page: 'https://coverpage1.com/',
          link: 'https://helloworld.com/'
        },
        {
          user_id: 1,
          title: 'Lambda Strikes Down Students With New Build Week',
          cover_page: 'https://i.imgur.com/zbg9mtf.png',
          link: ''
        },
        {
          user_id: 1,
          title: 'Deadlines — Bad reason for bad code.',
          cover_page: '',
          link:
            'https://medium.com/mindorks/deadlines-bad-reason-for-bad-code-d3d5fe22f3ff'
        },
        {
          user_id: 2,
          title: 'Cats',
          cover_page:
            'http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
          link: ''
        },
        {
          user_id: 2,
          title: 'Test Time',
          cover_page: '',
          link: 'https://blog.cleancoder.com/uncle-bob/2014/09/03/TestTime.html'
        },
        {
          user_id: 2,
          title: 'Dog',
          cover_page: '',
          link: 'https://en.wikipedia.org/wiki/Dog'
        },
        {
          user_id: 3,
          title: 'On a Dark Road',
          cover_page:
            'It started as I was driving towards an unknown object I saw in the mountains. The...',
          link: ''
        },
        {
          user_id: 3,
          title: 'Cats',
          cover_page: 'https://i.imgur.com/mACq7e7.jpg',
          link: ''
        },
        {
          user_id: 3,
          title: 'Cracking the Code Online IP Theft Is Not a Game',
          cover_page: '',
          link:
            'https://archives.fbi.gov/archives/news/stories/2007/february/iptheft020107'
        }
      ]);
    });
};
