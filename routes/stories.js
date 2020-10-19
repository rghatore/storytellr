const express = require('express'); // move this into server eventually
// const { database } = require('pg/lib/defaults');
const router  = express.Router(); // move this into server enentually and pass as an argument

module.exports = (database) => {
  router.get('/', (req, res) => {
    database.getAllStories()
    .then(stories => {
      if(!stories) {
        res.send({error: 'empty library'});
      } else {
        res.send(stories)
        // for (const story of stories) {
        //   console.log(story)
        //   console.log({story: {title: story.title, content: story.content}})
        // }
        // console.log(stories)
      }
    }).catch(error => res.send(error.message))
  })
  return router;
}
