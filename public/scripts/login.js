// accessing login form from the client side

$(document).ready(() => {
  // add content to the sidebar
  // $(".sidebar_content").append(loginForm('login'));

  // handling clicks on the user icon

  $("nav #login").click((event) => {
    // should be an ajax request to check for cookies
    // currently new register button gets appended on every click

    $("#sidebar").addClass("active");
    $(".overlay").addClass("active");
    // $(".sidebar_content").append(`<button type="button" id="register">Register</button>`);

    event.stopPropagation();
  });

  // handling hiding the sidebar
  $(".wrapper").on("click", function () {
    // $('nav .nav-options #form-login').remove();
    $("#sidebar").removeClass("active");
    $(".overlay").removeClass("active");
  });

  $(document).on("click", ".display_sign_up_form", () => {
    $(".sidebar_content").empty().append(bootstrapLoginForm("register"));
    $("#name").slideToggle("slow");
    $("form p").empty().text("Already have an account?");
    $("form p")
      .removeClass("display_sign_up_form")
      .addClass("display_login_form");
  });
  $(document).on("click", ".display_login_form", () => {
    $("#name").slideToggle("slow");
    $(".sidebar_content").empty().append(bootstrapLoginForm("login"));
    $("form p").empty().text("No account yet?");
    $("form p")
      .removeClass("display_login_form")
      .addClass("display_sign_up_form");
  });

  // $("#sign_up_form").on("click", function () {
  //   console.log("click");
  // });

  $(document).on("submit", ".sidebar_content #form-login", (event) => {
    // alert("it's working!");
    event.preventDefault();
    // show login button and change to logout

    // $('nav .nav-options #form-login').remove();

    // console.log($(event.target).serialize());
    $.ajax({
      url: "users/login",
      method: "POST",
      data: $(event.target).serialize(),
    }).then((user) => {
      console.log(user);
      if (user.error) {
        // console.log(user.error);
        $(".error_message").text(user.error);
      } else {
        $(".sidebar_content").empty();
        $(".sidebar_content").append(bootstrapUserMenu(user));
      }
    });
  });

  $(document).on("click", "#logout", () => {
    //  ajax request to POST users/logout
    // console.log(req.session['user_id']);
    $(".sidebar_content").empty();
    $(".sidebar_content").append(bootstrapLoginForm("login"));

    // $("#sidebar").removeClass("active");
    // $(".overlay").removeClass("active");

    // $(".sidebar_content").append(loginForm('login'));

    $.ajax({
      url: "users/logout",
      method: "POST",
    }).then((message) => {
      $("#message").append(message);
      $.ajax({
        url: "/stories",
        method: "GET",
      }).then((stories) => {
        $("#main").empty();
        $("#main").append(headerHome());
        for (const story of stories) {
          $("#main").append(storyBox(story));
        }
      });
    });
  });
});
