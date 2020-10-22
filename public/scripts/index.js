$(document).ready(() => {
  // loads home page from storytellr logo
  $("#storytellr_logo").click(() => {
    $.ajax({
      url: "/stories",
      method: "GET",
    }).then((stories) => {
      $("#main").empty();
      $("#main").append(headerHome());
      console.log(headerHome());
      $("#nav").removeClass("nav_story nav_branch").addClass("nav_home");
      for (const story of stories) {
        $("#main").append(storyBox(story));
      }
    });
  });

  // appends the login form to the sidebar
  $(".sidebar_content").append(bootstrapLoginForm("login"));

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
