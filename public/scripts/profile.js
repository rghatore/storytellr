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
      $(".container").append(`
      <section class="newStory">
        <label for="newTitle">Title</label>
        <input type="newTitle" name="newTitle" id="newTitle" placeholder="Title" required>
        <label for="newSummary">Title</label>
        <input type="newSummary" name="newSummary" id="newSummary" placeholder="Summary" required>
        <label for="newContent">Your Story</label>
        <input type="newContent" name="newContent" id="newContent" placeholder="Once upon a time ..." required>
        <button id ="submit" type="submit">Publish</button>
      </section>
      `
      )
    })
  })

})
