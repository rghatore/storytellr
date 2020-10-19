// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js'); // getting data from .env file and passing to Pool
const db = new Pool(dbParams); // in our exammples we gave it the name pool
db.connect(); // this is basically to check if there are any errors

const queryString = `
SELECT *
FROM users
LIMIT $1;
`;

const queryParams = [3];

db.query(queryString, queryParams)
.then(response => console.log(response.rows))
.error(error => console.log(error.message));
