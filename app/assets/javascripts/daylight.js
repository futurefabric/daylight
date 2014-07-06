
// vars
// ----
var month_names_short    = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
var month_names          = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
var start_date           = new Date("Jan 1, 2014");
var end_date             = new Date("Dec 31, 2014");
var mins_in_a_day        = 1440;
var mins_at_start_of_day = 0;

// London
// var latitude   = 51.5072;
// var longitude  = -0.1275;
// var moment_js_ref = "Europe/London";

// Sydney
var latitude       = -33.8600;
var longitude      = 151.2094;
var moment_js_ref  = "Australia/Sydney";

// Berlin
// var latitude   = 52.5167;
// var longitude  = 13.3833;
// var moment_js_ref  = "Europe/Berlin";

// Stockholm
// var latitude   = 59.3294;
// var longitude  = 18.0686;
// var moment_js_ref  = "Europe/Stockholm";




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


// app functions
// -------------
function mins_as_perc_of_day(mins) {
  var percentage = (mins/mins_in_a_day) * 100;
  percentage = round_off_decimals(percentage);
  return percentage;
}



// let's go
// --------
$( document ).ready(function() {

    console.log('Location: ' + latitude + ', ' + longitude);
    console.log('---------------------');

    add_HTML('h1', latitude + ', ' + longitude);

    for (var d = start_date; d <= end_date; d.setDate(d.getDate() + 1)) {

      var times = SunCalc.getTimes(new Date(d), latitude, longitude);

      var dawn_str    = times.dawn.getHours()     + ':' + prepend_zero(times.dawn.getMinutes());
      var sunrise_str = times.sunrise.getHours()  + ':' + prepend_zero(times.sunrise.getMinutes());
      var sunset_str  = times.sunset.getHours()   + ':' + prepend_zero(times.sunset.getMinutes());
      var dusk_str    = times.dusk.getHours()     + ':' + prepend_zero(times.dusk.getMinutes());


      var dawn_mins = (times.dawn.getHours() * 60) + times.dawn.getMinutes();
      var sunrise_mins = (times.sunrise.getHours() * 60) + times.sunrise.getMinutes();
      var sunset_mins = (times.sunset.getHours() * 60) + times.sunset.getMinutes();
      var dusk_mins = (times.dusk.getHours() * 60) + times.dusk.getMinutes();

      var day = new Date(d).getDate();
      var month = new Date(d).getMonth();
      var month_str = month_names[new Date(d).getMonth()];
      var year = new Date(d).getFullYear();

      var output =

      day + '' + month_str + ' sunrise: ' + sunrise_str + " - " +
      'sunset: ' + sunset_str;

      // mins_as_perc_of_day(sunrise_mins) + ' - ' +
      // mins_as_perc_of_day(sunset_mins - sunrise_mins) + ' - ' +
      // mins_as_perc_of_day(mins_in_a_day);

      console.log(output);

      var inner_html = "<div class=\x22day\x22><div style=\x22display:block; height:1px; background-color:blue; margin-left:" + mins_as_perc_of_day(sunrise_mins) + "%; width:" + mins_as_perc_of_day(sunset_mins - sunrise_mins) + "%;\x22></div></div>";
      add_HTML('div', inner_html);

    }
});
