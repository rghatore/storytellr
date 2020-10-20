//  client side helper functions

// appending form on clicking login
const loginForm = (type) => {
  let form = `<form id="form-${type}" action="/users/${type}" method="POST">

                ${type === 'register' ?
                              `<div class="test-form">
                                <label for="name">Enter your name: </label>
                                <input type="text" name="name" id="name" placeholder="name" required>
                              </div>` : ''}

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
}

// stories box
const storyBox = (story) => {
let box = `<section class="content content_home card card_home">
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
}

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
}

