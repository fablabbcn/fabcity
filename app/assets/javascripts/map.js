$(document).ready(function() {

  if ($('#map').length > 0) {
    var map = L.map('map').setView([51.505, -0.09], 2);
    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
      maxZoom: 18,
      id: 'johnrees.ined2i0c'
    }).addTo(map);

    L.marker([41.3909267,2.1673073], {icon: window.pulseIcon}).addTo(map)
  }

});