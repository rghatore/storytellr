// accessing login form from the client side

$(document).ready(() => {
  // testing show a login page

  // show login form
  $('nav #login').click(() => {

    if($('nav #login').html() === 'logout') {
      // logout functionality
      alert('logout!');
    } else {
      $('nav #login').hide();
      $('nav #profile').hide();
      $('nav .nav-options').append(loginForm('login'));
      $('nav .nav-options form').hide();
      $('nav .nav-options form').slideDown();
    }
    // $('#top-header').append(loginForm()).hide();
    // $('#top-header').slideDown();
  })

  $(document).on('submit', 'nav .nav-options #form-login', (event) => {
    // alert("it's working!");
    event.preventDefault();
    // show login button and change to logout

    $('nav .nav-options form').hide();

    console.log($(event.target).serialize());
    $.ajax({
      url: 'users/login',
      method: "POST",
      data: $(event.target).serialize()
    })
    .then(user => {
      // console.log(user);
      if (user.error) {
        // console.log(error);
        $('#top-header').prepend(`<span></span>`);
        $('#top-header span').addClass('error').hide();
        $('#top-header .error').prepend(`${user.error}`);
        $('#top-header .error').slideDown();
      } else {
        $('nav #login').html('logout');
        $('nav #profile').html(user.name);
      }
      $('nav #login').fadeIn();
      $('nav #profile').fadeIn();
      // console.log(user.user);
      // console.log(user.name);

    })

  })

  // $('#submit-login').click((event) => {
    // event.preventDefault(); // this does not seem to work!
    // $.ajax({
    // });
  // });

});
