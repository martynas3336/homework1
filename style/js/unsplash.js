// # UNSPLASH
var app_id = '4aabda3b7d2ac053ba88fd608e3faf8cd9d9a077f78cb2663a97aa8d931e299d';
function GetRandomBackground(callback)
{
  var url = 'https://api.unsplash.com/photos/random?client_id=' + app_id +'&count=6';
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(json) {
      callback(json);
    }
  });
}

$(document).ready(function() {
  GetRandomBackground(function(json) {
    for(var i = 0; i < json.length; i++)
    {
      $(".news_blocks_wrapper").append(
        $("<a/>", {
          class:"news_block",
          href:json[i].urls.regular,
          target:"_blank"
        }).each(function() {
          $(this).append(
            $("<div/>", {
              class:"news_block_background_image_wrapper",
            }).each(function() {
              $(this).append($("<div/>", {
                class:"news_block_background_image",
                style:'background-image:url("'+json[i].urls.regular+'")'
              }))
            }),

            $("<div/>", {
              class:"news_block_header_wrapper",
              html:json[i].alt_description
            })
          )
        })
      )
    }

  });
})
