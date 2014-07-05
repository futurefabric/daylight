
var month_names_short = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
var month_names       = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];


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


$( document ).ready(function() {

    var start_date = new Date("Jan 1, 2014");
    var end_date   = new Date("Dec 31, 2014");
    var latitude   = 51.3923;
    var longitude  = -0.3000;

    console.log('Location: ' + latitude + ', ' + longitude);
    console.log('---------------------');

    for (var d = start_date; d <= end_date; d.setDate(d.getDate() + 1)) {
      var times = SunCalc.getTimes(new Date(d), latitude, longitude);
      var sunrise_str = times.sunrise.getHours()  + ':' + prepend_zero(times.sunrise.getMinutes());
      var sunset_str  = times.sunset.getHours()   + ':' + prepend_zero(times.sunset.getMinutes());

      var day = new Date(d).getDate();
      var month = new Date(d).getMonth();
      var month_str = month_names[new Date(d).getMonth()];
      var year = new Date(d).getFullYear();

      var output = /*day + ' ' + month_str + ' ' + year + ' - ' + */sunrise_str + ' (sunrise)' + ' - ' + sunset_str + ' (sunset)';
      console.log(output);
      add_HTML('p',output);
    }
});
