// accessing login form from the client side

$(document).ready(() => {
  // testing show a login page

  // $("#login-form").hide();
  // // on clicking login button
  // $("#login").click(() => {
  //   $("#login").hide();
  //   $("#profile").hide();
  //   $("nav .nav-options").append(loginForm());
  //   $("nav .nav-options form").hide();
  //   $("nav .nav-options form").slideDown();
  //   // $('#top-header').append(loginForm()).hide();
  //   // $('#top-header').slideDown();
  // });
  $(".sidebar_content").append(loginForm());

  $("#login").on("click", function (event) {
    $("#sidebar").addClass("active");
    event.stopPropagation();
  });

  $(".wrapper").on("click", function () {
    $("#sidebar").removeClass("active");
  });

  // $(document).on("click", ".passive", (event) => {
  //   if ($(".wrapper").hasClass("passive")) {
  //     console.log("Passive!");
  //   }
  // });

  $(document).on("submit", "nav .nav-options form", (event) => {
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
      // console.log(user.user);
      // console.log(user.name);
      $("#login").fadeIn();
      $("#login").html("logout");

      $("#profile").html(user.name);
      $("#profile").fadeIn();
    });
  });

  // $('#submit-login').click((event) => {
  // event.preventDefault(); // this does not seem to work!
  // $.ajax({
  // });
  // });
});
