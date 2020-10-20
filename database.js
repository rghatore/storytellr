// PG database client/connection setup
const { Pool } = require('pg');
const { password } = require('pg/lib/defaults');
const dbParams = require('./lib/db.js'); // getting data from .env file and passing to Pool
const db = new Pool(dbParams); // in our exammples we gave it the name pool
db.connect(); // this is basically to check if there are any errors

// get users from database that have the email passed as argument
const getUserFromEmail = (email) => {
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1;
  `;

  const queryParams = [email];

  return db.query(queryString, queryParams)
  .then(response => response.rows[0]);
}
exports.getUserFromEmail = getUserFromEmail;

// add registration data to the database
const addUser = (user) => {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `;

  const queryParams = [user.name, user.email, user.password];

  return db.query(queryString, queryParams)
  .then(response => response.rows[0]);
}
exports.addUser = addUser;

const getUsernameFromUserId = (user_id) => {
  const queryString = `
  SELECT name
  FROM users
  WHERE id = $1
  `;
  const queryParams = [user_id];
  return db.query(queryString, queryParams)
  .then(response => response.rows[0]);
}
exports.getUsernameFromUserId = getUsernameFromUserId;

// const getAllStories = () => {
//   const queryString = `
//   SELECT *, users.name
//   FROM stories
//   JOIN users ON users.id = user_id
//   LIMIT 5;
//   `;

//   return db.query(queryString)
//   .then(response => response.rows);
// }

// exports.getAllStories = getAllStories;

// const getStoriesByUser = (user) => {
//   const queryString = `
//   SELECT *, users.name
//   FROM stories
//   JOIN users ON users.id = user_id
//   WHERE users.name = $1
//   LIMIT 5;
//   `;

//   const queryParams = [user];

//   return db.query(queryString, queryParams)
//   .then(response => response.rows);
// }

// exports.getStoriesByUser = getStoriesByUser;


const getAllStories = (options) => {
  const queryParams = [];
  // basic getting all stories + authors/users
  let queryString = `
  SELECT *, users.name
  FROM stories
  JOIN users ON users.id = user_id
  `;

  // for a specific author/user
  if (options.user_name) {
    queryParams.push(`%${options.user_name}%`);
    queryString += `WHERE users.name LIKE $${queryParams.length}`;
  }
  // searching for a word in the title or author name
  if (options.search) {
    queryParams.push(`%${options.search}%`);
    if (queryString.search('WHERE') === -1) {
      queryString += `WHERE stories.title LIKE $${queryParams.length}
      OR users.name LIKE $${queryParams.length}`;
    } else {
      queryString += `AND stories.title LIKE $${queryParams.length}
      OR users.name LIKE $${queryParams.length}`;
    }
  }

  queryString += `
  LIMIT 3;
  `;

  return db.query(queryString, queryParams)
  .then(response => response.rows);
}

exports.getAllStories = getAllStories;
