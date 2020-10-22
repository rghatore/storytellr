$(document).ready(() => {
  //  profile page request
  $(document).on("click", ".branch_marker", (e) => {
    let branch_point_id = $(e.target).closest(".branch_marker")[0].id;
    console.log("this branch point id:", branch_point_id);
    $.ajax({
      url: `stories/branches/${branch_point_id}`,
      method: "GET"
      //data
    }).then((response) => {
      const branches = response;
      $("#nav").removeClass("nav_story").addClass("nav_branch");
      $("#main").empty();
      // branches array
      for (const branch of branches) {
        console.log(branch)
        const branchPage = generateBranchesPage(branch);
        $("#main").append(branchPage);
      }
      // branche object
      // $("#main").append(branchPage);


    });
  });

  // this submits a new branch at the current open branch point id
  // $(document).on('click', '#writing_form', (event) => {
  $(document).on('click', '#story_submit', (event) => {
    // $('#writing_form').submit();
    // open branch point id for submissions - OPEN BRANCH POINT not saved in HTML
    // let branch_point_id = $(event.target).parent().parent().find(".branch_marker");
    // const lastBranchPoint = branch_point_id[branch_point_id.length - 1].id;

    // console.log("this branch point id:", lastBranchPoint);

    event.preventDefault();
    const storyTitle = $('#story_title').text();
    const storyOwner = $('#story_username').text();
    // console.log('title: ', title);

    // const data = { lastBranchPoint, content: $('#writing_box').val() };
    const data = { storyTitle, storyOwner, content: $('#writing_box').val() };

    // console.log($('#story_username').html());
    console.log('data: ', data);

    $.ajax({
      url: 'stories/branches',
      method: "POST",
      data: data
    })
    .then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        console.log('data before request: ', data);
        $.ajax({
          url: `stories/branches/${data.branch_point_id}`,
          method: "GET"
          //data
        })
        .then(response => {
          console.log('data after response: ', response);
          const branches = response;
          $("#nav").removeClass("nav_story").addClass("nav_branch");
          $("#main").empty();
          // branches array
          for (const branch of branches) {
            // console.log(branch)
            const branchPage = generateBranchesPage(branch);
            $("#main").append(branchPage);
          }
        });
      }
    })
    .catch(error => console.log(error.message));

  })

  $(document).on('click', '.approve', (event) => {
  // we need to update database for that branch to have approved date
    const branchId = $(event.target).parent().attr("id");
    // console.log('approved branch id: ', branchId);
    const data = {id: branchId}
    $.ajax({
      url: 'stories/branches',
      method: "PUT",
      data: data
    })
    .then(() => console.log("works"))
  // we need add a new branch point
  //


  })


});
