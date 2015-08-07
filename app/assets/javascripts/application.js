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
//= require_tree .

window.pause = false;

window.pulseIcon = L.icon({
  iconUrl: 'ripple.svg',
  iconSize:     [24, 24], // size of the icon
  iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
  popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
})
