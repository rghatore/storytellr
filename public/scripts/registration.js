// accessing login form from the client side

$(document).ready(() => {
  // testing show a login page
  // show registration form

  // $('nav #profile').click(() => {

    // $('#top-header .error').remove();

    // if($('nav #profile').html() !== 'register') {
    //   // logout functionality
    //   // alert('profile page!');
    //   $.ajax({
    //     url: 'users/profile',
    //     method: "GET"
    //   }).then((data) => {
    //     console.log(data);
    //     $('.container').empty();
    //     $('.container').append(`<p>${data}</p>`)
    //   })

  //     // $('nav .nav-options').append(loginForm('register'));

  //   } else {

  //   }

  // })

  $(document).on('click', '#register', () => {
    if($('#form-register').html()) {
      $("#form-register").remove();
    } else {
      $(".sidebar_content").append(loginForm('register'));
    }
  })

  $(document).on('submit', '.sidebar_content #form-register', (event) => {
    // alert("it's working!");
    event.preventDefault();
    // show login button and change to logout

    $('nav .nav-options #form-register').remove();

    console.log($(event.target).serialize());
    $.ajax({
      url: 'users/register',
      method: "POST",
      data: $(event.target).serialize()
    })
    .then(user => {

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
      // console.log(user);
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
