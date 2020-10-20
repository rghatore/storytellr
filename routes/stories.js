const express = require('express'); // move this into server eventually
// const { database } = require('pg/lib/defaults');
const router  = express.Router(); // move this into server enentually and pass as an argument
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ["this is a very good key thank you", "nfjklasdfiasjudpfnonfniju2o3r94ruj123mn45rji42bn580423jnro"]
}));

module.exports = (database) => {
  // get all stories
  router.get('/', (req, res) => {
    database.getAllStories({user_name: null, search: null})
    .then(stories => {
      if(!stories) {
        res.send({error: 'empty library'});
      } else {
        res.send(stories)
      }
    }).catch(error => res.send(error.message))
  })

  // post a new story
  router.post('/', (req, res) => {
    // console.log(req.body);
    // console.log(req.session);
    const story = req.body;
    story['user_id'] = req.session['user_id'];
    database.addStory(story)
    .then((data) => {
      console.log(data);
    })
  })

  // gets stories by a specific user id
  // router.get('/:userId', (req, res) => {
  //   database.getUsernameFromUserId(req.params.userId)
  //   .then(data => {
  //     database.getAllStories({user_name: data.name, search: null})
  //     .then(stories => {
  //       if(!stories) {
  //         res.send({error: 'empty library'});
  //       } else {
  //         res.send(stories)
  //       }
  //     })
  //   })
  //   .catch(error => res.send(error.message))
  // })

  return router;
}
