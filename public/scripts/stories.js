$(document).ready(() => {

  $.ajax({
    url: '/stories',
    method: 'GET'
    // data
  })
  .then((stories) => {
  // target is .container .content

  for (const story of stories){
    $('.container .content').append(`<h1>${story.title}</h1><h3>${story.name}</h3><p>${story.summary}</p>`);
  }
  })
});
