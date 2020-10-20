// accessing login form from the client side

$(document).ready(() => {
  // testing show a login page
  $(".sidebar_content").append(loginForm('login'));

  // show login form
  $('nav #login').click((event) => {

    $('#top-header .error').remove();

    if($('nav #login').html() === 'logout') {
      // logout functionality
      alert('logout!');
    } else {
      $("#sidebar").addClass("active");
      $(".overlay").addClass("active");
      event.stopPropagation();
    }
  })

  // handling hiding the sidebar
  $(".wrapper").on("click", function () {
    // $('nav .nav-options #form-login').remove();
    $("#sidebar").removeClass("active");
    $(".overlay").removeClass("active");

  });

  $(document).on('submit', 'nav .nav-options #form-login', (event) => {
    // alert("it's working!");
    event.preventDefault();
    // show login button and change to logout

    $('nav .nav-options #form-login').remove();

    console.log($(event.target).serialize());
    $.ajax({
      url: "users/login",
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
