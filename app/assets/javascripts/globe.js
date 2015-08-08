$(document).ready(function() {
  if ($('#earth_div').length > 0) {

    var options = {atmosphere: false, center: [0, 0], zoom: 2};
    var earth = new WE.map('earth_div', {minAltitude: 500000, maxAltitude: 10000000});

    WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
      subdomains: '1234',
      attribution: 'Tiles Courtesy of MapQuest'
    }).addTo(earth);

    earth.setView([25.3909267,50.1673073], 2.4);

    $.getJSON( "https://api.fablabs.io/v0/labs.json", function( data ) {
      $('#count').html(data.labs.length)
      for (var i = 0; i < data.labs.length; i++) {
        var item = data.labs[i];
        if ( item.latitude && item.longitude ) {
          WE.marker([item.latitude,item.longitude], 'lab.png', 5, 5).addTo(earth);
        }
      }
    });

    var i = 1;

    function add(_i) {
      $('aside ul li:eq('+(_i-1)+')').addClass('active').delay(100).fadeIn('slow')
      window.markers[_i-1].addTo(earth);

      window.markers[2]
      setTimeout(function() { window.pause = null; doAnimation(); }, 1500);
    }

    function doAnimation() {
      $('aside li').removeClass('active')
      var before = null;
      requestAnimationFrame(
        function animate(now) {
          if (!window.pause) {
            var c = earth.getPosition();
            var elapsed = before? now - before: 0;
            before = now;
            earth.setCenter([c[0], c[1] - 0.1*(elapsed/8)]);
            requestAnimationFrame(animate);
          }
        }
      );
    }

    doAnimation();

    function goto() {
      $('aside li').removeClass('active')
      // if (i == window.places.length) {
      //   window.pause = null;
      //   doAnimation();
      // } else {
        earth.panTo(window.places[i], { duration: 0.2});
        setTimeout(function() { add(i) }, 2000);

        // window.pause = null;
        // doAnimation();
        i++;
      // }
    }

    window.markers[0].addTo(earth);
    $('aside li:nth-child(1)').fadeIn()

    function clicker() {
      $('img#logo').on('click',function(){
        $('img#logo').off('click')
        if (i < window.places.length) {
          $('#overlay').fadeIn(100).delay(50).fadeOut('fast')
          window.pause = true;
          goto();
        }
        setTimeout(function() { clicker() }, 4000);
      });
    }

    clicker();


    $(window.markers[3].element).find('.we-pp').first().css({top: -15, left: 5})
    $(window.markers[3].element).find('.we-pp-tip-cont').hide()
    $(window.markers[5].element).find('.we-pp').first().css({left: -142, top: -15})
    $(window.markers[5].element).find('.we-pp-tip-cont').hide()
  }
});
