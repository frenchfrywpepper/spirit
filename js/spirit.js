(function() {
  window.onload = function() {
	  
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
    
    var addStations = function(idx, value) {
   		var lng = value.geometry.coordinates[0];
   		var lat = value.geometry.coordinates[1];
   		var name = value.properties.siteName;
   		var formattedAddress = value.properties.formattedAddress;
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
   			
   		// i hate all this element logic, clean it up
   		var infoDiv = document.createElement('div');
   		
   		var siteNameElem = document.createElement('span');
   		infoDiv.appendChild(siteNameElem);
   		siteNameElem.setAttribute("class", "siteName");
   		siteNameElem.innerHTML = '<b>' + name + "</b>&nbsp;";
   		
   		infoDiv.appendChild(document.createElement('br'));
   		
   		var addressElem = document.createElement('span');
   		infoDiv.appendChild(addressElem);
   		addressElem.setAttribute("class", "address");
   		addressElem.innerHTML = formattedAddress;
   		
   		infoDiv.appendChild(document.createElement('br'));
   		infoDiv.appendChild(document.createElement('br'));
   		
   		var licenseeElem = document.createElement('span');
   		infoDiv.appendChild(licenseeElem);
   		licenseeElem.setAttribute("class", "licensee");
   		licenseeElem.innerHTML = '<b>Licensee: </b>' + licensee;

		infoDiv.appendChild(document.createElement('br'));
   		
		var siteNumElem = document.createElement('span');
   		infoDiv.appendChild(siteNumElem);
   		siteNumElem.setAttribute("class", "siteNum");
   		siteNumElem.innerHTML = '<b>Site Number: </b>' + siteNum + "<br/>";

   		var zoomInLink = document.createElement('a');
   		zoomInLink.innerHTML = 'zoom in';
      	zoomInLink.href = '#';
      	siteNameElem.appendChild(zoomInLink);
      	
      	var doZoomIn = function() {
        	map.setCenter(marker.getPosition());
            map.setZoom(15);
            zoomInLink.innerHTML = 'zoom out';
            zoomInLink.onclick = doZoomOut;
            return false;
    	};
    	
      	var doZoomOut = function() {
        	map.setCenter(marker.getPosition());
            map.fitBounds(bounds);
            zoomInLink.innerHTML = 'zoom in';
            zoomInLink.onclick = doZoomIn;
            return false;
    	};

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
          
          // Setting the content of the InfoWindow
          infowindow.setContent(infoDiv);

          // Tying the InfoWindow to the marker 
          infowindow.open(map, marker);
          
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
