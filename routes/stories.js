const express = require("express"); // move this into server eventually
// const { database } = require('pg/lib/defaults');

const router = express.Router(); // move this into server enentually and pass as an argument
const cookieSession = require("cookie-session");
const { branchFilterAndSort, populateKeywordArray } = require("../helpers");
router.use(
  cookieSession({
    name: "session",
    keys: [
      "this is a very good key thank you",
      "nfjklasdfiasjudpfnonfniju2o3r94ruj123mn45rji42bn580423jnro",
    ],
  })
);

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
  router.post("/", (req, res) => {
    // console.log(req.body);
    // console.log(req.session);
    const story = req.body;

    story['user_id'] = req.session['user_id'];
    database.addStory(story)
    .then((data) => {
      // console.log(data);
      res.send(data);
    });
  });

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

  // gets story + branch and keyword info by id
  router.get("/:storyId", (req, res) => {
    console.log(req.session['user_id']);
    //the first function call returns the stories object from the stories relation
    database
      .getStoryById(req.params.storyId)
      .then((story) => {
        if (story.length < 1) {
          res.send({ error: "empty library" });
        } else {
          //the second function call queries favourites in the db and appends the count of favourites to the stories object
          database.getFaveCountByStoryId(req.params.storyId).then((faves) => {
            story[0].times_favourited = faves[0].times_favourited;
            //the third function call queries story_keywords and populates an array of keywords in the stories object
            database
              .getKeywordsByStoryId(req.params.storyId)
              .then((keywords) => {
                story[0].keywords = [];
                for (let entry of keywords) {
                  story[0].keywords.push(entry.keywords);
                }
                database
                  .getBranchesByStoryId(req.params.storyId)
                  .then((branches) => {
                    // branchFilterAndSort is defined in helpers.js on the server side
                    let approvedBranches = branchFilterAndSort(branches);
                    story[0].branches = approvedBranches;
                    res.send(story);
                  });
              });
          });
        }
      })
      .catch((error) => console.error(error.message));
  });

  router.post('/branches', (req, res) => {

    const branch = req.body;
    if(!req.session['user_id']) {
      res.send({error: 'Please login to add branches.'});
    } else {
      branch['user_id'] = req.session['user_id'];
      // console.log('branch: ', branch);
      // console.log(branch)
      database.getBranchPointFromStoryPage(branch)
      .then(data => {
        branch.lastBranchPoint = data.id;
        console.log('branch: ', branch)
        database
        .addBranch(branch)
        .then((data) => {
          database.getUsernameFromUserId(data.user_id)
          .then((username) => {
            data.name = username.name;
            console.log('data being sent: ', data);
            res.send(data);
          })
        })
      })
      .catch(error => console.log(error.message));
    }
  })
  // module.exports = (database) => {
  router.get("/branches/:branch_point_id", (req, res) => {
    console.log(req.params)
    database
      .getBranchesByBranchPointId(req.params.branch_point_id)
      .then((branches) => {
        if (!branches) {
          res.send({ error: "empty library" });
        } else {
          // console.log(branches);
          res.send(branches);
        }
      })
      .catch((error) => res.send(error.message));
  });
  // return router;
  // };

  return router;
};
