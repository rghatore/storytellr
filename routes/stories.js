const express = require('express'); // move this into server eventually
// const { database } = require('pg/lib/defaults');
const router  = express.Router(); // move this into server enentually and pass as an argument


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

  // gets stories by a specific user id
  router.get('/:userId', (req, res) => {
    database.getUsernameFromUserId(req.params.userId)
    .then(data => {
      database.getAllStories({user_name: data.name, search: null})
      .then(stories => {
        if(!stories) {
          res.send({error: 'empty library'});
        } else {
          res.send(stories)
        }
      })
    })
    .catch(error => res.send(error.message))
  })

  return router;
}
