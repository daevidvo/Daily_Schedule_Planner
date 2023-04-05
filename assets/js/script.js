// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {









  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?


  //localStorage.setItem(`${$(e.target).parent().siblings(".btn").id}`)
  $(".planner").on("click", ".btn", function(e) {
    if ($(e.target).parent()[0].classList[0] === "btn") {
      localStorage.setItem(`${$(e.target).closest("div")[0].id}`, `${$(e.target).parent().siblings("textarea").val()}`)
    } else {
      localStorage.setItem(`${$(e.target).parent()[0].id}`, `${$(e.target).siblings("textarea").val()}`)
    }
  })

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?


  //
  $(".planner").children("div").each(function(){
    if (this.id.includes("9")) {
      if (dayjs().format("H") > 9) {
        $(this).addClass("past")
      } else if (dayjs().format("H") < 9) {
        $(this).addClass("future")
      } else {
        $(this).addClass("present")
      }
    } else if (this.id > `hour-${dayjs().format("H")}`) {
      $(this).addClass("future")
    } else if (this.id < `hour-${dayjs().format("H")}`){
      $(this).addClass("past")
    } else {
      $(this).addClass("present")
    }
  })

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $(".planner").find("textarea").each(function(){
  if (localStorage.getItem(`${$(this).parent()[0].id}`)) {
    $(this).val(localStorage.getItem(`${$(this).parent()[0].id}`))
  }
})

  // TODO: Add code to display the current date in the header of the page.

  $('#currentDay').text("The current time is " + dayjs().format('h:mmA MM/D/YYYY')) //displays the current time and day on the header portion
});