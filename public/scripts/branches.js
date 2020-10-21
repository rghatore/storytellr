$(document).ready(() => {
  //  profile page request
  $(document).on("click", ".branch_point", (e) => {
    let branch_point_id = $(e.target).closest(".branch_point")[0].id;
    console.log("this branch point id:", branch_point_id);
    $.ajax({
      url: `/branches/${branch_point_id}`,
      method: "GET"
      //data
    }).then((response) => {
      const branchPoint = response[0];
      // generateStoryPage is in scripts/helpers
      const branches = generateStoryPage(branch_point);
      $("#nav").removeClass("nav_story").addClass("nav_branch");
      $("#main").empty();
      for (const branch of branches) {
        $("#main").append(branch);
      }
    });
  });
});
