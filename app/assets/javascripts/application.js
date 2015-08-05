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

window.pause = false;

$(document).ready(function() {



    var pulseIcon = L.icon({
      iconUrl: 'ripple.svg',
      iconSize:     [24, 24], // size of the icon
      iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
      popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });

  if ($('#map').length > 0) {
    var map = L.map('map').setView([51.505, -0.09], 2);
    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
      maxZoom: 18,
      id: 'eleanor.ipncow29'
    }).addTo(map);

    L.marker([41.3909267,2.1673073], {icon: pulseIcon}).addTo(map)

  }

if ($('#earth_div').length > 0) {
  var options = {atmosphere: false, center: [0, 0], zoom: 2};
  var earth = new WE.map('earth_div', {minAltitude: 500000, maxAltitude: 10000000});
  // WE.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png?1', {
  //     id: 'johnrees.n3cfh7m6'
  // }).addTo(earth);
  WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
    subdomains: '1234',
    attribution: 'Tiles Courtesy of MapQuest'
  }).addTo(earth);

  // var marker2 = WE.marker([30.058056, 31.228889]).addTo(earth);
  // marker2.bindPopup("<b>Cairo</b><br>Yay, you found me!", {maxWidth: 120, closeButton: false});
  // var markerCustom = WE.marker([24, 24], 'ripple.svg', 24, 24).addTo(earth);

  earth.setView([42.3133735,-71.0571571], 2.2);

    $.getJSON( "https://api.fablabs.io/v0/labs.json", function( data ) {
      for (var i = 0; i < data.labs.length; i++) {
        var item = data.labs[i];
        // console.log(item)
        if ( item.latitude && item.longitude ) {
          WE.marker([item.latitude,item.longitude], 'lab.png', 4, 4).addTo(earth);
          // WE.marker([item.latitude, item.longitude]).addTo(earth);
          //.bindPopup('<a href="/v0/devices/' + item.id + '">' + item.id + '</a>: ' + item.name);
        }
      }
    });



}

var markers = [];

markers.push(WE.marker([41.3909267,2.1673073]));
markers[markers.length - 1].bindPopup("<b>BARCELONA</b><br>Pledged to join in 2014.<br /><span style='font-size:10px;color:#999'>Fab Lab Barcelona...</span>", {maxWidth: 150, closeButton: true}).openPopup()

markers.push(WE.marker([42.3133735,-71.0571571]));
markers[markers.length - 1].bindPopup("<b>BOSTON, USA</b><br>Pledged to join in 2015.<br /><span style='font-size:10px;color:#999'>Hosting Fab 11</span>", {maxWidth: 150, closeButton: true}).openPopup();

markers.push(WE.marker([-26.1782598,28.29638]));
markers[markers.length - 1].bindPopup("<b>EKURHULENI, SOUTH AFRICA</b><br>Pledged to join in 2015.<br /><span style='font-size:10px;color:#999'>...</span>", {maxWidth: 150, closeButton: true}).openPopup();

markers.push(WE.marker([10.5415985,76.1302717]));
markers[markers.length - 1].bindPopup("<b>KERALA, INDIA</b><br>Pledged to join in 2015.<br /><span style='font-size:10px;color:#999'>...</span>", {maxWidth: 150, closeButton: true}).openPopup();

markers.push(WE.marker([22.548819, 114.051819]));
markers[markers.length - 1].bindPopup("<b>SHENZHEN, CHINA</b><br>Pledged to join in 2015.<br /><span style='font-size:10px;color:#999'>Hosting Fab 12</span>", {maxWidth: 150, closeButton: true}).openPopup();


var places = [
  [41.3909267,2.1673073],
  [42.3133735,-71.0571571],
  [-26.1782598,28.29638],
  [10.5415985,76.1302717],
  [22.548819, 114.051819]
];
var i = 1;

function add(_i) {
  $('aside ul li:eq('+(_i-1)+')').addClass('active').fadeIn('slow')
  markers[_i-1].addTo(earth);
}

function doAnimation() {
  var before = null;
  requestAnimationFrame(
    function animate(now) {
      if (!window.pause) {
        var c = earth.getPosition();
        var elapsed = before? now - before: 0;
        before = now;
        // c[0]
        earth.setCenter([17, c[1] + 0.1*(elapsed/10)]);
        requestAnimationFrame(animate);
      }
    }
  );
}

doAnimation();

function goto() {
  $('aside li').removeClass('active')
  if (i == places.length) {
    window.pause = null;
    doAnimation();
  } else {
    earth.panTo(places[i], { duration: 0.2});
    setTimeout(function() { add(i) }, 2900);
    if (i < places.length) {
      i++;
      setTimeout(function(){ goto() }, 7000);
    }
  }
}
markers[0].addTo(earth);
$('aside li:nth-child(1)').addClass('active').fadeIn()

$('img#logo').on('click',function(){
  window.pause = true;
  goto();
});


});


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











// mapPagePopulate:function(){

//   var self=this;
//   // self.show_loader("Loading map data...");

//   //set initial zoom depending on device
//   var initZoom = 7;
//   if(self.deviceIsMobile()){ initZoom = 6; }

