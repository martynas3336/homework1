function scroll(direction)
{
  var currentScrollXElement = parseInt(-$('.home_page_content_blocks_container').position().left / $(".home_page_content_block").outerWidth(true));
  var scrollXElement = currentScrollXElement;
  // # TOTAL AND VISIBLE ELEMENT AMOUNT
  var visibleElement = parseInt($(".home_page_content_blocks_container").width() / $(".home_page_content_block").outerWidth(true));
  var totalElement = $(".home_page_content_block").length;

  // # MIN AND MAX ELEMENT SCROLLTO
  var maxScrollX = totalElement - visibleElement;
  var minScrollX = 0;

  // # AT WHICH SCROLLX LEFT AND RIGHT ARROW WILL HAVE WHITE BACKGROUND
  var left_arrow_shadow_min_scrollX = 1;
  var right_arrow_shadow_max_scrollX = maxScrollX - 1;

  // # CALCULATE WHICH ELEMENT TO SCROLL TO
  if(direction == "left")
  {
    scrollXElement = currentScrollXElement - visibleElement;

    if(scrollXElement < minScrollX)
    {
      scrollXElement = minScrollX;
    }
  }
  if(direction == "right")
  {
    scrollXElement = currentScrollXElement + visibleElement;
    if(scrollXElement > maxScrollX)
    {
      scrollXElement = maxScrollX;
    }
  }
  var scrollTo = $(".home_page_content_block:eq('"+scrollXElement+"')");
  $('.home_page_content_blocks_container').animate({
     left: -(scrollTo.offset().left - $(".home_page_content_blocks_container").offset().left)
  })

  // # WHITE GRADIENT DEPENDING IF THERE IS ANYTHING TO SCROLL MORE
  if(scrollXElement < left_arrow_shadow_min_scrollX)
  {
    $(".left_arrow_wrapper").addClass("no_background");
  } else {
    $(".left_arrow_wrapper").removeClass("no_background");
  }
  if(scrollXElement > right_arrow_shadow_max_scrollX)
  {
    $(".right_arrow_wrapper").addClass("no_background");
  } else {
    $(".right_arrow_wrapper").removeClass("no_background");
  }
}


$(document).ready(function() {
  $(".left_arrow").on("click", function() {
    scroll("left");
  })

  $(".right_arrow").on("click", function() {
    scroll("right");
  })
})
