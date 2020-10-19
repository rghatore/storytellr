//  client side helper functions

// appending form on clicking login
const loginForm = () => {
  let form = `<form action="/users/login" method="POST">
                <div class="test-form">
                  <label for="email">Enter your email: </label>
                  <input type="email" name="email" id="email" placeholder="email" required>
                </div>
                <div class="test-form">
                  <label for="password">Enter your password: </label>
                  <input type="password" name="password" id="password" placeholder="password" required>
                </div>
                <div class="test-form">
                  <button id ="submit-login" type="submit">Login</button>
                </div>
              </form>`;

  return form;
}
