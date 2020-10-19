const express = require('express'); // move this into server eventually
// const { database } = require('pg/lib/defaults');
const router  = express.Router(); // move this into server enentually and pass as an argument

module.exports = (database) => {
  router.get('/users:userId', (req, res) => {
    database.getStoriesByUser()
    .then(stories => {
      if(!stories) {
        res.send({error: 'empty library'});
      } else {
        res.send(stories)
      }
    }).catch(error => res.send(error.message))
  })
  return router;
}
