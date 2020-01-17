// # VALIDATION PART
var validate = {
  name: function(value, callback)
  {
    if(!value.length)
    {
      return callback("empty");
    }
    return callback(null);
  },
  email: function(value, callback)
  {
    if(!value.length)
    {
      return callback("empty");
    }
    if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value))
    {
      return callback("invalid");
    }
    return callback(null);
  },
  phone: function(value, callback)
  {
    if(!value.length)
    {
      return callback("empty");
    }
    if(!/^\d+$/.test(value))
    {
      return callback("invalid");
    }
    return callback(null);
  },
  message: function(value, callback)
  {
    if(!value.length)
    {
      return callback("empty");
    }
    return callback(null);
  },
  tos: function(value, callback)
  {
    if(!value)
    {
      return callback("empty");
    }
    return callback(null);
  }
}

// # VALIDATE INPUT
function validateInput(input, callback)
{
  error = [];
  for(var i = 0; i < input.length; i++)
  {
    validate[input[i].name](input[i].value, function(err, callback) {
      if(err)
      {
        error.push({name:input[i].name, error:err});
      }
    })
  }
  if(error.length)
  {
    return callback(error);
  } else {
    return callback(null);
  }
}

function fetchError(form, err)
{
  for(var i = 0; i < err.length; i++)
  {
    $(form).find("input[name='"+err[i].name+"']").closest(".input_wrapper").attr("error", "true");

    if(err[i].error == "empty")
    {
      $(form).find("input[name='"+err[i].name+"']").closest(".input_wrapper").find(".input_error_container").html("Privalomas laukas");
    }

    if(err[i].name == "email")
    {
      if(err[i].error == "invalid")
      {
        $(form).find("input[name='"+err[i].name+"']").closest(".input_wrapper").find(".input_error_container").html("Įvestas neteisingas el. paštas");
      }
    }

    if(err[i].name == "phone")
    {
      if(err[i].error == "invalid")
      {
        $(form).find("input[name='"+err[i].name+"']").closest(".input_wrapper").find(".input_error_container").html("Įvestas neteisingas tel. numeris");
      }
    }
  }
}

// # ON INPUT
$(document).on("change keyup, keypress, blur", "#form input[type='text'], #form input[type='number']", function() {
  var name = $(this).attr("name");
  var value = $(this).val();
  validate[name](value, function(err, res) {
    if(err)
    {
      fetchError("#form", [{name:name, error:err}]);
    } else {
      $(this).closest(".input_wrapper").removeAttr("error");
      $(this).closest(".input_wrapper").find(".input_error_container").html("");
    }
  }.bind(this))
  checkErrors("#form");
})

// # ON CHECKBOX
$(document).on("click", "#form input[type='checkbox']", function() {
  var name = $(this).attr("name");
  var value = "on";
  if(!$(this).is(":checked"))
  {
    value = null;
  }
  validate[name](value, function(err, res) {
    if(err)
    {
      fetchError("#form", [{name:name, error:err}]);
    } else {
      $(this).closest(".input_wrapper").removeAttr("error");
      $(this).closest(".input_wrapper").find(".input_error_container").html("");
    }
  }.bind(this))
  checkErrors("#form");
})

function checkErrors(form)
{
  if($(form).find(".input_wrapper[error='true']").length)
  {
    $(form).find(".contacts_form_submit_button_container").prop('disabled', true);
  } else {
    $(form).find(".contacts_form_submit_button_container").prop('disabled', false);
  }
}

// # CONTACT FORM VALIDATION
$(document).on("submit", "#form", function(e) {
  e.preventDefault();
  var values = {};

  $.each($(this).serializeArray(), function(i, field) {
    values[field.name] = field.value;
  });

  if(!("tos" in values))
  {
    values.tos = "";
  }

  valuesArr = [];
  Object.keys(values).map(function(key) {
    valuesArr.push({name:key, value:values[key]})
  })

  validateInput(valuesArr, function(err, res) {
    $(this).find(".input_wrapper").removeAttr("error");
    $(this).find(".input_error_container").html("");
    if(err)
    {
      fetchError(this, err);
    } else {
      alert("success");
    }
    checkErrors(this)
  }.bind(this));
})
