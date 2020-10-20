$(document).ready(() => {
  //  profile page request
  $(document).on('click', '#user', () => {

    // username instead of user id
    const username = $('#user').html();

    $.ajax({
      url: `users/${username}`,
      method: "GET"
    })
    .then((data) => {
      $("#sidebar").removeClass("active");
      $(".overlay").removeClass("active");
      $(".container").empty()
      for (const story of data){
        $('.container').append(storyBox(story));
      }
      $(".container").append(newStory());
    })
  })

// submit request for publishing new story
$(document).on('submit', '.container .newStory', (event) => {
  event.preventDefault();
  const username = $('#user').html();
  console.log(username)
  console.log($(event.target).serialize());
  $.ajax({
    url: `stories/`,
    method: "POST",
    data: $(event.target).serialize()
  })
  .then()
  })
// INSERT INTO stories (user_id, title, content, summary, date_started, date_completed)
// VALUES (data.user_id, data.newTitle, data.newContent, )
})
