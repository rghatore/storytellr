// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js"); // getting data from .env file and passing to Pool
const db = new Pool(dbParams); // in our exammples we gave it the name pool
db.connect(); // this is basically to check if there are any errors

const getUserFromEmail = (email) => {
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1;
  `;

  const queryParams = [email];

  return db
    .query(queryString, queryParams)
    .then((response) => response.rows[0]);
};
exports.getUserFromEmail = getUserFromEmail;

// add registration data to the database
const addUser = (user) => {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `;

  const queryParams = [user.name, user.email, user.password];

  return db
    .query(queryString, queryParams)
    .then((response) => response.rows[0]);
};
exports.addUser = addUser;

// add new story to the database
const addStory = (story) => {
  const queryString = `
  INSERT INTO stories (user_id, title, summary, content)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `;

  const queryParams = [
    story.user_id,
    story.newTitle,
    story.newSummary,
    story.newContent,
  ];

  return db
    .query(queryString, queryParams)
    // .then((response) => response.rows[0]);
    // adding branch point
    .then((response) => {
      const storyData = response.rows[0];
      // storyData['testKey'] = 'testValue';
      // console.log(storyData);
      const queryString = `
      INSERT INTO branch_points (story_id, title)
      VALUES ($1, $2)
      RETURNING *
      `;

      const queryParams = [storyData.id, storyData.title];

      return db.query(queryString, queryParams)
      .then((response) => {
        const branchPointData = response.rows[0];
        // console.log('storyData: ', storyData);
        // console.log('branch_point_data: ', branchPointData);
        return storyData;
      })

    })
};
exports.addStory = addStory;

const addBranch = (branch) => {

  const queryString = `
  INSERT INTO branches (user_id, branch_point_id, content)
  VALUES ($1, $2, $3)
  RETURNING *
  `;

  const queryParams = [
    branch.user_id,
    branch.lastBranchPoint,
    branch.content
  ];

  return db
    .query(queryString, queryParams)
    .then(response => response.rows[0]);
};
exports.addBranch = addBranch;

// get open branch point from story page title and username
const getBranchPointFromStoryPage = (branch) => {

  const queryString = `
  SELECT branch_points.id
  FROM branch_points
  JOIN stories ON story_id = stories.id
  JOIN users ON user_id = users.id
  WHERE stories.title = $1
  AND users.name = $2
  ORDER BY branch_points.id DESC
  LIMIT 1;
  `;

  const queryParams =[branch.storyTitle, branch.storyOwner];

  return db
  .query(queryString, queryParams)
  .then((response) => response.rows[0]);
}
exports.getBranchPointFromStoryPage = getBranchPointFromStoryPage;


const getUsernameFromUserId = (user_id) => {
  const queryString = `
  SELECT name
  FROM users
  WHERE id = $1
  `;
  const queryParams = [user_id];
  return db
    .query(queryString, queryParams)
    .then((response) => response.rows[0]);
};
exports.getUsernameFromUserId = getUsernameFromUserId;

const getUserIdByStoryId = (storyId) => {
  let queryString = `
  SELECT users.id
  FROM stories
  JOIN users on users.id = stories.user_id
  WHERE stories.id = $1;
  `;

  return db
    .query(queryString, [storyId])
    .then((response) => {
      return response.rows[0];
    })
    .catch((err) => console.error(err));
};

exports.getUserIdByStoryId = getUserIdByStoryId;

const getAllStories = (options) => {
  const queryParams = [];
  // basic getting all stories + authors/users
  let queryString = `
  SELECT stories.*, users.name
  FROM stories
  JOIN users ON users.id = user_id
  `;

  // for a specific author/user
  // if (options.user_name) {
  //   queryParams.push(`%${options.user_name}%`);
  //   queryString += `WHERE users.name LIKE $${queryParams.length}`;
  // }
  // // searching for a word in the title or author name
  // if (options.search) {
  //   queryParams.push(`%${options.search}%`);
  //   if (queryString.search("WHERE") === -1) {
  //     queryString += `WHERE stories.title LIKE $${queryParams.length}
  //     OR users.name LIKE $${queryParams.length}`;
  //   } else {
  //     queryString += `AND stories.title LIKE $${queryParams.length}
  //     OR users.name LIKE $${queryParams.length}`;
  //   }
  // }

  // using lower case for comparisons
  if (options.user_name) {
    queryParams.push(`%${options.user_name.toLowerCase()}%`);
    queryString += `WHERE LOWER(users.name) LIKE $${queryParams.length}`;
  }
  // searching for a word in the title or author name
  if (options.search) {
    queryParams.push(`%${options.search.toLowerCase()}%`);
    if (queryString.search("WHERE") === -1) {
      queryString += `WHERE LOWER(stories.title) LIKE $${queryParams.length}
      OR LOWER(users.name) LIKE $${queryParams.length}`;
    } else {
      queryString += `AND LOWER(stories.title) LIKE $${queryParams.length}
      OR LOWER(users.name) LIKE $${queryParams.length}`;
    }
  }

  queryString += `
  LIMIT 10;
  `;

  return db.query(queryString, queryParams).then((response) => response.rows);
};

