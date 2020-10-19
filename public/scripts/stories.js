$(document).ready(() => {

  $.ajax({
    url: '/stories',
    method: 'GET'
    // data
  })
  .then((stories) => {
  // target is .container .content

  for (const story of stories){
    $('.container .content').append(`<p>${story.title}</p><p>${story.name}</p><p>${story.summary}</p>`);
  }
  })
});
