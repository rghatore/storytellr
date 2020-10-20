const express = require("express"); // move this into server eventually
// const { database } = require('pg/lib/defaults');

const router  = express.Router(); // move this into server enentually and pass as an argument
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ["this is a very good key thank you", "nfjklasdfiasjudpfnonfniju2o3r94ruj123mn45rji42bn580423jnro"]
}));


module.exports = (database) => {
  // get all stories
  router.get("/", (req, res) => {
    database
      .getAllStories({ user_name: null, search: null })
      .then((stories) => {
        if (!stories) {
          res.send({ error: "empty library" });
        } else {
          res.send(stories);
        }
      })
      .catch((error) => res.send(error.message));
  });

  // post a new story
  router.post('/', (req, res) => {
    // console.log(req.body);
    // console.log(req.session);
    const story = req.body;
    story['user_id'] = req.session['user_id'];
    database.addStory(story)
    .then((data) => {
      console.log(data);
      res.send(data);
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
  //     .catch((error) => res.send(error.message));
  // });

  // gets story by id
  // everything to do with branches still needs to be queried
  router.get("/:storyId", (req, res) => {
    database
      //the first function call returns the stories object from the stories relation
      .getStoryById(req.params.storyId)
      .then((story) => {
        if (story.length < 1) {
          res.send({ error: "empty library" });
        } else {
          //the second function call queries favourites in the db and appends the count of favourites to the stories object
          database.getFaveCountByStoryId(req.params.storyId).then((faves) => {
            story[0].times_favourited = faves[0].times_favourited;
            //the last function call queries story_keywords and populates an array of keywords in the stories object
            database
              .getKeywordsByStoryId(req.params.storyId)
              .then((keywords) => {
                story[0].keywords = [];
                for (let entry of keywords) {
                  story[0].keywords.push(entry.keywords);
                }
                res.send(story);
              });
          });
        }
      })
      .catch((error) => console.error(error.message));
  });

  return router;
};
