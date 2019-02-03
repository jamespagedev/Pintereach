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
    displayName: "RandomBlogger", // optional
    password: "pass123", // required
    email: "jp@email.com", // (Unique) optional
    imgUrl: "https://i.imgur.com/mACq7e7.jpg" // optional
  }

  axios.post('https://(api-web-address)/articles', newUser)
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

    axios.post('https://(api-web-address)/articles', creds)
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
        displayName: "James Page",
        email: "jp@email.com",
        imgUrl: "https://i.imgur.com/mACq7e7.jpg"
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
  axios.get('https://(api-web-address)/articles')
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
      coverPage: "HelloWorld.png",
      title: "Hello World",
      link: "https://helloworld.com/"
    },
    {
      id: 2,
      coverPage: "Front.txt",
      title: "Random Article",
      link: ""
    },
    {
      id: 3,
      coverPage: "index.html",
      title: "",
      link: "https://lambdaschool.com/"
    }
  ]
  ```

- GET `/articles/:id`

  - Explanation: returns single article
  - Example: Send

  ```
  axios.get(`https://(api-web-address)/articles/${2}`)
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
      coverPage: "Front.txt",
      title: "Random Article",
      link: ""
    }
  ]
  ```

- GET `/articles/:id/users`

  - Explanation: returns article with list of users
  - Example: Send

  ```
  axios.get(`https://(api-web-address)/articles/${3}/users`)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    article3: {
      id: 3,
      coverPage: "index.html",
      title: "",
      link: "https://lambdaschool.com/",
      users: {
        jamespage: {
          id: 1,
          displayName: "RandomBlogger", // will use username if displayName is   blank
        },
        catperson: {
          id: 2,
          displayName: "catperson", // will use username if displayName is blank
        }
      }
    }
  ]
  ```

- GET `/articles/users`

  - Explanation: returns list of articles and list of users for each article
  - Example: Send

  ```
  axios.get('https://(api-web-address)/articles/users/')
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      article1: {
        id: 1,
        coverPage: "HelloWorld.png",
        title: "Hello World",
        link: "https://helloworld.com/",
        users: {
          jamespage: {
            id: 1,
            displayName: "RandomBlogger", // will use username if displayName is   blank
          },
          catperson: {
            id: 2,
            displayName: "catperson", // will use username if displayName is   blank
          },
          reader: {
            id: 3,
            displayName: "reader" // will use username if displayName is blank
          }
        }
      },

      article2: {
        id: 2,
        coverPage: "Front.txt",
        title: "Random Article",
        link: "",
        users: {
          reader: {
            id: 3,
            displayName: "reader" // will use username if displayName is blank
          }
        }
      },

      article3: {
        id: 3,
        coverPage: "index.html",
        title: "",
        link: "https://lambdaschool.com/",
        users: {
          jamespage: {
            id: 1,
            displayName: "RandomBlogger", // will use username if displayName is   blank
          },
          catperson: {
            id: 2,
            displayName: "catperson", // will use username if displayName is   blank
          }
        }
      }
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
      coverPage: "CoverLetter.doc",
      title: "New Article",
      link: ""
    }
  }

  axios.post(`https://(api-web-address)/articles`, headersObj)
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
      coverPage: "CoverLetter.doc",
      title: "New Article",
      link: ""
    }
  ]
  ```

- PUT `/articles/:id` Requires AUTHORIZATION

  - Explanation: Edit an article
  - Example: Send

  ```
  // Note: Article MUST NOT contain both empty strings for title AND link
  headerObj = {
    headers: { authorization: token },
    body: {
      coverPage: "CoverLetter.doc",
      title: "New Article",
      link: "https://newarticle.com/"
    }
  }

  axios.put(`https://(api-web-address)/articles/${4}`, headersObj)
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
      coverPage: "CoverLetter.doc",
      title: "New Article",
      link: "https://newarticle.com/"
    }
  ]
  ```

- DELETE `/articles/:id` Requires AUTHORIZATION

  - Explanation: Delete an article
  - Example: Send

  ```
  const headersObj = {
    headers: { authorization: token }
  };

  axios.delete(`https://(api-web-address)/articles/${4}`, headersObj)
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

> /users <a name="UsersEnd"></a>

- GET `/users`

  - Explanation: returns all users
  - Example: Send

  ```
  axios.get('https://(api-web-address)/users')
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
      displayName: "RandomBlogger" // displayName value will be username if display name is empty
    },
    {
      id: 2,
      displayName: "catperson" // displayName value will be username if display name is empty
    },
    {
      id: 3,
      displayName: "reader" // displayName value will be username if display name is empty
    }
  ]
  ```

