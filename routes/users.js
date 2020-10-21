/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express'); // move this into server eventually
const app = express();
const router  = express.Router(); // move this into server enentually and pass as an argument
const { login, register } = require('../helpers');
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ["this is a very good key thank you", "nfjklasdfiasjudpfnonfniju2o3r94ruj123mn45rji42bn580423jnro"]
}));


module.exports = (database) => {
  // router.get("/", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  router.post('/login', (req, res) => {
    // console.log('hello');
    const {email, password} = req.body;

   login(email, password, database)
    .then((user) => {
      if(!user) {
        // console.log({error: "User not found! Please register."});
        // console.log(user)
        res.send({error: "User not found! Please register."});
        return;
      }
      //  assign cookie
      req.session['user_id'] = user.id;
      // send user object to ajax request
      // console.log({user: {name: user.name, email: user.email, id: user.id}});
      res.send(user);
    })
    // .catch((error) => res.send(error.message));
    .catch((error) => {
      // console.log(error)
      res.send(error.message)
    });
  });

  router.post('/register', (req, res) => {
    const {name, email, password} = req.body;

    register(name, email, password, database)
    .then(newUser => {
      // console.log('newUser: ', newUser);
      if(!newUser) {
        // console.log({error: 'User already registered! Please login.'});
        res.send({error: 'User already registered! Please login.'});
        return;
      }
      //  assign cookie
      req.session['user_id'] = newUser.id;
      // send user object to ajax request
      res.send(newUser);
    })
    .catch((error) => {
      // console.log(error)
      res.send(error.message)
    })
  });

  router.post('/logout', (req, res) => {
    // console.log('before :', req.session['user_id']);
    req.session['user_id'] = null;
    // console.log('after: ', req.session['user_id']);

    res.send('Logged out successfully!');
  })

// profile page
  router.get('/:username', (req, res) => {
    // console.log('ajax request: ', req.body)
    const username = req.params.username;
    // console.log(username)
    // copied from stories route
    // database.getUsernameFromUserId(username)
    // .then(data => {
      database.getAllStories({user_name: username, search: null})
      .then(stories => {
        if(!stories) {
          res.send({error: 'empty library'});
        } else {
          res.send(stories)
        }
      })
    // })
    .catch(error => res.send(error.message))

    // res.send('profilePage');
  })

  return router;
};
