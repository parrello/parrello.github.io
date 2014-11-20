var infowindow = new google.maps.InfoWindow();

function codeLatLng() {
  var geocoder = new google.maps.Geocoder();

  var lat = $("#lat").html();
  var lng = $("#lng").html();
  lat = parseFloat(lat);
  lng = parseFloat(lng);
  var latlng = new google.maps.LatLng(lat,lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        var result = results[1];
        var city = "";
        var state = "";
        for(var i=0, len=result.address_components.length; i<len; i++) {
          var ac = result.address_components[i];
          if(ac.types.indexOf("locality") >= 0) city = ac.long_name;
          if(ac.types.indexOf("administrative_area_level_1") >= 0) state = ac.long_name;
        }
        //only report if we got Good Stuff
        if(city != '' && state != '') {
          $("#location").html(city + ", " + state);
        }
      } else {
        alert('No results found with ' + lat + " " + lng);
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', codeLatLng);