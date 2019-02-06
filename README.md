# Table of Contents

- [Reference Links](#Reference)
- [Tech Stack](#TechStack)
- [Project Summary](#ProjectSummary)
- [/Endpoints (For Frontend Usage)](#FrontEnd)
  - [Auth](#AuthEnd)
  - [Users](#UsersEnd)
  - [Categories](#CategoriesEnd)
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

- [x] POST `/auth/register`

  - Example: Send

  ```
  const newUser = {
    username: "jamespage", // (Unique) required
    display_name: "RandomBlogger", // optional
    password: "pass123", // required
    email: "jp@email.com", // (Unique) optional
    img_url: "https://i.imgur.com/mACq7e7.jpg" // optional
  }

  axios.post('https://pintereach.herokuapp.com/auth/register', newUser)
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

- [x] POST `/auth/login`

  - Example: Send

  ```
  const creds = {
    username: "jamespage", // required
    password: "pass123" // required
  }

    axios.post('https://pintereach.herokuapp.com/auth/login', creds)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err));
  ```

  - Example: Returned

  ```
  [
    {
      message: "Logged in",
      token: "$adfg9324rt$@!&asdgfh92fdsa2"
    }
  ]
  ```

> /users <a name="UsersEnd"></a>

- [x] GET `/users` Requires AUTHORIZATION

  - Explanation: returns all users
  - Example: Send

  ```
  const headersObj = {
    headers: { authorization: token }
  };

  axios.get('https://pintereach.herokuapp.com/users', headersObject)
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

- [x] GET `/users/:id` Require AUTHORIZATION AND AUTHENTICATION(admin and/or self-user only)

  - Explanation: returns single user
  - Rule: User is only able to view user attributes if they belong to user logged in. Admin can view user attributes of any user.
  - Example: Send

  ```
  const headersObj = {
    headers: { authorization: token }
  };

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

- [x] GET `/users/:id/articles`

- Explanation: Returns a single user with all articles

  - Example: Send

  ```
  const headersObj = {
    headers: { authorization: token }
  };

  axios.get(`https://pintereach.herokuapp.com/users/${1}/articles`, headersObj)
  .then(response => {
    console.log(response.data)
  })
  .catch(err => console.log(err));

  ```

  - example: Receive

  ```
  {
    "id": 1,
    "display_name": "RandomBlogger",
    "articles": [
      {
          "id": 1,
          "user_id": 1,
          "cover_page": "https://coverpage1.com/",
          "title": "Hello World",
          "link": "https://helloworld.com/",
          "categories": [
              {
                  "id": 1,
                  "name": "General"
              },
              {
                  "id": 3,
                  "name": "Other"
              }
          ]
      },
      {
          "id": 2,
          "user_id": 1,
          "cover_page": "https://i.imgur.com/zbg9mtf.png",
          "title": "Lambda Strikes Down Students With New Build Week",
          "link": "",
          "categories": [
              {
                  "id": 2,
                  "name": "Lambda Times"
              }
          ]
      },
      {
          "id": 3,
          "user_id": 1,
          "cover_page": "",
          "title": "Deadlines — Bad reason for bad code.",
          "link": "https://medium.com/mindorks/deadlines-bad-reason-for-bad-code-d3d5fe22f3ff",
          "categories": [
              {
                  "id": 1,
                  "name": "General"
              }
          ]
      }
    ]
  }
  ```

- GET `/users/:userId/articles/:articleId`
- Explanation: Returns a single user with a sincle article

- [x] Post `/users/:id/categories` Requires AUTHORIZATION and AUTHENTICATION

  - Example: Send

  ```
  const headersObj = {
    headers: { authorization: token },
    body: {
      user_id: 1,
      name: "General"
    }
  };

  axios.delete(`https://pintereach.herokuapp.com/users/articles/${1}`, headersObj)
  .then(response => {
    console.log(response.data);
  })
  .catch(err => console.log(err));
  ```

  - Example: Received

  ```
  [
    {
        "id": 1
    }
  ]
  ```

- [x] Post `/users/articles` Requires AUTHORIZATION

- Explanation: add article to your user board
- Rule: Can only post articles on your own user boards... not other use boards (this includes admins)

  - Example1: Send

  ```
  const headersObj = {
    headers: { authorization: token },
    body: {
      "cover_page": "https://coverpage1.com/", // optional, requires at least 1
      "title": "Hello World", // optional, requires at least 1
      "link": "https://helloworld.com/", // optional, requires at least 1
      "category_ids": [ 1, 3 ] // optional
    }
  };

  axios.post(`https://pintereach.herokuapp.com/users/${1}/articles`, headersObj)
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
      "cover_page": "",
      "title": "Deadlines — Bad reason for bad code.",
      "link": "https://medium.com/mindorks/deadlines-bad-reason-for-bad-code-d3d5fe22f3ff"
    }
  };

  axios.post(`https://pintereach.herokuapp.com/users/articles`, headersObj)
  .then(response => {
    console.log(response.data)
  })
  .catch(err => console.log(err));
  ```

  - Example: Receive

  ```
  [
    {
        "id": 94
    }
  ]
  ```

* [x] PUT `/users/:id` Requires AUTHORIZATION

* Explanation: edit a user key/value pairs (including password)
* Note: Only SAME USER or ADMIN can change the user attributes (not other users)
* Note2: DO NOT include `is_admin` property in the `headersObj`, or it will set it to false.

  - Example1: Send

  ```
  const headersObj = {
  headers: { authorization: token },
  body: {
  username: "catperson", // required (username cannot be changed)
  // Note: If changing the password, you must provide both the old and new   password
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
      'Users Changed': 1
      message: "changes successful"
    }
  ]

  ```

- [x] DELETE `/users/:id` Requires AUTHORIZATION

- Explanation: remove your own user account from the database
- Note: Only SAME USER or ADMIN can delete the user account (not other users)

  - Example: Send

  ```
  const headersObj = {
  headers: { authorization: token },
  body {
  password: "\$his1sMuchBtter643" // required
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
      'Users Deleted': 1,
      message: "user was successfully removed"
    }
  ]
  ```

* [x] DELETE `/users/:userId/articles/:id'` Requires AUTHORIZATION

* Explanation: remove a single article from the user board
* Note: Can only delete an article belonging to your own user account (unless you are admin)

  - Example: Send

  ```
  const headersObj = {
  headers: { authorization: token }
  };

  axios.delete(`https://pintereach.herokuapp.com/users/${userId}/articles/${articleId}`, headersObj)
  .then(response => {
  console.log(response.data)
  })
  .catch(err => console.log(err));
  ```

  - example: Receive

  ```
  [
      {
          "articlesDeleted": 1,
          "message": "Article was successfully removed"
      }
  ]
  ```

> Categories <a name="CategoriesEnd"></a>

- [x] GET `/categories` Requires AUTHORIZATION

- [x] GET `/categories/:id` Requires AUTHORIZATION

- GET `/categories/:id/articles` Requires AUTHORIZATION

- PUT `/categories/:id` Requires AUTHORIZATION and AUTHENTICATION
- Rule: Only admins can edit categories

- [x] DELETE `/categories/:id` Requires AUTHORIZATION and AUTHENTICATION
- Rule: Only admins can delete categories

  - Example: Send

  ```
  const headersObj = {
  headers: { authorization: token }
  };

  axios.delete(`https://pintereach.herokuapp.com/categories/${:id}`, headersObj)
  .then(response => {
  console.log(response.data)
  })
  .catch(err => console.log(err));
  ```

  - Example: Receive

  ```
  [
    {
        "categoriesDeleted": 1,
        "message": "Category was successfully removed"
    }
  ]
  ```

# Table Schema <a name="TableSchema"></a>

## users

| Field        | Data Type                          |
| ------------ | ---------------------------------- |
| id           | Int (auto increment)               |
| is_admin     | boolean (optional) (default false) |
| username     | String (unique) (required)         |
| display_name | String (optional)                  |
| password     | String (required)                  |
| email        | String (optional)                  |
| img_url      | String (optional)                  |

## articles

| Field      | Data Type (requires at **LEAST** title **OR** link) |
| ---------- | --------------------------------------------------- |
| id         | Int (auto increment)                                |
| user_id    | Foreign Key (points to id of users table)           |
| title      | String (optional1)                                  |
| cover_page | String (optional2)                                  |
| link       | Text (optional3)                                    |

## categories

| Field   | Data Type                  |
| ------- | -------------------------- |
| id      | Int (auto increment)       |
| user_id | Int (Required) (Unique)    |
| name    | String (Required) (Unique) |

## articles_categories_relationship

| Field         | Data Type                                      |
| ------------- | ---------------------------------------------- |
| id            | Int (auto increment)                           |
| articles_id   | Foreign Key (points to id of articles table)   |
| categories_id | Foreign Key (points to id of categories table) |

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
3. [x] Student added authorization and a way to restrict endpoints to users with that are authorized to access them. This could be as simple as using roles and restricting endpoints to a particular role.

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

```

```
