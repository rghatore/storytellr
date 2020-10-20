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

