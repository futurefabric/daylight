
var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

function add_HTML(html_container, html_contents) {
  var added_HTML = document.createElement(html_container);
  added_HTML.innerHTML =  html_contents;
  document.body.appendChild(added_HTML);
}

$( document ).ready(function() {
    var start_date = new Date("Jan 1, 2014");
    var end_date   = new Date("Dec 31, 2014");
    var latitude   = 51.3923;
    var longitude  = -0.3000;

    for (var d = start_date; d <= end_date; d.setDate(d.getDate() + 1)) {
      var times = SunCalc.getTimes(new Date(d), latitude, longitude);
      var sunrise_str = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
      var sunset_str = times.sunset.getHours() + ':' + times.sunset.getMinutes();
      add_HTML('table', '<tr><td>'+ new Date(d).getDate() + ' ' + monthNames[new Date(d).getMonth()] + ' ' + new Date(d).getFullYear() + '</td><td>'+sunrise_str+'</td><td>'+sunset_str+'</td></tr>');
    }
});
