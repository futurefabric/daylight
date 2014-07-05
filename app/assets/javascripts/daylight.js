
// vars
// ----
var month_names_short = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
var month_names       = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
var start_date = new Date("Jan 1, 2014");
var end_date   = new Date("Dec 31, 2014");
var mins_in_a_day   = 1440;
var mins_at_start_of_day = 0;
var latitude   = 51.3923;
var longitude  = -0.3000;


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

      //var output = day + ' ' + month_str + ' ' + year + ' - ' + dawn_str + ' (dawn) - ' + sunrise_str + ' (sunrise) - ' + sunset_str + ' (sunset) - ' + dusk_str + ' (dusk)' ;
      //var output = mins_at_start_of_day + ' - ' + dawn_mins + ' - ' + sunrise_mins + ' - ' + sunset_mins + ' - ' + dusk_mins + ' - ' + mins_in_a_day;
      var output = mins_as_perc_of_day(mins_at_start_of_day) + ' - ' + mins_as_perc_of_day(dawn_mins) + ' - ' + mins_as_perc_of_day(sunrise_mins) + ' - ' + mins_as_perc_of_day(sunset_mins) + ' - ' + mins_as_perc_of_day(dusk_mins) + ' - ' + mins_as_perc_of_day(mins_in_a_day);

      console.log(output);
      add_HTML('p',output);
    }
});
