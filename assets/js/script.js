//the jQuery function below loads AFTER everything else on the index.html has finished loading
$(function () {

  $(".planner").on("click", ".btn", function(e) { //event listener placed on the planner div and delegated to the buttons
    if ($(e.target).parent()[0].classList[0] === "btn") { //checks to see if the parent of the target is the button itself since users can click on the floppy disk icon and it wouldn't trigger properly
      localStorage.setItem(`${$(e.target).closest("div")[0].id}`, `${$(e.target).parent().siblings("textarea").val()}`) //sets the localStorage key name to the hour-# depending on the button clicked along with the value of the text that was written in the box
    } else {
      localStorage.setItem(`${$(e.target).parent()[0].id}`, `${$(e.target).siblings("textarea").val()}`) //same functionality as line 6. refer to the comment on the same line.
    }
  })

  $(".planner").children("div").each(function(){ //function to change the box color depending on whether it's the present, in the past, or in the future for each of the hour sections.
    if (Number(this.id) > dayjs().format("H")) {//if the current iteration hour is in the future, then it will make the section green
      $(this).addClass("future")
    } else if (Number(this.id) < dayjs().format("H")){//if the current iteration hour is in the past, then it will make the section grey
      $(this).addClass("past")
    } else {
      $(this).addClass("present")//if the current iteration hour is equal to the current hour, then it will make the section red
    }
  })

  $(".planner").find("textarea").each(function(){ //for each of the sections, it checks if there is a corresponding item in localStorage. If there isn't, then it doesn't do anything. If there is, then it retrieves that item and displays it to the user in the corresponding section.
  if (localStorage.getItem(`${$(this).parent()[0].id}`)) {
    $(this).val(localStorage.getItem(`${$(this).parent()[0].id}`))
  }
})


 setInterval(function () {
  $('#currentDay').text("The current time is " + dayjs().format('h:mm:ssA MM/D/YYYY')) //displays the current time and day on the header portion
 }, 1000); 
});