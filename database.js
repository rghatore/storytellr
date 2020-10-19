// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js'); // getting data from .env file and passing to Pool
const db = new Pool(dbParams); // in our exammples we gave it the name pool
db.connect(); // this is basically to check if there are any errors


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

const getAllStories = () => {
  const queryString = `
  SELECT *, users.name
  FROM stories
  JOIN users ON users.id = user_id
  LIMIT 2;
  `;

  return db.query(queryString)
  .then(response => response.rows);
}

exports.getAllStories = getAllStories;
