$(document).ready(() => {

  console.log('loading branch');
  $(document).on('submit', '#submit_branch', (event) => {

    event.preventDefault();
    const storyTitle = $('#story_title').text();
    const storyOwner = $('#story_username').text();
    // console.log('title: ', title);

    const data = { storyTitle, storyOwner, content: $('#writing_box').text() };

    // console.log($('#story_username').html());
    console.log('data: ', data);

    $.ajax({
      url: 'stories/branches',
      method: "POST",
      data: data
    })
    .then(data => {
      console.log(data.error);
      // $('#main').append(data.error);
    });

  })

})
