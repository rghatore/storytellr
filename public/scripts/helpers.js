//  client side helper functions

// appending form on clicking login
const loginForm = (type) => {
  let form = `<form id="form-${type}" action="/users/${type}" method="POST">

                ${type === 'registration' ?
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
                  <button id ="submit" type="submit">Login</button>
                </div>
              </form>`;

  return form;
}

