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
});
