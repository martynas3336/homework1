$(document).ready(function() {
  $(".scroll_trigger").on("click", function() {
    var scrollTo = $($(this).attr("scrollTo"));
    $('html,body').animate({
      scrollTop: scrollTo.offset().top - $("#Nav_wrapper").height()
    })
  })
})
