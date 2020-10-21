$(document).ready(() => {

  $(document).on('submit', '.story .writing_box form', (event) => {

    event.preventDefault();
    const title = $('#story_title').html();


    console.log(title);
    // console.log($('#story_username').html());
    console.log($(event.target).serialize());

    $.ajax({
      url: 'stories/branches',
      method: "POST",
      data: $(event.target).serialize()
    })
    .then(data => {
      console.log(data.error);
      // $('#main').append(data.error);
    });

  })

})
