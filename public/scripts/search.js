$(document).ready(() => {

  // search feature
  $(document).on('submit', '#search', (event) => {

    event.preventDefault();
    // console.log($(event.target).serialize());
    const data = $(event.target).serialize();

    $.ajax({
      url: `stories/?${data}`,
      method: "GET"
    })
    .then((stories) => {
      $("#main").empty();
      $("#main").append(headerHome());
      $("#nav").removeClass("nav_story").addClass("nav_home");
      for (const story of stories) {
        $("#main").append(storyBox(story));
      }
    })
    .catch((error) => console.log(error.message));

  })

});
