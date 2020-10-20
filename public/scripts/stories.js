$(document).ready(() => {
  $.ajax({
    url: "/stories",
    method: "GET",
    // data
  }).then((stories) => {
    console.log(stories);
    // target is .container .content

    for (const story of stories) {
      $(".container").append(`
    <section id="${story.id}" class="content content_home card card_home">
    <div class="card_top">
      <p>${story.title}</p>
      <p>${story.name}</p>
      <p>Tags</p>
    </div>
    <div class="card_bottom">
      <p>${story.summary}</p>
    </div>
  </section>
  `);
    }

    //listens for click on the story card and finds the story id
    $(".card_home").on("click", (e) => {
      let thisCardId = $(e.target).closest(".card_home")[0].id;
      //console.log("This card id", thisCardId);
      $.ajax({
        url: `/stories/${thisCardId}`,
        method: "GET",
        //data
      }).then((response) => {
        const storyObj = response[0];
        // generateStoryPage is in scripts/helpers
        const storyPage = generateStoryPage(storyObj);
        $(".container").empty();
        $("#nav").removeClass("nav_home").addClass("nav_story");
        $(".container").append(storyPage);
      });
    });
  });
});
