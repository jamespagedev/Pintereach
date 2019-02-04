# Table of Contents

- [Reference Links](#Reference)
- [Tech Stack](#TechStack)
- [Project Summary](#ProjectSummary)
- [/Endpoints (For Frontend Usage)](#FrontEnd)
  - [Auth](#AuthEnd)
  - [Articles](#ArticlesEnd)
  - [Users](#UsersEnd)
- [Table Schema](#TableSchema)
- [Project Scores 1/2/3](#Rubrics)

# Reference Links <a name="Reference"></a>

- [policies and procedures](https://www.notion.so/Policies-and-Procedures-19e679fc1a284b668d8132dd8d7228cd)
- [Checklist](https://www.notion.so/Build-week-Schedule-and-Daily-Milestones-7f0aca2ad598459fa4492fdac9881d5b)
- [Rubric](https://docs.google.com/spreadsheets/d/1sFgvt8HtqNCw32YC8Wvrgrdb61oEWPTsBUrvOL3rAGQ/edit#gid=0) (Also see "Project Scores 1/2/3" below)
- [List of Projects](https://lambdaschool.monday.com/boards/165411499/)

# Tech Stack <a name="TechStack"></a>

- git - Command line tool used for version control.
- github - Webhosting site for containing repositories and supporting git commands.
- Javascript - Language/Files used.
- Node - Shorthand for NodeJS,
- Nodemon - Used for Development: Identifies changes made to your code upon saving, and restarts the server.
- Express - Sets up your index/server, middleware, routes, and endpoints.
- Morgan - Logging system for console logging things ran on backend.
- Helmet - Hides your techstack in the header front end.
- Cors - allows multiple outside connections to get access via different url/ports.
- knex - Handles Migration Tables, Seeds, Creates database file through client, provides query methods for server endpoints.
- sqlite3 - Generates Local Database File.

# Project Summary <a name="ProjectSummary"></a>

As a researcher, it's difficult to keep track of articles you want to read later. Pintereach helps you research by enabling you to save and organize articles in to categories to read later.

# /Endpoints (For Frontend Usage) <a name="FrontEnd"></a>

## Global CRUD Rules

- GET: Always Returns Array

- Requires AUTHENTICATION: Valid Token passed in Header

- Response Returns: if the value of the key(in the object) is empty, an empty string `""` will be returned as the key's value `{ key: "" }`

---

> /auth <a name="AuthEnd"></a>

- POST `/auth/register`

  - Example: Send

  ```
  const newUser = {
    username: "jamespage", // (Unique) required
    display_name: "RandomBlogger", // optional
    password: "pass123", // required
    email: "jp@email.com", // (Unique) optional
    img_url: "https://i.imgur.com/mACq7e7.jpg" // optional
  }

  axios.post('https://pintereach.herokuapp.com/articles', newUser)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - Example: Returned

  ```
  [
    {
      id: 1,
      token: "$g0w34t0a@*s*2S(aegn329g"
    }
  ]
  ```

- POST `/auth/login`

  - Example: Send

  ```
  const creds = {
    username: "jamespage", // required
    password: "pass123" // required
  }

    axios.post('https://pintereach.herokuapp.com/articles', creds)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - Example: Returned

  ```
  [
    {
      user: {
        id: 1,
        username: "jamespage",
        display_name: "James Page",
        email: "jp@email.com",
        img_url: "https://i.imgur.com/mACq7e7.jpg"
      },
      token: "$adfg9324rt$@!&asdgfh92fdsa2"
    }
  ]
  ```

> /articles <a name="ArticlesEnd"></a>

- GET `/articles`

  - Explanation: returns all articles
  - Example: Send

  ```
  axios.get('https://pintereach.herokuapp.com/articles')
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      id: 1,
      category: "General"
      cover_page: "HelloWorld.png",
      title: "Hello World",
      link: "https://helloworld.com/"
    },
    {
      id: 2,
      category: "Other"
      cover_page: "Front.txt",
      title: "Random Article",
      link: ""
    },
    {
      id: 3,
      category: "Education"
      cover_page: "index.html",
      title: "",
      link: "https://lambdaschool.com/"
    }
  ]
  ```

- GET `/articles/:id`

  - Explanation: returns single article
  - Example: Send

  ```
  axios.get(`https://pintereach.herokuapp.com/articles/${2}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      id: 2,
      category: "Other"
      cover_page: "Front.txt",
      title: "Random Article",
      link: ""
    }
  ]
  ```

- GET `/articles/:id/users`

  - Explanation: returns article with list of users
  - Example: Send

  ```
  axios.get(`https://pintereach.herokuapp.com/articles/${3}/users`)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      id: 3,
      category: "Education"
      cover_page: "index.html",
      title: "",
      link: "https://lambdaschool.com/",
      users: [
        {
          id: 1,
          display_name: "RandomBlogger", // will use username if display_name is blank
        },
        {
          id: 2,
          display_name: "catperson", // will use username if display_name is blank
        }
      ]
    }
  ]
  ```

- GET `/articles/users`

  - Explanation: returns list of articles and list of users for each article
  - Example: Send

  ```
  axios.get('https://pintereach.herokuapp.com/articles/users/')
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      id: 1,
      category: "General"
      cover_page: "HelloWorld.png",
      title: "Hello World",
      link: "https://helloworld.com/",
      users: [
        {
          id: 1,
          display_name: "RandomBlogger", // will use username if display_name is   blank
        },
        {
          id: 2,
          display_name: "catperson", // will use username if display_name is   blank
        },
        {
          id: 3,
          display_name: "reader" // will use username if display_name is blank
        }
      ]
    },
    {
      id: 2,
      category: "Other"
      cover_page: "Front.txt",
      title: "Random Article",
      link: "",
      users: [
        {
          id: 3,
          display_name: "reader" // will use username if display_name is blank
        }
      ]
    },
    {
      id: 3,
      category: "Education"
      cover_page: "index.html",
      title: "",
      link: "https://lambdaschool.com/",
      users: [
        {
          id: 1,
          display_name: "RandomBlogger", // will use username if display_name is   blank
        },
        {
          id: 2,
          display_name: "catperson", // will use username if display_name is   blank
        }
      ]
    }
  ]
  ```

- POST `/articles` Requires AUTHORIZATION

  - Explanation: Creates an article
  - Example: Send

  ```
  // Note: Article MUST NOT contain BOTH empty "" for title AND link
  headerObj = {
    headers: { authorization: token },
    body: {
      category: "New"
      cover_page: "CoverLetter.doc",
      title: "New Article",
      link: ""
    }
  }

  axios.post(`https://pintereach.herokuapp.com/articles`, headersObj)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      id: 4,
      category: "New"
      cover_page: "CoverLetter.doc",
      title: "New Article",
      link: ""
    }
  ]
  ```

- (needs discussion): PUT `/articles/:id` Requires AUTHORIZATION

  - Explanation: Edit an article
  - Rule: May only edit the article if all users are allowing this (some boolean setting?? What should the default be??), or... if no other users currently have this article on their board
  - Example: Send

  ```
  // Note: Article MUST NOT contain both empty strings for title AND link
  headerObj = {
    headers: { authorization: token },
    body: {
      category: "New"
      cover_page: "CoverLetter.doc",
      title: "New Article",
      link: "https://newarticle.com/"
    }
  }

  axios.put(`https://pintereach.herokuapp.com/articles/${4}`, headersObj)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      id: 4,
      category: "New"
      cover_page: "CoverLetter.doc",
      title: "New Article",
      link: "https://newarticle.com/"
    }
  ]
  ```

- DELETE `/articles/:id` Requires AUTHORIZATION

  - Explanation: Delete an article
  - Rule: Aricle can only be deleted if no users are using it on their boards
  - Example: Send

  ```
  const headersObj = {
    headers: { authorization: token }
  };

  axios.delete(`https://pintereach.herokuapp.com/articles/${4}`, headersObj)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      message: "success" // or "fail(with reason)"
    }
  ]
  ```

> /users <a name="UsersEnd"></a>

- GET `/users`

  - Explanation: returns all users
  - Example: Send

  ```
  axios.get('https://pintereach.herokuapp.com/users')
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      id: 1,
      display_name: "RandomBlogger" // display_name value will be username if display name is empty
    },
    {
      id: 2,
      display_name: "catperson" // display_name value will be username if display name is empty
    },
    {
      id: 3,
      display_name: "reader" // display_name value will be username if display name is empty
    }
  ]
  ```

- GET `/users/:id` Require AUTHORIZATION

  - Explanation: returns single user
  - Rule: Only able to view user attributes if they belong to user logged in
  - Example: Send

  ```
  axios.get(`https://pintereach.herokuapp.com/users/${1}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      id: 1,
      username: "jamespage",
      display_name: "RandomBlogger",
      email: "jp@email.com",
      img_url: "https://i.imgur.com/mACq7e7.jpg"
    }
  ]
  ```

- GET `/users/articles`

  - Explanation: Returns a list of all users with all their articles
  - Example: Send

  ```
  axios.get(`https://pintereach.herokuapp.com/users/articles`)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      id: 1,
      display_name: "RandomBlogger", // will use username if display_name is   blank
      articles: [
        {
          id: 1,
          category: "General"
          cover_page: "HelloWorld.png",
          title: "Hello World",
          link: "https://helloworld.com/",
        },
        {
          id: 3,
          category: "Education"
          cover_page: "index.html",
          title: "",
          link: "https://lambdaschool.com/",
        }
      ]
    },
    {
      id: 2,
      display_name: "catperson", // will use username if display_name is   blank
      articles: [
        {
          id: 1,
          category: "General"
          cover_page: "HelloWorld.png",
          title: "Hello World",
          link: "https://helloworld.com/",
        },
        {
          id: 2,
          category: "Other"
          cover_page: "Front.txt",
          title: "Random Article",
          link: "",
        }
      ]
    },
    {
      id: 3,
      display_name: "reader" // will use username if display_name is blank
      articles: [
        {
          id: 1,
          category: "General"
          cover_page: "HelloWorld.png",
          title: "Hello World",
          link: "https://helloworld.com/",
        },
        {
          id: 3,
          category: "Education"
          cover_page: "index.html",
          title: "",
          link: "https://lambdaschool.com/",
        }
      ]
    }
  ]
  ```

- GET `/users/:id/articles`

  - Explanation: Returns a single user with all articles
  - Example: Send

  ```
  axios.get(`https://pintereach.herokuapp.com/users/${2}/articles`)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      id: 2,
      display_name: "catperson",
      articles: [
        {
          id: 1,
          category: "General"
          cover_page: "HelloWorld.png",
          title: "Hello World",
          link: "https://helloworld.com/"
        },
        {
          id: 3,
          category: "Education"
          cover_page: "index.html",
          title: "",
          link: "https://lambdaschool.com/"
        }
      ]
    }
  ]
  ```

- GET `/users/:userId/articles/:articleId`

  - Explanation: Returns a single user with a sincle article
  - Example: Send

  ```
  axios.get(`https://pintereach.herokuapp.com/users/${2}/articles/${1}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      id: 2,
      display_name: "catperson",
      article: {
        id: 1,
        category: "General"
        cover_page: "HelloWorld.png",
        title: "Hello World",
        link: "https://helloworld.com/"
      }
    }
  ]
  ```

- Post `/users/articles` Requires AUTHORIZATION

  - Explanation: Add multiple articles to your user board (does not create a new article, for that, use Post `/articles`)
  - Note: Can only post articles on your own user boards... not other use boards
  - Example1: Send

  ```
  const headersObj = {
    headers: { authorization: token },
    body: {
      articlesIds: [1, 3]
        }
      ]
    }
  };

  axios.post(`https://pintereach.herokuapp.com/users/articles`, headersObj)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

- PUT `/users` Requires AUTHORIZATION

  - Explanation: edit a user key/value pairs (including password)
  - Note: Can only change the user attributes of your own user (not other users)
  - Example1: Send

  ```
  const headersObj = {
    headers: { authorization: token },
    body: {
      username: "catperson", // required (username cannot be changed)
      // Note: If changing the password, you must provide both the old and new password
      oldpassword: "cats1", // optional
      newpassword: "$his1sMuchBtter643" // optional
    }
  };

  axios.put(`https://pintereach.herokuapp.com/users/${2}/articles`, headersObj)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - Example2: Send

  ```
  const headersObj = {
    headers: { authorization: token },
    body: {
      username: "catperson",
      email: "kitty@email.com"
    }
  };

  axios.put(`https://pintereach.herokuapp.com/users`, headersObj)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      id: 2
    }
  ]
  ```

- DELETE `/users` Requires AUTHORIZATION

  - Explanation: remove your own user account from the database
  - Note: Can only delete your own user account (not other user accounts)
  - Example1: Send

  ```
  const headersObj = {
    headers: { authorization: token },
    body {
      password: "$his1sMuchBtter643" // required
    }
  };

  axios.delete(`https://pintereach.herokuapp.com/users`, headersObj)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      count: 1
    }
  ]
  ```

  - DELETE `/users/articles` Requires AUTHORIZATION

  - Explanation: remove all articles from the user board
  - Note: Can only delete the articles on your own user board (not articles on other user boards)
  - Example1: Send

  ```
  const headersObj = {
    headers: { authorization: token },
  };

  axios.delete(`https://pintereach.herokuapp.com/users/articles`, headersObj)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      count: 3
    }
  ]
  ```

  - DELETE `/users/articles/:id` Requires AUTHORIZATION

  - Explanation: remove a single article from the user board
  - Note: Can only delete your own user account (not articles on other user boards)
  - Example1: Send

  ```
  const headersObj = {
    headers: { authorization: token }
  };

  axios.delete(`https://pintereach.herokuapp.com/users/articles/${1}`, headersObj)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      count: 1
    }
  ]
  ```

# Table Schema <a name="TableSchema"></a>

## users

| Field        | Data Type                  |
| ------------ | -------------------------- |
| id           | Int (auto increment)       |
| username     | String (unique) (required) |
| display_name | String (optional)          |
| password     | String (required)          |
| email        | String (optional)          |
| img_url      | String (optional)          |

## articles

| Field      | Data Type (requires at **LEAST** title **OR** link) |
| ---------- | --------------------------------------------------- |
| id         | Int (auto increment)                                |
| category   | String (optional1)                                  |
| title      | String (optional2)                                  |
| cover_page | String (optional3)                                  |
| link       | Text (optional4)                                    |

## users_articles_relationship

| Field      | Data Type            |
| ---------- | -------------------- |
| id         | Int (auto increment) |
| user_id    | Int (required)       |
| article_id | Int (required)       |

# Project Scores 1/2/3 <a name="Rubrics"></a>

https://docs.google.com/spreadsheets/d/1sFgvt8HtqNCw32YC8Wvrgrdb61oEWPTsBUrvOL3rAGQ/edit#gid=0

- MVP work - Project should incorporate all of the listed MVP features

  1. Student did not achieve all of the MVP features of the project.
  2. Student's work demonstrates that all MVP features were built
  3. Student's work demonstrates that all MVP features were built and the student went above and beyond the project.

- Team contribution

  1. Little to no contributions were made by this team member.
  2. Team member was collaborative, able to work in a team environment
  3. [x] Pair programmed with the Web UI and Web Architect

  - Me and Jeff did zoom chats over the weekend (before project starting day on Monday)

- Student should have built a CRUD API using Node/Express

  1. Student did not build a CRUD API with all of the required endpoints, or the endpoints that exist don't work
  2. Student built a CRUD API using Node and Express, code is clean and organized.
  3. Student built a CRUD API using Node and Express, code is clean and organized. Student organized code using a patern similar to MVC, the usage of Routes and controllers and middleware is present and property incorperated throughout the project's backend

- Data model is normalized

  1. Student created a data model that exhibits data repetition and does not take advantage of foreign key constraints.
  2. Student built a normalized data model where each entity is tracked in it's own table and where appropriate made use of Foreign Key constraints to ensure data integrity and consistency.
  3. [x] Student incorporated Knex migration and or seeding scripts to their solution.

- The API incorporates authentication

  1. Student did not add a way to authenticate users and restrict access to endpoints to only logged in users.
  2. Student added authentication and restricted endpoints to be accessible only by logged in users.
  3. Student added authorization and a way to restrict endpoints to users with that are authorized to access them. This could be as simple as using roles and restricting endpoints to a particular role.

- Project has automated testing suites covering Endpoints and Business Logic

  1. The solution does not have any automated testing in place.
  2. The core business logic is tested using unit tests.
  3. The project has unit and integration tests that include end to end testing using a test database.

- API is deployed to the web

  1. The API is not deployed and only runs on localhost.
  2. The API is deployed on the web and can be accessed from anywhere, but the deployment is done manually.
  3. [x] The project has continuous deployment configured to deploy on commits to GitHub

- Secrets are protected using environment variables

  1. Any secrets like API keys and hashing secrets are hard-coded in the source code
  2. Secrets are extracted out into environment variables using .env files that most be manually changed when deploying.
  3. [x] The project is configured to dinamically load the appropriate secrets based on the environment it's running on.
