// accessing login form from the client side

$(document).ready(() => {
  $(document).on("click", "#register", () => {
    if ($("#form-register").html()) {
      $("#form-register").remove();
    } else {
      $(".sidebar_content").append(boostrapLoginForm("register"));
    }
  });

  $(document).on("submit", ".sidebar_content #form-register", (event) => {
    // alert("it's working!");
    event.preventDefault();
    // show login button and change to logout

    $("nav .nav-options #form-register").remove();

    // console.log($(event.target).serialize());
    $.ajax({
      url: "users/register",
      method: "POST",
      data: $(event.target).serialize(),
    }).then((user) => {
      if (user.error) {
        // console.log(user.error);
        $("#message").html(user.error);
      } else {
        $(".sidebar_content").empty();
        $(".sidebar_content").append(`<span id="user">${user.name}</span>`);
        $(".sidebar_content").append(
          `<button type="button" id="logout">Logout</button>`
        );
      }
    });
  });
});