- GET `/users/:id`

  - Explanation: returns single user
  - Example: Send

  ```
  axios.get(`https://(api-web-address)/users/${2}`)
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
      displayName: "catperson", // displayName value will be username if display name is empty
    }
  ]
  ```

- GET `/users/articles`

```
Fill in later
```

- GET `/users/:id/articles`

  - Explanation: Returns a single user with all articles
  - Example: Send

  ```
  axios.get(`https://(api-web-address)/users/${2}/articles`)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      catperson: {
        id: 2,
        displayName: "catperson",
        articles: {
          article1: {
            id: 1,
            coverPage: "HelloWorld.png",
            title: "Hello World",
            link: "https://helloworld.com/"
          },
          article3: {
            id: 3,
            coverPage: "index.html",
            title: "",
            link: "https://lambdaschool.com/"
          }
        }
      }
    }
  ]
  ```

- GET `/users/:userId/articles/:articleId`

  - Explanation: Returns a single user with a sincle article
  - Example: Send

  ```
  axios.get(`https://(api-web-address)/users/${2}/articles/${1}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      catperson: {
        id: 2,
        displayName: "catperson",
        article1: {
          id: 1,
          coverPage: "HelloWorld.png",
          title: "Hello World",
          link: "https://helloworld.com/"
        }
      }
    }
  ]
  ```

- PUT `/users/:id/articles` Requires AUTHORIZATION

  - Explanation: edit a user key/value pairs (including password)
  - Example1: Send

  ```
  const headersObj = {
    headers: { authorization: token },
    body: {
      username: "catperson",
      oldpassword: "cats1",
      newpassword: "$his1sMuchBtter643"
    }
  };

  axios.put(`https://(api-web-address)/users/${2}/articles`, headersObj)
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

  axios.put(`https://(api-web-address)/users/${2}`, headersObj)
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

- DELETE `/users/:id` Requires AUTHORIZATION

  - Explanation: remove a user from the database
  - Example1: Send

  ```
  const headersObj = {
    headers: { authorization: token },
    password: "$his1sMuchBtter643"
  };

  axios.delete(`https://(api-web-address)/users/${2}`, headersObj)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
    {
      count: 2
    }
  ]
  ```

# Table Schema <a name="TableSchema"></a>

## users

| Field    | Data Type                  |
| -------- | -------------------------- |
| id       | Int (auto increment)       |
| username | String (unique) (required) |
| password | String (required)          |
| email    | String (optional)          |
| img_url  | String (optional)          |

## articles

| Field        | Data Type (requires at **LEAST** title **OR** link) |
| ------------ | --------------------------------------------------- |
| id           | Int (auto increment)                                |
| cover_letter | String (optional1)                                  |
| title        | String (optional1)                                  |
| link         | String (optional2)                                  |

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
  3. Pair programmed with the Web UI and Web Architect

- Student should have built a CRUD API using Node/Express

  1. Student did not build a CRUD API with all of the required endpoints, or the endpoints that exist don't work
  2. Student built a CRUD API using Node and Express, code is clean and organized.
  3. Student built a CRUD API using Node and Express, code is clean and organized. Student organized code using a patern similar to MVC, the usage of Routes and controllers and middleware is present and property incorperated throughout the project's backend

- Data model is normalized

  1. Student created a data model that exhibits data repetition and does not take advantage of foreign key constraints.
  2. Student built a normalized data model where each entity is tracked in it's own table and where appropriate made use of Foreign Key constraints to ensure data integrity and consistency.
  3. Student incorporated Knex migration and or seeding scripts to their solution.

- The API incorporates authentication

  1. Student did not add a way to authenticate users and restrict access to endpoints to only logged in users.
  2. Student added authentication and restricted endpoints to be accessible only by logged in users.
  3. Student added authorization and a way to restrict endpoints to users with that are authorized to access them. This could be as simple as using roles and restricting endpoints to a particular role.

- Project has automated testing suites covering Endpoints and Business Logic

  1. The solution does not have any automated testing in place.
  2. The core business logic is tested using unit tests.
  3. The project has unit and integration tests that include end to end testing using a test database.

- API is deployed to the web

  1. The solution does not have any automated testing in place.
  2. The core business logic is tested using unit tests.
  3. The project has unit and integration tests that include end to end testing using a test database.

- API is deployed to the web

  1. The solution does not have any automated testing in place.
  2. The core business logic is tested using unit tests.
  3. The project has unit and integration tests that include end to end testing using a test database.

- API is deployed to the web

  1. The API is not deployed and only runs on localhost.
  2. The API is deployed on the web and can be accessed from anywhere, but the deployment is done manually.
  3. The project has continuous deployment configured to deploy on commits to GitHub

- Secrets are protected using environment variables

  1. Any secrets like API keys and hashing secrets are hard-coded in the source code
  2. Secrets are extracted out into environment variables using .env files that most be manually changed when deploying.
  3. The project is configured to dinamically load the appropriate secrets based on the environment it's running on.
