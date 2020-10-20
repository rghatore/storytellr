// accessing login form from the client side

$(document).ready(() => {
  // add content to the sidebar
    // $(".sidebar_content").append(loginForm('login'));

  // handling clicks on the user icon

  $('nav #login').click((event) => {

    $('#top-header .error').remove();

    if($('nav #login').html() === 'logout') {
      // logout functionality
      alert('logout!');
    } else {
      $("#sidebar").addClass("active");
      $(".overlay").addClass("active");
      $(".sidebar_content").append(`<button type="button" id="register">Register</button>`);

      event.stopPropagation();
    }
  })

  // handling hiding the sidebar
  $(".wrapper").on("click", function () {
    // $('nav .nav-options #form-login').remove();
    $("#sidebar").removeClass("active");
    $(".overlay").removeClass("active");

  });

  $(document).on('submit', '.sidebar_content #form-login', (event) => {
    // alert("it's working!");
    event.preventDefault();
    // show login button and change to logout

    // $('nav .nav-options #form-login').remove();

    console.log($(event.target).serialize());
    $.ajax({
      url: "users/login",
      method: "POST",
      data: $(event.target).serialize()
    })
    .then(user => {
      // console.log(user);
      if (user.error) {
        console.log(user.error);
      } else {
        $(".sidebar_content form").remove();
        $(".sidebar_content").append(`<span id="user">${user.name}</span>`);
        $(".sidebar_content").append(`<button type="button" id="logout">Logout</button>`);
      }

    })

  })

  $(document).on('click', '#logout', () => {
    //  ajax request to POST users/logout
    // console.log(req.session['user_id']);
    $(".sidebar_content").remove();
    // $("#sidebar").removeClass("active");
    // $(".overlay").removeClass("active");
    // $(".sidebar_content").append(loginForm('login'));

    // $(".sidebar_content").append(loginForm('login'));


    $.ajax({
      url: "users/logout",
      method: "POST"
    })
    .then((message) => {
      // console.log(req.session['user_id']);
      console.log(message);
      $('#top-header').append(message);
      $.ajax({
        url: "/",
        method: "GET"
      })
    })
  })

  // $('#submit-login').click((event) => {
    // event.preventDefault(); // this does not seem to work!
    // $.ajax({
    // });
  // });


  //handles the disappear / reappear of the nav
  let lastScrollTop = 0;

  $(window).scroll(function () {
    let st = $(this).scrollTop();
    if (st < lastScrollTop) {
      $(".nav ").css("transform", "translateY(0vh)");
    } else {
      $(".nav").css("transform", "translateY(-30vh)");
    }
    lastScrollTop = st;
  });
});
