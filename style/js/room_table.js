// # ROOMS CLASS
var Rooms = function(list){

  this.filterProperties = {
    area:null,
    roomAmount:null,
    window_orientation:null,
    finished:null
  }
  this.list = list;
}
Rooms.prototype.find = function(filter)
{
  this.filterProperties.area = (filter.area != null ? filter.area : this.filterProperties.area);
  this.filterProperties.roomAmount = (filter.roomAmount != null ? filter.roomAmount : this.filterProperties.roomAmount);
  this.filterProperties.window_orientation = (filter.window_orientation != null ? filter.window_orientation : this.filterProperties.window_orientation);
  this.filterProperties.finished = (filter.finished != null ? filter.finished : this.filterProperties.finished);
  return this.list.filter(function(obj) {
    return (
      ((this.filterProperties.area == null || this.filterProperties.area == "-") ? 1 : obj.area >= this.filterProperties.area) &&
      ((this.filterProperties.roomAmount == null || this.filterProperties.roomAmount == "-") ? 1 : obj.roomAmount == this.filterProperties.roomAmount) &&
      ((this.filterProperties.window_orientation == null || this.filterProperties.window_orientation == "-") ? 1 : obj.window_orientation == this.filterProperties.window_orientation) &&
      ((this.filterProperties.finished == null || this.filterProperties.finished == "-") ? 1 : obj.finished == this.filterProperties.finished)
    )
  }.bind(this)).map(function(obj){return obj.id});
}

// # CREATE EMPTY rooms CLASS
var rooms = new Rooms();


$(document).ready(function() {
  // # REPLACE rooms VARIABLE WITH new Rooms that will have a list
  rooms = new Rooms(room_list);

  // # FETCH LIST TO THE TABLE
  for(var i = 0; i < rooms.list.length; i++)
  {
    $(".offers_table tbody").append(
      $("<tr/>", {
        id:rooms.list[i].id
      }).each(function() {

        $(this).append($("<td/>", {
          html:(rooms.list[i].discount ? "-"+rooms.list[i].discount+"%" : "-")
        }))

        $(this).append($("<td/>", {
          html:rooms.list[i].homeNo
        }))

        $(this).append($("<td/>", {
          html:rooms.list[i].area
        }))

        $(this).append($("<td/>", {
          html:rooms.list[i].roomAmount
        }))

        $(this).append($("<td/>", {}).each(function() {
          switch(rooms.list[i].window_orientation)
          {
            case 0:
            {
              $(this).html("Šiaurė");
              break;
            }
            case 1:
            {
              $(this).html("Rytai");
              break;
            }
            case 2:
            {
              $(this).html("Pietūs");
              break;
            }
            case 3:
            {
              $(this).html("Vakarai");
              break;
            }
            default:
            {
              break;
            }
          }
        }))

        $(this).append($("<td/>", {
          html:(rooms.list[i].finished ? "Pastatyta" : "Statoma")
        }))
      })
    )
  }
})

function fetchRooms(prop) {
  var matches = rooms.find(prop);
  $(".offers_table tbody tr").each(function() {
    var includes = false;
    for(var i = 0; i < matches.length; i++)
    {
      if(parseInt($(this).attr("id")) == matches[i])
      {
        $(this).addClass("selected");
        includes = true;
      }
    }
    if(!includes)
    {
      $(this).removeClass("selected");
    }
  })
}

// # OFFERS PAGE TABLE FILTER OPTIONS
$(document).on("click", ".offers_page_dropdown_selection_wrapper", function() {
  $(this).parent().find(".offers_page_dropdown_selection_wrapper").removeClass("selected");
  $(this).addClass("selected");
  var prop = {};
  var key = $(this).closest(".offers_page_dropdown_button").attr("id")
  var value = $(this).find(".offers_page_dropdown_selection").attr('value');
  prop[key] = value;

  fetchRooms(prop);
})

// # FETCH ROOM RESULT AFTER PAGE LOAD
$(document).ready(function() {
  var prop = {};
  $("#area").find(".offers_page_dropdown_selection_wrapper.selected").each(function() {
    prop["area"] = $(this).find(".offers_page_dropdown_selection").attr("value");
  });
  $("#roomAmount").find(".offers_page_dropdown_selection_wrapper.selected").each(function() {
    prop["roomAmount"] = $(this).find(".offers_page_dropdown_selection").attr("value");
  });
  $("#window_orientation").find(".offers_page_dropdown_selection_wrapper.selected").each(function() {
    prop["window_orientation"] = $(this).find(".offers_page_dropdown_selection").attr("value");
  });
  $("#finished").find(".offers_page_dropdown_selection_wrapper.selected").each(function() {
    prop["finished"] = $(this).find(".offers_page_dropdown_selection").attr("value");
  });
  fetchRooms(prop);
})

// # OFFERS PAGE TABLE FILTER SELECTION FOCUS
$(document).ready(function() {
  $(document).on("mouseup", ".focus_toggle", function() {
    if($(this).attr("focused") == "true")
    {
      $(this).blur();
    } else {
      $(this).attr("focused", true);
    }
  })
  $(".focus_toggle").focusout(function() {
    $(this).attr("focused", false);
  })
})
