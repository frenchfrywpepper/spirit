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
   		siteNumElem.innerHTML = '<b>Site Number: </b>' + siteNum;

   		var zoomInLink = document.createElement('a');
   		zoomInLink.innerHTML = 'zoom in';
      	zoomInLink.href = '#';
      	siteNameElem.appendChild(zoomInLink);
      	
    	zoomInLink.onclick = function() {
        	map.setCenter(marker.getPosition());
            map.setZoom(15);
            return false;
    	};
   		
   		//var content = '<div>' +
   		///	'<span class="siteName">' + name + ' <a href="#">Zoom In</a></span><br/>' +
   			//'<span class="address">' + formattedAddress + '</span><br/><br/>' +
   			//'<span class="licensee"><b>Licensee: </b>' + licensee + '</span><br/>' +
   			//'<span class="siteNum"><b>Site Number: </b>' + siteNum + '</span><br/>' +
   			//'</div>';
   		
   		var infowindow = new google.maps.InfoWindow({});
   		infowindow.setContent(infoDiv);
   		
   		google.maps.event.addListener(marker, 'click', function() {
   			infowindow.open(map, marker);
   		});
   	}
   	
    $.get("data/spirit.geojson", function(myJSONtext) {
   		var stations = eval('(' + myJSONtext + ')');
   		jQuery.each(stations.features, addStations);
   	});
   	
   	// Adjusting the map to new bounding box
    map.fitBounds(bounds)
  }
})();
