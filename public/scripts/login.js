// accessing login form from the client side

$(document).ready(() => {
  // testing show a login page

  $('#login-form').hide();
  // on clicking login button
  $('#login').click(() => {
    $('#login').hide();
    $('nav .nav-options').append(loginForm());
    $('nav .nav-options form').hide();
    $('nav .nav-options form').slideDown();
    // $('#top-header').append(loginForm()).hide();
    // $('#top-header').slideDown();
  })

  $(document).on('submit', 'nav .nav-options form', (event) => {
    // alert("it's working!");
    event.preventDefault();
  })

  // $('#submit-login').click((event) => {
    // event.preventDefault(); // this does not seem to work!
    // console.log(event);
    // $.ajax({
    //   url: 'users/login',
    //   method: "POST",
    //   data: $(event)
    // });
  // });

});
