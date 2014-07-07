
// vars
// ----
var month_names_short    = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
var month_names          = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
var start_date           = [];
var end_date             = [];
var mins_in_a_day        = 1440;

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
      "title": "Sydney",
      "ref":"sydney",
      "moment_locale": "Australia/Sydney",
      "timezone_offset":11,
      "location": {
        "latitude": "-33.8600",
        "longitude": "151.2094"
      }
    },
    {
      "title": "Stockholm",
      "ref":"stockholm",
      "moment_locale": "Europe/Stockholm",
      "timezone_offset":1,
      "location": {
        "latitude": "59.3294",
        "longitude": "18.0686"
      }
    }
    ,
    {
      "title": "Anchorage",
      "ref":"anchorage",
      "moment_locale": "America/Anchorage",
      "timezone_offset":-9,
      "location": {
        "latitude": "61.2167",
        "longitude": "149.9000"
      }
    }
  ]
};

// London
// var latitude   = 51.5072;
// var longitude  = -0.1275;
// var moment_locale = "Europe/London";
// var timezone_offset = 0;

// Anchorage
// var latitude   = 61.2167;
// var longitude  = 149.9000;
// var moment_locale = "America/Anchorage";
// var timezone_offset = -9;

// Sydney
// var latitude       = -33.8600;
// var longitude      = 151.2094;
// var moment_locale  = "Australia/Sydney";
// var timezone_offset = 11;

// Berlin
// var latitude   = 52.5167;
// var longitude  = 13.3833;
// var moment_locale  = "Europe/Berlin";
// var timezone_offset = 1;

// Stockholm
// var latitude   = 59.3294;
// var longitude  = 18.0686;
// var moment_locale  = "Europe/Stockholm";
// var timezone_offset = 1;




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

function correct_offset_timezone_hours(hours) {
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
      start_date[i] = new Date("Jan 01, 2014");
      end_date[i]   = new Date("Dec 31, 2014");

      $("#" + ref).append("<h1>" + name + ': ' + latitude + ', ' + longitude + "</h1>");

      console.log(name + ': ' + latitude + ', ' + longitude);
      console.log('==========================');

      for (var d = start_date[i]; d <= end_date[i]; d.setDate(d.getDate() + 1)) {

        var times = SunCalc.getTimes(new Date(d), latitude, longitude);

        var sunrise_hours = correct_offset_timezone_hours(times.sunrise.getHours() + timezone_offset);
        var sunset_hours = correct_offset_timezone_hours(times.sunset.getHours() + timezone_offset);

        var sunrise_time_in_mins   = (sunrise_hours * 60) + times.sunrise.getMinutes();
        var sunset_time_in_mins    = (sunset_hours * 60) + times.sunset.getMinutes();

        console.log("☼ " + sunrise_hours + ":" + prepend_zero(times.sunrise.getMinutes()) + "    ☾ " + sunset_hours + ":" + prepend_zero(times.sunset.getMinutes()));

        var html = "<div id=\x22" + d + "\x22 class=\x22day\x22><div style=\x22display:block; height:1px; background-color:blue; margin-left:" + mins_as_perc_of_day(sunrise_time_in_mins) + "%; width:" + mins_as_perc_of_day(sunset_time_in_mins - sunrise_time_in_mins) + "%;\x22></div></div>";

        $("#" + ref).append(html);
      }

      console.log('==========================');
    }

});
