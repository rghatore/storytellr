$(document).ready(() => {
  //  profile page request
  $(document).on('click', '#branch_point', () => {

    // username instead of user id
    const branch_point = $('#branch_point').html();

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
