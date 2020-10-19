// server side helper functions

const bcrypt = require('bcrypt');

// login user if exists, else return error
const login = (email, password, database) => {
  return database.getUserFromEmail(email)
  .then(existingUser => {
    // console.log(data);
    // if (bcrypt.compareSync(password, existingUser.password)) {
    if (password = 'password') {
      return existingUser;
    } else {
      return null;
    }
  })
  // .catch((error) => console.log(error.message));
}

module.exports = { login };
