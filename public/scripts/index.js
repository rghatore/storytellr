//

$(document).ready(() => {

  // loads home page from storytellr logo
  $('#storytellr_logo').click(() => {
    $.ajax({
      url: "/stories",
      method: "GET",
    }).then((stories) => {
      $('#main').empty();
      $('#main').append(headerHome());
      for (const story of stories) {
        $("#main").append(storyBox(story));
      }
    })
  });

});