exports.getAllStories = getAllStories;

const getStoryById = (id) => {
  let queryString = `
  SELECT stories.*, users.name AS user_name
  FROM stories
  JOIN users on users.id = stories.user_id
  WHERE stories.id = $1;
  `;

  return db
    .query(queryString, [id])
    .then((response) => {
      return response.rows;
    })
    .catch((err) => console.error(err));
};

exports.getStoryById = getStoryById;

const getFaveCountByStoryId = (id) => {
  let queryString = `
  SELECT COUNT(*) AS times_favourited FROM favourite_stories
  WHERE story_id = $1;
  `;

  return db
    .query(queryString, [id])
    .then((response) => {
      return response.rows;
    })
    .catch((err) => console.error(err));
};

exports.getFaveCountByStoryId = getFaveCountByStoryId;

const getKeywordsByStoryId = (id) => {
  let queryString = `
  SELECT keyword AS keywords
  FROM keywords
  JOIN story_keywords ON keywords.id = story_keywords.keyword_id
  WHERE story_keywords.story_id = $1;
  `;
  return db
    .query(queryString, [id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.error(err));
};

exports.getKeywordsByStoryId = getKeywordsByStoryId;

const getBranchesByBranchPointId = (id) => {
  let queryString = `
  SELECT branches.*, users.name, branch_points.story_id
  FROM branches
  JOIN users ON users.id = user_id
  JOIN branch_points ON branch_point_id = branch_points.id
  WHERE branch_point_id = $1
  `;
  // GROUP BY branches.id, users.name, branch_points.id;
  // SELECT branches.*, users.name, branch_points.*, COUNT(votes.up) AS vote_count

  return db
    .query(queryString, [id])
    .then(res => res.rows)
    .catch(err => console.error(err));
};

exports.getBranchesByBranchPointId = getBranchesByBranchPointId;

const getBranchesByStoryId = (id) => {
  let queryString = `
  SELECT branches.*
  FROM branches
  JOIN branch_points ON branches.branch_point_id = branch_points.id
  JOIN stories ON branch_points.story_id = stories.id
  WHERE stories.id = $1;
  `;
  return db
    .query(queryString, [id])
    .then((res) => res.rows)
    .catch((err) => console.error(err));
};

exports.getBranchesByStoryId = getBranchesByStoryId;

const updateBranch = (id) => {
  let queryString = `
  UPDATE branches
  SET date_approved = NOW()
  WHERE id = $1
  RETURNING *;
  `;

  return db
    .query(queryString, [id])
    .then(res => res.rows[0])
}
exports.updateBranch = updateBranch;

const addVote = (vote) => {
  let queryString = `
  INSERT INTO votes (user_id, branch_id, up)
  VALUES ($1, $2, true)
  RETURNING *;
  `;

  let queryParams =[vote.user_id, vote.branchId]

  return db
    .query(queryString, queryParams)
    .then(res => res.rows[0])
}
exports.addVote = addVote;


const checkVote = (vote) => {
  let queryString = `
  SELECT up
  FROM votes
  WHERE user_id = $1
  AND branch_id = $2;
  `;

  let queryParams =[vote.user_id, vote.branchId];

  return db
    .query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(error => console.log(error));
}
exports.checkVote = checkVote;

const unvote = (vote) => {
  let queryString = `
  UPDATE votes
  SET up = null
  WHERE user_id = $1
  AND branch_id = $2
  RETURNING *;
  `;

  let queryParams =[vote.user_id, vote.branchId];

  return db
    .query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(error => console.log(error));

}
exports.unvote = unvote;

const revote = (vote) => {
  let queryString = `
  UPDATE votes
  SET up = true
  WHERE user_id = $1
  AND branch_id = $2
  RETURNING *;
  `;

  let queryParams =[vote.user_id, vote.branchId];

  return db
    .query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(error => console.log(error));

}
exports.revote = revote;
