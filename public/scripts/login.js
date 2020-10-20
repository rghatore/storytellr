// accessing login form from the client side

$(document).ready(() => {
  // add content to the sidebar
  $(".sidebar_content").append(loginForm());

  // handling clicks on the user icon
  $("#login").on("click", function (event) {
    $("#sidebar").addClass("active");
    $(".overlay").addClass("active");
    event.stopPropagation();
  });

  // handling hiding the sidebar
  $(".wrapper").on("click", function () {
    $("#sidebar").removeClass("active");
    $(".overlay").removeClass("active");
  });

  $(document).on("submit", ".nav-options form", (event) => {
    // alert("it's working!");
    event.preventDefault();
    // show login button and change to logout

    $("nav .nav-options form").hide();

    console.log($(event.target).serialize());
    $.ajax({
      url: "users/login",
      method: "POST",
      data: $(event.target).serialize(),
    }).then((user) => {
      console.log(user);
      $("#login").fadeIn();
      $("#login").html("logout");

      $("#profile").html(user.name);
      $("#profile").fadeIn();
    });
  });

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
