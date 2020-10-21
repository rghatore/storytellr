const express = require("express");
const router  = express.Router();
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ["this is a very good key thank you", "nfjklasdfiasjudpfnonfniju2o3r94ruj123mn45rji42bn580423jnro"]
}));


module.exports = (database) => {
  router.get("/", (req, res) => {
    database
      .getBranchesByBranchPointId(branch_id)
      .then((branches) => {
        if (!branches) {
          res.send({ error: "empty library" });
        } else {
          res.send(branches);
        }
      })
      .catch((error) => res.send(error.message));
  });



return router;
};
