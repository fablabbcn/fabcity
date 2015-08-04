// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.countdown
//= require turbolinks
//= require_tree .

var map = L.map('map').setView([51.505, -0.09], 2);
L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
  maxZoom: 18,
  id: 'eleanor.ipncow29'
}).addTo(map);

// $.getJSON( "https://new-api.smartcitizen.me/v0/devices/world_map", function( data ) {
//   for (var i = 0; i < data.length; i++) {
//     var item = data[i];
//     if ( item.latitude && item.longitude ) {
//       L.marker([item.latitude, item.longitude]).addTo(map).bindPopup('<a href="/v0/devices/' + item.id + '">' + item.id + '</a>: ' + item.name);
//     }
//   }
// });

      var isWebkit = 'WebkitAppearance' in document.documentElement.style;


$(function() {

var endDate;

  date = new Date("July 7, 2054 18:16:30");

  $('.countdown.styled').countdown({
    date: date,
    render: function(data) {
      $(this.el).html("<div>" + this.leadingZeros(data.years, 2) + " <span>years</span></div><div>" + this.leadingZeros(data.days, 3) + " <span>days</span></div><div>" + this.leadingZeros(data.hours, 2) + " <span>hours</span></div><div>" + this.leadingZeros(data.min, 2) + " <span>minutes</span></div><div>" + this.leadingZeros(data.sec, 2) + " <span>seconds</span></div>");
    }
  });

});