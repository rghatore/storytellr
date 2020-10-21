// accessing login form from the client side

$(document).ready(() => {
  // add content to the sidebar
    // $(".sidebar_content").append(loginForm('login'));

  // handling clicks on the user icon

  $('nav #login').click((event) => {
  // should be an ajax request to check for cookies
  // currently new register button gets appended on every click


      $("#sidebar").addClass("active");
      $(".overlay").addClass("active");
      // $(".sidebar_content").append(`<button type="button" id="register">Register</button>`);

      event.stopPropagation();
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

    // console.log($(event.target).serialize());
    $.ajax({
      url: "users/login",
      method: "POST",
      data: $(event.target).serialize()
    })
    .then(user => {
      // console.log(user);
      if (user.error) {
        // console.log(user.error);
        $("#message").html(user.error);
      } else {
        $(".sidebar_content").empty();
        $(".sidebar_content").append(`<span id="user">${user.name}</span>`);
        $(".sidebar_content").append(`<button type="button" id="logout">Logout</button>`);
      }

    })

  })

  $(document).on('click', '#logout', () => {
    //  ajax request to POST users/logout
    // console.log(req.session['user_id']);
    $(".sidebar_content").empty();
    $(".sidebar_content").append('<span id="message"></span>');
    $(".sidebar_content").append(loginForm('login'));
    $(".sidebar_content").append(`<button type="button" id="register">Register</button>`);

    // $("#sidebar").removeClass("active");
    // $(".overlay").removeClass("active");

    // $(".sidebar_content").append(loginForm('login'));


    $.ajax({
      url: "users/logout",
      method: "POST"
    })
    .then((message) => {
      // console.log(req.session['user_id']);
      // console.log(message);
      $('#message').append(message);
      // $.ajax({
      //   url: "/",
      //   method: "GET"
      // })
      $.ajax({
        url: "/stories",
        method: "GET",
        // data
      }).then((stories) => {
        // console.log($('#top-header'));
        // if(!$('#top-header')) {
          $('#main').empty();
          $('#main').append(headerHome());
        // } else {
          // $('#main .content').empty();
        // }

        for (const story of stories) {
          $("#main").append(storyBox(story));
        }
      })
    })
  })

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
