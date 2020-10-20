$(document).ready(() => {
  $.ajax({
    url: '/stories',
    method: 'GET'
    // data
  })
  .then((stories) => {
  // target is .container .content

  for (const story of stories){
    $('.container').append(`
    <section class="content content_home card card_home">
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
  })
});
