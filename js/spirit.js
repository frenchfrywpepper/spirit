(function() {
  window.onload = function() {

   		var infoDiv = document.getElementById('info');
      	var zoomInLink = document.getElementById('zoomInLink');   	
		var siteNameElem = document.getElementById('siteName');
		var streetElem = document.getElementById('street');
		var cityStateElem = document.getElementById('cityState');
		var licenseeElem = document.getElementById('licensee');
		var siteNumElem = document.getElementById('siteNum');
  
	// Creating a reference to the mapDiv
    var mapDiv = document.getElementById('map');
    
    // Creating a latLng for the center of the map
    var latlng = new google.maps.LatLng(37.09, -95.71);
    
    // Creating an object literal containing the properties 
    // we want to pass to the map  
    var options = {
      center: latlng,
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    // Creating the map
    var map = new google.maps.Map(mapDiv, options);
    
    // Creating a LatLngBounds object
    var bounds = new google.maps.LatLngBounds();
    
    var infowindow;
    
    var doZoomIn = function() {
        	map.setCenter(marker.getPosition());
            map.setZoom(15);
            zoomInLink.innerHTML = 'view all stations';
            zoomInLink.onclick = doZoomOut;
            return false;
    	};
    	
      	var doZoomOut = function() {
        	map.setCenter(marker.getPosition());
            map.fitBounds(bounds);
            zoomInLink.innerHTML = 'zoom to station';
            zoomInLink.onclick = doZoomIn;
            return false;
    	};
    var addStations = function(idx, value) {
   		var lng = value.geometry.coordinates[0];
   		var lat = value.geometry.coordinates[1];
   		var name = value.properties.siteName;
   		var formattedAddress = value.properties.formattedAddress;
   		var address = value.properties.address;
   		var city = value.properties.city;
   		var state = value.properties.state;
   		var zip = value.properties.zip;
   		var licensee = value.properties.licensee;
   		var siteNum = value.properties.num;
   		
   		var latLng = new google.maps.LatLng(lat, lng);
   		
   		var marker = new google.maps.Marker({
   			position: latLng,
   			map: map,
   			title: name,
   			icon: 'img/spiritmarkerround.png'
   		});
   		
   		// Extending the bounds object with each LatLng
        bounds.extend(latLng);

      	

    	zoomInLink.onclick = doZoomIn;
   		
   		// Wrapping the event listener inside an anonymous function 
      // that we immediately invoke and passes the variable i to.
      (function(infoDiv, marker) {

        // Creating the event listener. It now has access to the values of
        // i and marker as they were during its creation
        google.maps.event.addListener(marker, 'click', function() {
          
          if (!infowindow) {
            infowindow = new google.maps.InfoWindow();
          }          
          
          			siteNameElem.innerHTML = name;
   		streetElem.innerHTML = address;
   		cityStateElem.innerHTML = city + ', ' + state + ' ' + zip;
   		licenseeElem.innerHTML = licensee;
   		siteNumElem.innerHTML = siteNum;	
          
          // Setting the content of the InfoWindow
          infowindow.setContent(infoDiv);

          // Tying the InfoWindow to the marker 
          infowindow.open(map, marker);
          infoDiv.style.visibility = 'visible';
        });

      })(infoDiv, marker);
   	}
   	
    $.get("data/spirit.geojson", function(myJSONtext) {
   		var stations = eval('(' + myJSONtext + ')');
   		jQuery.each(stations.features, addStations);
   	});
   	
	map.fitBounds(bounds);
  }
})();
