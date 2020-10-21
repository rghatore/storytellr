$(document).ready(() => {
  $.ajax({
    url: "/stories",
    method: "GET",
    // data
  }).then((stories) => {
    // console.log(stories);
    // target is .container .content

    for (const story of stories) {
      $("#main").append(storyBox(story));
    }
  });

  //listens for click on the story card and finds the story id
  // $(".card_home").on("click", (e) => {
  $(document).on("click", ".card_home", (e) => {
    let thisCardId = $(e.target).closest(".card_home")[0].id;
    console.log("This card id", thisCardId);
    $.ajax({
      url: `/stories/${thisCardId}`,
      method: "GET",
      //data
    }).then((response) => {
      const storyObj = response[0];
      // generateStoryPage is in scripts/helpers
      let storyPage = generateStoryPage(storyObj);
      storyPage += storyBranches(storyObj);
      storyPage += writing_box();
      $("#nav").removeClass("nav_home").addClass("nav_story");
      $("#main").empty();
      $("#main").append(storyPage);
    });
  });
  // });
});
