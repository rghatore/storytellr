//  client side helper functions

// appending form on clicking login
const loginForm = (type) => {
  let form = `<form id="form-${type}" action="/users/${type}" method="POST">



                ${
                  type === "register"
                    ? `<div class="test-form">
                                <label for="name">Enter your name: </label>
                                <input type="text" name="name" id="name" placeholder="name" required>
                              </div>`
                    : ""
                }

                <div class="test-form">
                  <label for="email">Enter your email: </label>
                  <input type="email" name="email" id="email" placeholder="email" required>
                </div>
                <div class="test-form">
                  <label for="password">Enter your password: </label>
                  <input type="password" name="password" id="password" placeholder="password" required>
                </div>
                <div class="test-form">
                  <button id ="submit" type="submit">${type}</button>
                </div>
              </form>`;

  return form;
};

// stories box
const storyBox = (story) => {
  // console.log(story);
  let box = `<section id="${story.id}" class="content content_home card card_home">
            <div class="card_top">
              <p>${story.title}</p>
              <p>${story.name}</p>
              <p>Tags</p>
            </div>
            <div class="card_bottom">
              <p>${story.summary}</p>
            </div>
          </section>`;
  return box;
};

// new story box
const newStory = () => {
  const textBox = `<form class="newStory">
    <label for="newTitle">Title</label>
    <input type="newTitle" name="newTitle" id="newTitle" placeholder="Title" required>
    <label for="newSummary">Title</label>
    <input type="newSummary" name="newSummary" id="newSummary" placeholder="Summary" required>
    <label for="newContent">Your Story</label>
    <input type="newContent" name="newContent" id="newContent" placeholder="Once upon a time ..." required>
    <button id ="submit" type="submit">Publish</button>
  </form>`;
  return textBox;
};

const generateStoryPage = (storyObj) => {
  let storyPage = `
  <header class="header header_story">
    <h3>${storyObj.title}</h3>
  <section class="card card_story">
  <div class="card_top">
    <p>${storyObj.user_name}</p>
    <p>view count</p>
    <p>${storyObj.times_favourited}</p>
  </div>
  <div class="card_bottom">
    <p>${JSON.stringify(storyObj.keywords)}</p>
    <p>jump to latest branch</p>
  </div>
  </section>
  </header>
  <!-- Page-specific (main) content here -->
  <div class="content content_story">
    <section class="story">
      <div class="story_body">
        <p>${storyObj.content}
        </p>
      </div>
    </section>
  `;

  return storyPage;
};

const storyBranches = (storyObj) => {
  let storyBranches = "";
  for (let branch of storyObj.branches) {
    storyBranches += `
        <div class="branch_marker" id="${branch.branch_point_id}">
      <p>BRANCHED view all suggested branches</p>
    </div>

      <section class="story">
        <div class="story_body">
          <p>${branch.content}</p>
        </div>
      </section>
    `;
  }
  return storyBranches;
};

const writing_box = () => {
  return `
      <div class="writing_box">
        <form action="#">
          <textarea name="writing_box" id="writing_box" cols="30" rows="10">Write in me ...</textarea>
          <button>Submit</button>
        </form>
      </div>
      </div>
      `;
};

// homepage header
const headerHome = () => {
  const header = `<header id="top-header" class="header_home">
                    <form action="#"><label for="search">search</label><input type="text" name="search"></form>
                    <a href="#">filter</a>
                  </header>`;
  return header;
};

const generateBranchesPage = (branchObj) => {
  let branchesPage = `
  <section class="card card_branch">
  <p>Written by ${branchObj.name}</p>
  <div class="card_top">
    <p>Likes</p>
    <p>${branchObj.vote_count}</p>
  </div>
  </section>
  <main class="content content_branch">
    <p>${branchObj.content}</p>
  </main>
  ${branchObj.date_approved ? `<p>Chosen branch!</p>` : ""}
  `;
  return branchesPage;
};