//   //init map with centre around Nottingham
//   var map = L.map('map').setView([52.946104,-1.170044], initZoom);

//   //add copyright - v important!
//   L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data © OpenStreetMap contributors',
//     maxZoom: 18,
//     minZoom: 6
//   }).addTo(map);


//   //get park data from local storage
//   var parkListLite = $.parseJSON(window.localStorage.getItem(self.localStorageKeys.parkListLite));

//   //declare empty arrays
//   var locations = [];
//   var markers = [];

//   //get label positiong (t,r,b,l)
//   var labelPositions = self.settings.mapLabelPositions();

//   //loop through park data, create location object with everything we need,
//   //and push it to locations array
//   $(parkListLite).each(function(i, obj){
//     var location = [];

//     //popup html
//     var calloutMarkup = String.format('<img class="mapPopThumb" src="{3}"><h2>{0}</h2>'+'{1}'+'<a class="parkButton clear" data-enhanced="true" data-parkpageid="{2}" data-role="button" data-shadow="false" data-textonly="false" data-textvisible="true" data-theme="green">From {4}</a>',
//     obj['ParkName'],
//     obj['MapCopy'],
//     obj['EPiServerPageId'],
//     self.endpoints.img_url + obj['MapThumbnail'],
//     self.utils.makePriceFriendly(obj['CheapestPrice'],"£")
//     );

//     var wrapper = document.createElement("div");
//     wrapper.innerHTML = calloutMarkup;
//     wrapper.className="mapCallout";


//     location[0] = obj['ParkName'];
//     location[1] = obj['Latitude'];
//     location[2] = obj['Longitude'];
//     location[3] = wrapper;
//     location[4] = labelPositions[obj['ParkName']];
//     location[5] = '<span class="parkNameLabel">'+ obj['ParkName'] +'</span>';
//     locations.push(location);
//   });

//   //create icons
//   var mapMarkerSmall, mapMarkerLarge, iconAnchor;


//   $(locations).each(function(i, loc){

//     //label anchor influences where the popup appears
//     //here we check if we want top, left, right or bottom
//     //and specify the anchor and css accordingly
//     switch(loc[4])
//     {
//     case 't':
//     labelAnchor= [-128,-63];
//     labelClass = "mapLabel top";
//     break;
//     case 'r':
//     labelAnchor= [-263,-24];
//     labelClass = "mapLabel right";
//     break;
//     case 'b':
//     labelAnchor= [-128,25];
//     labelClass = "mapLabel bottom";
//     break;
//     case 'l':
//     labelAnchor= [0,-24];
//     labelClass = "mapLabel left";
//     break;
//     default:
//     labelAnchor= [0,-24];
//     labelClass = "mapLabel left";
//     }

//     //create the large and small icon for each park, with the anchor specified above
//     mapMarkerSmall = L.icon({
//     iconUrl: 'img/mapParkMarker.png',
//     iconRetinaUrl: 'img/mapParkMarker.png',
//     iconSize: [20, 20],
//     iconAnchor: [10,10],
//     popupAnchor: [0,-20],
//     labelAnchor: labelAnchor
//     });

//     mapMarkerLarge = L.icon({
//     iconUrl: 'img/mapMarkerLarge.png',
//     iconRetinaUrl: 'img/mapMarkerLarge.png',
//     iconSize: [130, 130],
//     iconAnchor: [65,65],
//     popupAnchor: [0,-20],
//     labelAnchor: labelAnchor
//     });

//     //add marker to map with label
//     var marker = L.marker([loc[1], loc[2]], {icon: mapMarkerSmall}).bindLabel(loc[5], {noHide: true,direction: 'left',className:labelClass}).addTo(map);

//     //bind popup to marker
//     marker.bindPopup(loc[3]);

//     //we can assign arbitrary properties to marker. here we assign small and large markers
//     marker.iconSmall = mapMarkerSmall;
//     marker.iconLarge = mapMarkerLarge;

//     //hide labels on initial load
//     map.removeLayer(marker.label);

//     //push marker to marker array
//     markers.push(marker);

//   });

//   //for some zooms we need to show/hide labels or switch out markers for larger/smaller
//   map.on('zoomend', function(event) {
//     var zoom = map.getZoom();
//     var markerLabelClass;

//     for (i = 0; i < locations.length; i++) {
//     markerLabelClass = markers[i].labelClass;
//     if(zoom <= 10){
//        markers[i].setIcon(markers[i].iconSmall);
//        map.removeLayer(markers[i].label);
//     }else{
//        markers[i].setIcon(markers[i].iconLarge);
//        map.addLayer(markers[i].label);
//     }
//     }

//   });

//   //capture popup open event and run JQM create so it creates the button widget
//   //also assign click event to park view button
//   map.on('popupopen', function(e) {
//     $('#map_canvas').trigger('create');
//     $('.parkButton').unbind();
//     $('.parkButton').on('click',function(){
//       self.setLocalStorage(self.localStorageKeys.lastRequestedParkId,$(this).data('parkPageId'));
//       self.utils.notify('Not yet implemented','OK');
//       //$.mobile.changePage('#parkoverview');
//     });

//   });

//   // self.hide_loader();
// }
