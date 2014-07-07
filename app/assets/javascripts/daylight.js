
// vars
// ----
var month_names_short    = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
var month_names          = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
var start_date           = new Date("Jan 1, 2014");
var end_date             = new Date("Dec 31, 2014");
var mins_in_a_day        = 1440;
var mins_at_start_of_day = 0;


var locations_arr = {

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
var latitude       = -33.8600;
var longitude      = 151.2094;
var moment_locale  = "Australia/Sydney";
var timezone_offset = 11;

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


// app functions
// -------------
function mins_as_perc_of_day(mins) {
  var percentage = (mins/mins_in_a_day) * 100;
  percentage = round_off_decimals(percentage);
  return percentage;
}

function convert_hours_for_timezone(date_object, moment_locale) {
  var moment_date_object = moment(date_object);
  var hours_in_locale = moment_date_object.tz(moment_locale).format('H');
  return hours_in_locale;
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

    console.log('Location: ' + moment_locale);
    console.log(latitude + ', ' + longitude);
    console.log('---------------------');

    //var inner_html = "<div class=\x22marker_holder\x22><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div><div class=\x22marker\x22></div>";
    //add_HTML('div', inner_html);

    for(var i = 0; i <= 2; i++) {

      add_HTML('h1', moment_locale + '<br />' + latitude + ', ' + longitude);

      for (var d = start_date; d <= end_date; d.setDate(d.getDate() + 1)) {

        var times = SunCalc.getTimes(new Date(d), latitude, longitude);


        // var sunrise_str = times.sunrise.getHours()  + ':' + prepend_zero(times.sunrise.getMinutes());
        // var sunset_str  = times.sunset.getHours()   + ':' + prepend_zero(times.sunset.getMinutes());
        // var day = new Date(d).getDate();
        // var month = new Date(d).getMonth();
        // var month_str = month_names[new Date(d).getMonth()];
        // var year = new Date(d).getFullYear();
        // var output = day + ' ' + month_str + ' sunrise: ' + sunrise_str + " - " + 'sunset: ' + sunset_str;
        var output = d;

        //var sunrise_date_object  = new Date(new Date(d).getFullYear(), new Date(d).getMonth(), new Date(d).getDay(), times.sunrise.getHours(), times.sunrise.getMinutes(), 0, 0);
        //var sunset_date_object   = new Date(new Date(d).getFullYear(), new Date(d).getMonth(), new Date(d).getDay(), times.sunset.getHours(), times.sunset.getMinutes(), 0, 0);

        var sunrise_hours = correct_offset_timezone_hours(times.sunrise.getHours() + timezone_offset);
        var sunrise_mins   = (sunrise_hours * 60) + times.sunrise.getMinutes();

        var sunset_hours = correct_offset_timezone_hours(times.sunset.getHours() + timezone_offset);
        var sunset_mins    = (sunset_hours * 60) + times.sunset.getMinutes();

        //console.log(sunrise_hours + " " + sunset_hours);
        //var sunrise_hours  = convert_hours_for_timezone(sunrise_date_object, moment_locale);
        //var sunset_hours   = convert_hours_for_timezone(sunset_date_object, moment_locale);



        //var output = day + " " + month_str + " Sunrise at GMT: " + times.sunrise.getHours() + ":" + times.sunrise.getMinutes() + " -- Sunset at GMT: " + times.sunset.getHours() + ":" + times.sunset.getMinutes() + " - Sunrise Localised: " + sunrise_hours + ":" + times.sunrise.getMinutes() + " - Sunset Localised: " + sunset_hours + ":" + times.sunset.getMinutes() + " - Sunrise mins: " + sunrise_mins + " - Sunset mins: " + sunset_mins;
        //console.log(day + " " + month_str + " - sunrise: " + sunrise_hours + ":" + times.sunrise.getMinutes() + " -- sunset: " + sunset_hours + ":" + times.sunset.getMinutes());
        //console.log(day + " " + month_str + " at GMT: " + times.sunrise.getHours() + ":" + times.sunrise.getMinutes() + " - Localised: " + sunrise_hours + ":" + times.sunrise.getMinutes());

        // generate visual
        var inner_html = "<div id=\x22" + output + "\x22 class=\x22day\x22><div style=\x22display:block; height:1px; background-color:blue; margin-left:" + mins_as_perc_of_day(sunrise_mins) + "%; width:" + mins_as_perc_of_day(sunset_mins - sunrise_mins) + "%;\x22></div></div>";
        add_HTML('div', inner_html);

      }

    }

});
