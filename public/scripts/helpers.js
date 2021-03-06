//  client side helper functions

// appending form on clicking login
// const loginForm = (type) => {
//   let form = `<form id="form-${type}" action="/users/${type}" method="POST">

//                 ${
//                   type === "register"
//                     ? `<div class="test-form">
//                                 <label for="name">Enter your name: </label>
//                                 <input type="text" name="name" id="name" placeholder="name" required>
//                               </div>`
//                     : ""
//                 }

//                 <div class="test-form">
//                   <label for="email">Enter your email: </label>
//                   <input type="email" name="email" id="email" placeholder="email" required>
//                 </div>
//                 <div class="test-form">
//                   <label for="password">Enter your password: </label>
//                   <input type="password" name="password" id="password" placeholder="password" required>
//                 </div>
//                 <div class="test-form">
//                   <button id ="submit" type="submit">${type}</button>
//                 </div>
//               </form>`;

//   return form;
// };

const bootstrapLoginForm = (type) => {
  let form = `
  <div class="form_wrapper">
  <form id="form-${type}" action="/users/${type}" method="POST">
    <div class="form-group test-form">
      <input type="name" class="form-control name input_field" id="name" name="name" placeholder="name">
    </div>
    <div class="form-group test-form">
      <input type="email" class="form-control email input_field" id="email" name="email" aria-describedby="emailHelp" placeholder="email">
    </div>
    <div class="form-group test-form">
      <input type="password" class="form-control password input_field" id="password" name="password" placeholder="password">
    </div>
    <button id='submit' type="submit" class="btn btn-primary btn-${type}">${type}</button>
    <div class="login_form_messages">
      <p class="display_sign_up_form">No account yet?</p>
      <p class="error_message"></p>
    </div>
</form>
</div>
  `;

  return form;
};

const bootstrapUserMenu = (user) => {
  let userMenu = `
  <div class="sidebar_user_menu">
  <div class="list-group">
    <a href="#" class="list-group-item list-group-item-action user_menu_name">
      ${user.name}
    </a>
    </div>
    <div class="list-group">
    <a href="#" class="list-group-item list-group-item-action list_item_first list_item_branch ">

      Dapibus ac facilisis in
    </a>
    <a href="#" class="list-group-item list-group-item-action">
      Morbi leo risus
    </a>

    <a href="#" class="list-group-item list-group-item-action list_item_branch">
      Porta ac consectetur ac
    </a>
    <a href="#" class="list-group-item list-group-item-action">
      Vestibulum at eros
    </a>
    <a href="#" class="list-group-item list-group-item-action list_item_branch">
      Vestibulum at eros
    </a>
    </div>
    <button type="button" class="btn-logout" id="logout">Logout</button>
  </div>

  </div>
  `;

  return userMenu;
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
    <div class = "story_title">
      <h3 id="story_title">${storyObj.title}</h3>
      <i id="toggle_story_info" class="fas fa-angle-double-down"></i>
    </div>
    <div class="story_wrapper">
      <section class="card card_story">
        <div class="card_top_story">
          <p id="story_username">${storyObj.user_name}</p>
          <p>view count</p>
          <p>${storyObj.times_favourited}</p>
        </div>
        <div class="card_bottom_story">
          <p>${JSON.stringify(storyObj.keywords)}</p>
          <p class='col_branch'>jump to latest branch</p>
        </div>
      </section>
    </div>

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
        <div class="branch_marker col_branch" id="${branch.branch_point_id}">
          <p class="branch_marker_super">BRANCHED</p>
          <p class="branch_marker_sub"> view all suggested branches</p>
         </div>



      <section class="story story_branch">
        <div class="story_body">
          <p>${branch.content}</p>
        </div>
                 <div class="branch_info">
         <p class="branch_info_txt">${branch.name}</p>
         </div>
      </section>
    `;
  }
  return storyBranches;
};

const writing_box = (storyObj) => {
  let writingBoxString = `

    <div id="writing_form_div" class="writing_box">
      <p class="toggle_textarea">And then . . . </p>
      <form id="writing_form">

        <div class="branch_marker col_branch" id="${storyObj.open_branch_point}">
          <p class="branch_marker_sub"> view all suggested branches</p>
         </div>

      `;

  if (storyObj.cookie) {
    writingBoxString += `
                <div class="textarea_div">
          <textarea name="content" id="writing_box" cols="30" rows="10" placeholder="Write in me ..."></textarea>
          <div id="story_submit" class="submit_div">
            <p class="btn_submit">Submit</p>
            <i class="fas fa-angle-double-right"></i>
        </div>
      </div>
      `;
  } else {
    writingBoxString += `
      <a class="btn btn-primary" id="not_signed_in">Sign in to write what comes next!</a>
      `;
  }

  writingBoxString += `
        </form>
  </div>
  `;

  return writingBoxString;
};

// homepage header
const headerHome = () => {
  const header = `<header id="top-header" class="header_home">
                    <form id="search">
                    <div class="form-group test-form div_search">
                      <input type="search" name="search" class="form-control">
                      <button class="btn btn-primary btn-search">Search</button>
                      </div>
                    </form>
                    </header>`;
  return header;
  // <a href="#">filter</a> // add above form tag if adding filter feature
};

const generateBranchesPage = (branchObj) => {
  let branchesPage = `

  <div id="${branchObj.id}" class="card card_branch text-center">
  <div class="card-header">
    ${branchObj.date_approved ? `<p class="chosen">Chosen branch!</p>` : ""}
  </div>
  <div ${
    branchObj.date_approved ? 'id="branch_approved"' : ""
  } class="card-body">
    <h5 class="card-title">By ${branchObj.name}</h5>
    <p class="card-text content content_branch">${branchObj.content}</p>
     ${
       branchObj.owner && !branchObj.date_approved
         ? `<a href="#" class="btn btn-primary btn-approve">Approve</a>`
         : ""
     }
  </div>
  <div class="card-footer text-muted">
      <span>
        <p>Likes: </p>
        <p class="likes">${branchObj.vote_count}</p>
      </span>
      <button class="vote btn-vote btn-${
        branchObj.userVote ? "true" : "false"
      }">
      ${branchObj.userVote ? "Unlike" : "Like"}!
      </button>
        </div>
</div>

  `;

  return branchesPage;
};
