$(document).ready(function() {
  if ($('#earth_div').length > 0) {

    var options = {atmosphere: false, center: [0, 0], zoom: 2};
    var earth = new WE.map('earth_div', {minAltitude: 500000, maxAltitude: 10000000});

    WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
      subdomains: '1234',
      attribution: 'Tiles Courtesy of MapQuest'
    }).addTo(earth);

    earth.setView([42.3133735,-71.0571571], 2.4);

    $.getJSON( "https://api.fablabs.io/v0/labs.json", function( data ) {
      for (var i = 0; i < data.labs.length; i++) {
        var item = data.labs[i];
        // console.log(item)
        if ( item.latitude && item.longitude ) {
          WE.marker([item.latitude,item.longitude], 'lab.png', 5, 5).addTo(earth);
          // WE.marker([item.latitude, item.longitude]).addTo(earth);
          //.bindPopup('<a href="/v0/devices/' + item.id + '">' + item.id + '</a>: ' + item.name);
        }
      }
    });


    var markers = [];

    markers.push(WE.marker([41.3909267,2.1673073], 'lab.png', 5, 5));
    markers[markers.length - 1].bindPopup("<b>BARCELONA</b><br>Pledged to join in 2014.<br /><span style='font-size:10px;color:#999'>Fab Lab Barcelona...</span>", {maxWidth: 150, closeButton: true}).openPopup()

    markers.push(WE.marker([42.3133735,-71.0571571], 'lab.png', 5, 5));
    markers[markers.length - 1].bindPopup("<b>BOSTON, USA</b><br>Pledged to join in 2015.<br /><span style='font-size:10px;color:#999'>Hosting Fab 11</span>", {maxWidth: 150, closeButton: true}).openPopup();

    markers.push(WE.marker([-26.1782598,28.29638], 'lab.png', 5, 5));
    markers[markers.length - 1].bindPopup("<b>EKURHULENI, SOUTH AFRICA</b><br>Pledged to join in 2015.<br /><span style='font-size:10px;color:#999'>...</span>", {maxWidth: 150, closeButton: true}).openPopup();

    markers.push(WE.marker([10.5415985,76.1302717], 'lab.png', 5, 5));
    markers[markers.length - 1].bindPopup("<b>KERALA, INDIA</b><br>Pledged to join in 2015.<br /><span style='font-size:10px;color:#999'>...</span>", {maxWidth: 150, closeButton: true}).openPopup();

    markers.push(WE.marker([22.548819, 114.051819], 'lab.png', 5, 5));
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
      $('aside ul li:eq('+(_i-1)+')').addClass('active').delay(100).fadeIn('slow')
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
        setTimeout(function() { add(i) }, 2500);
        if (i < places.length) {
          i++;
          setTimeout(function(){ goto() }, 7000);
        }
      }
    }

    markers[0].addTo(earth);
    $('aside li:nth-child(1)').addClass('active').fadeIn()

    $('img#logo').on('click',function(){
      $('img#logo').off('click')
      $('#overlay').fadeIn(100).delay(50).fadeOut('fast')
      window.pause = true;
      goto();
    });

  }
});
