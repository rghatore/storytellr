//  client side helper functions

// appending form on clicking login
const loginForm = (type) => {
  let form = `<form id="form-${type}" action="/users/${type}" method="POST">



                ${type === 'register' ?
                              `<div class="test-form">
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
  <main class="content content_story">
    <section class="story">
      <div class="story_body">
        <p>${storyObj.content}
        </p>
      </div>
    </section>

    <div class="branch_marker">
      <p>BRANCHED view all suggested branches</p>
    </div>

      <section class="story">
        <div class="story_body">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nihil a commodi eum adipisci fugiat impedit
            dolor tempora quam voluptatibus numquam, nesciunt consectetur molestiae perspiciatis provident accusamus sapiente
            nemo amet.</p>
        </div>
      </section>

      <div class="writing_box">
        <form action="#">
          <textarea name="writing_box" id="writing_box" cols="30" rows="10">Write in me ...</textarea>
          <button>Submit</button>
        </form>
      </div>
  </main>
  `;

  return storyPage;
};

