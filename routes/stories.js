const express = require("express"); // move this into server eventually
// const { database } = require('pg/lib/defaults');

const router = express.Router(); // move this into server enentually and pass as an argument
const cookieSession = require("cookie-session");
const { branchFilterAndSort, populateKeywordArray } = require("../helpers");
const { promise } = require("bcrypt/promises");
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
    console.log("Search: ", req.query);
    database
      // .getAllStories({ user_name: null, search: null }) // original working code
      .getAllStories(req.query) // changed - should be fine
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

    story["user_id"] = req.session["user_id"];
    database.addStory(story).then((data) => {
      // console.log(data);
      res.send(data);
    });
  });

  // gets story + branch and keyword info by id
  router.get("/:storyId", (req, res) => {
    //the first function call returns the stories object from the stories relation
    console.log("cookie", req.session["user_id"]);
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
                    const storyInfo = {
                      storyTitle: story[0].title,
                      storyOwner: story[0].user_name,
                    };
                    database
                      .getBranchPointFromStoryPage(storyInfo)
                      .then((openBranchPointId) => {
                        story[0].open_branch_point = openBranchPointId.id;
                        story[0].cookie = req.session["user_id"] ? true : false;
                        res.send(story);
                      });
                  });
              });
          });
        }
      })
      .catch((error) => console.error(error.message));
  });

  router.post("/branches", (req, res) => {
    const branch = req.body;
    if (!req.session["user_id"]) {
      res.send({ error: "Please login to add branches." });
    } else {
      branch["user_id"] = req.session["user_id"];
      // console.log('branch: ', branch);
      // console.log(branch)
      database
        .getBranchPointFromStoryPage(branch)
        .then((data) => {
          branch.lastBranchPoint = data.id;
          console.log("branch: ", branch);
          database.addBranch(branch).then((data) => {
            database.getUsernameFromUserId(data.user_id).then((username) => {
              data.name = username.name;
              console.log("data being sent: ", data);
              res.send(data);
            });
          });
        })
        .catch((error) => console.log(error.message));
    }
  });

  router.get("/branches/:branch_point_id", (req, res) => {
    // console.log(req.params)
    database
      .getBranchesByBranchPointId(req.params.branch_point_id)
      .then((branches) => {
        console.log("branches by branch point id: ", branches);
        if (branches.length === 0) {
          res.send({ error: "No branches" });
        } else {
          database
            .getUserIdByStoryId(branches[0].story_id)
            .then((data) => {
              // console.log(data.id)
              // we can compare that user id to cookie id
              if (branches.length < 1) {
                res.send({ error: "empty library" });
              } else {
                for (const branch of branches) {
                  if (data.id === req.session.user_id) {
                    branch["owner"] = true;
                  } else {
                    branch["owner"] = false;
                  }
                }
                // console.log('first then; checking if user logged in is the owner of the story ', branches)
                return branches; // new
                // res.send(branches); // working
              }
            })
            //
            // })
            .then((branches) => {
              // console.log('receieved from first then: ', branches); // working until here
              const loggedInUser = req.session["user_id"];
              // console.log('branches inside final then: ', branches);
              let vote = { user_id: loggedInUser };
              // loop through branches array
              // --
              Promise.all(
                branches.map((branch) => {
                  vote["branchId"] = branch.id;
                  return database.checkVote(vote);
                })
              )
                .then((data) => {
                  for (const item in data) {
                    // console.log('item: ', item);
                    if (!data[item]) {
                      branches[item]["userVote"] = false;
                    } else if (!data[item].up) {
                      branches[item]["userVote"] = false;
                    } else {
                      branches[item]["userVote"] = true;
                      // // console.log(req.params)
                      // database
                      //   .getBranchesByBranchPointId(req.params.branch_point_id)
                      //   .then((branches) => {
                      //     database
                      //       .getUserIdByStoryId(branches[0].story_id)
                      //       .then((data) => {
                      //         // console.log(data.id)
                      //         // we can compare that user id to cookie id
                      //         if (branches.length < 1) {
                      //           res.send({ error: "empty library" });
                      //         } else {
                      //           for (const branch of branches) {
                      //             if (data.id === req.session.user_id) {
                      //               branch["owner"] = true;
                      //             } else {
                      //               branch["owner"] = false;
                      //             }
                    }
                    // console.log('first then; checking if user logged in is the owner of the story ', branches)
                    return branches; // new
                    // res.send(branches); // working
                  }
                })
                // another promise all to add vote count
                .then((branches) => {
                  Promise.all(
                    branches.map((branch) => {
                      // console.
                      // vote['branchId'] = branch.id;
                      return database.getVoteCountByBranchId(branch.id);
                    })
                  ).then((data) => {
                    // console.log('vote count data: ', data);
                    for (const item in data) {
                      branches[item]["vote_count"] = data[item].vote_count;
                    }
                    // console.log('final branches: ', branches);
                    res.send(branches);
                  });
                })
                .catch((error) => console.log(error));
            });
        }
      })
      .catch((error) => res.send(error.message));
  });
  //
  //         // })
  //         .then((branches) => {
  //           // console.log('receieved from first then: ', branches); // working until here
  //           const loggedInUser = req.session["user_id"];
  //           // console.log('branches inside final then: ', branches);
  //           let vote = { user_id: loggedInUser };
  //           // loop through branches array
  //           // --
  //           Promise.all(
  //             branches.map((branch) => {
  //               vote["branchId"] = branch.id;
  //               return database.checkVote(vote);
  //             })
  //           )
  //             .then((data) => {
  //               console.log("response data: ", data);
  //               console.log("branches :", branches);
  //               //  data can be empty array with length 0
  //               //  for loop wouldn't run
  //               //  we're getting an array [undefined]
  //               for (const item in data) {
  //                 console.log("item: ", item); //data.up at index 0 = branches.userVote at index 0
  //                 if (!data[item]) {
  //                   branches[item]["userVote"] = false;
  //                 } else if (!data[item].up) {
  //                   branches[item]["userVote"] = false;
  //                 } else {
  //                   branches[item]["userVote"] = true;
  //                 }
  //               }
  //               // res.send(branches);
  //               return branches;
  //             })
  //             // another promise all to add vote count
  //             .then((branches) => {
  //               Promise.all(
  //                 branches.map((branch) => {
  //                   // console.
  //                   // vote['branchId'] = branch.id;
  //                   return database.getVoteCountByBranchId(branch.id);
  //                 })
  //               ).then((data) => {
  //                 console.log("vote count data: ", data);
  //                 for (const item in data) {
  //                   branches[item]["vote_count"] = data[item].vote_count;
  //                 }
  //                 console.log("final branches: ", branches);
  //                 res.send(branches);
  //               });
  //             })
  //             .catch((error) => console.log(error));
  //         });
  //     })
  //     .catch((error) => res.send(error.message));
  // });

  router.put("/branches", (req, res) => {
    console.log(req.body);

    database
      .updateBranch(req.body.branchId)
      .then((data) => {
        console.log("approved: ", data);
        database
          .getStoryIdByBranchPointId(data.branch_point_id)
          .then((story_id) => {
            console.log("second then data: ", data);
            console.log("second then story_id: ", story_id);
            //  add a new branch point
            database.addBranchPoint(story_id.id).then(() => {
              data["story_id"] = story_id.id;
              res.send(data);
            });
          });
        // .updateBranch(req.body.branchId)
        // .then((data) => {
        //   console.log("approved", data);
      })
      .catch((error) => console.log(error));
  });

  router.post("/branches/votes", (req, res) => {
    const vote = req.body;
    if (!req.session["user_id"]) {
      res.send({ error: "Please login to vote." });
    } else {
      vote["user_id"] = req.session["user_id"];
      console.log(vote);
      database
        // checks if there is a vote by this user on this branch
        // .checkVote(vote)
        // .then((data) => {
        //   console.log("vote status: ", data);
        //   if (data) {
        //     // if there is a vote by this user on this branch it will...
        //     // ... change the vote status to null to "unvote" the branch
        //     if (data.up) {
        //       database.unvote(vote).then((data) => {
        //         console.log("unvote vote:", data);
        //         // res.send("remove")
        //       });
        //       // ... or change the null vote to true to "revote" the branch
        //     } else if (data.up === null) {
        //       database.revote(vote).then((data) => {
        //         console.log("up vote:", data);
        //         // res.send("add")
        //       });
        //     }
        //     // if the user has not voted on this branch it will add the vote to the database and change the vote status to true
        //   } else {
        //     database.addVote(vote).then((data) => {
        //       console.log("add vote:", data);
        //       // res.send("add")
        //     });
        // checks if there is a vote by this user on this branch
        .checkVote(vote)
        .then((data) => {
          // console.log('vote status: ', data);
          if (data) {
            // if there is a vote by this user on this branch it will...
            // ... change the vote status to null to "unvote" the branch
            if (data.up) {
              database.unvote(vote).then((data) => {
                // console.log('unvote vote:', data)
                // res.send("remove")
              });
              // ... or change the null vote to true to "revote" the branch
            } else if (data.up === null) {
              database.revote(vote).then((data) => {
                // console.log('up vote:', data)
                // res.send("add")
              });
            }
          } else {
            database.addVote(vote).then((data) => {
              // console.log('add vote:', data)
              // res.send("add")
            });
          }
        })
        .catch((error) => console.log(error));
    }
  });

  return router;
};
