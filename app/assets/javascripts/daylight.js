
// vars
// ----
var month_names_short    = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
var month_names          = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
var start_date           = [];
var end_date             = [];
var mins_in_a_day        = 1440;
var today                = new Date();
var todays_date          = today.getDate();
var todays_month         = today.getMonth();

var locations_data = {
  "locations":
  [
    {
      "title": "London",
      "ref":"london",
      "moment_locale": "Europe/London",
      "timezone_offset":0,
      "location": {
        "latitude": "51.5072",
        "longitude": "0.1275"
      }
    },
    {
      "title": "New York",
      "ref":"new_york",
      "moment_locale": "America/New York",
      "timezone_offset":-5,
      "location": {
        "latitude": "40.7056",
        "longitude": "-73.9780"
      }
    },
    {
      "title": "Tokyo",
      "ref":"tokyo",
      "moment_locale": "Japan/Tokyo",
      "timezone_offset":8,
      "location": {
        "latitude": "35.6733",
        "longitude": "139.7103"
      }
    },
    {
      "title": "Sydney",
      "ref":"sydney",
      "moment_locale": "Australia/Sydney",
      "timezone_offset":11,
      "location": {
        "latitude": "-33.7969",
        "longitude": "150.9224"
      }
    },
    {
      "title": "Stockholm",
      "ref":"stockholm",
      "moment_locale": "Europe/Stockholm",
      "timezone_offset":1,
      "location": {
        "latitude": "59.3261",
        "longitude": "17.9875"
      }
    }
    ,
    {
      "title": "Anchorage",
      "ref":"anchorage",
      "moment_locale": "America/Anchorage",
      "timezone_offset":-9,
      "location": {
        "latitude": "61.1088",
        "longitude": "-149.3731"
      }
    }
    ,
    {
      "title": "Wellington",
      "ref":"wellington",
      "moment_locale": "New Zealand/Wellington",
      "timezone_offset":11,
      "location": {
        "latitude": "-41.2889",
        "longitude": "174.7772"
      }
    },
    {
      "title": "Johannesburg",
      "ref":"johannesburg",
      "moment_locale": "South Africa/Johannesburg",
      "timezone_offset":1,
      "location": {
        "latitude": "-26.2145",
        "longitude": "27.9643"
      }
    },
    {
      "title": "Falkland Islands",
      "ref":"falkland_islands",
      "moment_locale": "Europe/Falkland Islands",
      "timezone_offset":-4,
      "location": {
        "latitude": "-51.5356",
        "longitude": "-58.9818"
      }
    }
  ]
};



// helper functions
// ----------------
function add_HTML(html_container, html_contents) {
  var added_HTML = document.createElement(html_container);
  added_HTML.innerHTML =  html_contents;
  document.body.appendChild(added_HTML);
}

function prepend_zero(number) {
  if(number < 10) {
    var number_with_zero = '0' + number;
    return number_with_zero;
  }else{
    return number;
  }
}

function round_off_decimals(number) {
  // round to 4 decimal places
  number = Math.round(number * 10000) / 10000;
  return number;
}

function round_off_decimals(number) {
  // round to 4 decimal places
  number = Math.round(number * 10000) / 10000;
  return number;
}

function mins_as_perc_of_day(mins) {
  var percentage = (mins/mins_in_a_day) * 100;
  percentage = round_off_decimals(percentage);
  return percentage;
}

function correct_offset_timezone_hours(hours, timezone_offset, type) {

  if((hours + timezone_offset) <= 0) {
    if(type == "sunset") {
      hours = hours + timezone_offset + 24;
    }
  }else{
    hours = hours + timezone_offset;
  }

  if(hours > 24) {
    hours = hours - 24;
  }

  return hours;
}



// let's go
// --------
$( document ).ready(function() {

    for(var i = 0; i < locations_data.locations.length; i++) {

      var name             = locations_data.locations[i].title;
      var ref              = locations_data.locations[i].ref;
      var latitude         = locations_data.locations[i].location.latitude;
      var longitude        = locations_data.locations[i].location.longitude;
      var timezone_offset  = locations_data.locations[i].timezone_offset;
      start_date[i]        = new Date("Jan 01, 2014");
      end_date[i]          = new Date("Dec 31, 2014");
      var bst_start        = new Date("Mar 30, 2014");
      var bst_end          = new Date("Oct 26, 2014");

      // add location containers and headings
      $("<div id=\x22" + ref + "\x22 class=\x22location\x22></div>").appendTo('body');
      $("#" + ref).append("<h1>" + name + "</h1>");
      $("#" + ref).append("<p>" + latitude + ", " + longitude + ", (" + timezone_offset + " GMT)</p>");

      console.log(name + ': ' + latitude + ', ' + longitude);
      console.log('==========================');

      for (var d = start_date[i]; d <= end_date[i]; d.setDate(d.getDate() + 1)) {

        var times = SunCalc.getTimes(new Date(d), latitude, longitude);

        var sunrise_hours = correct_offset_timezone_hours(times.sunrise.getHours(), timezone_offset,'sunrise');
        var sunset_hours = correct_offset_timezone_hours(times.sunset.getHours(), timezone_offset,'sunset');

        var formatted_gmt_relative_sunrise_time  = times.sunrise.getHours() + ":" + prepend_zero(times.sunrise.getMinutes());
        var formatted_offset_sunrise_time        = sunrise_hours + ":" + prepend_zero(times.sunrise.getMinutes());
        var formatted_gmt_relative_sunset_time   = times.sunset.getHours() + ":" + prepend_zero(times.sunset.getMinutes());
        var formatted_offset_sunset_time         = sunset_hours + ":" + prepend_zero(times.sunset.getMinutes());


        if((d > bst_start) && (d <= bst_end)) {
          //sunrise_hours -= 1;
          //sunset_hours -= 1;
        }



        var sunrise_time_in_mins   = (sunrise_hours * 60) + times.sunrise.getMinutes();
        var sunset_time_in_mins    = (sunset_hours * 60) + times.sunset.getMinutes();

        var left_margin_perc   = mins_as_perc_of_day(sunrise_time_in_mins);
        var width_perc         = mins_as_perc_of_day(sunset_time_in_mins - sunrise_time_in_mins);



        if((d.getDate() == todays_date) && (d.getMonth() == todays_month)) {
          var day_class = "today";
        }else{
          var day_class = "daylight";
        }

        var html = "<div id=\x22" + d + "  ☼ " + formatted_offset_sunrise_time + " (" + formatted_gmt_relative_sunrise_time + ")    ☾ "
        + formatted_offset_sunset_time + " (" + formatted_gmt_relative_sunset_time + ")"
        + "\x22 class=\x22day\x22><div class=\x22" + day_class + "\x22 style=\x22margin-left:"
        + left_margin_perc + "%; width:" + width_perc + "%;\x22></div></div>";

        $("#" + ref).append(html);

        console.log("☼ " + formatted_offset_sunrise_time + " (" + formatted_gmt_relative_sunrise_time + ")    ☾ " + formatted_offset_sunset_time + " (" + formatted_gmt_relative_sunset_time + ")");
      }

      console.log('==========================');
    }

});
