(function() {
	window.onload = function() {
		var infoDiv = document.getElementById('info');
      	var zoomInLink = document.getElementById('zoomInLink');   	
		var siteNameElem = document.getElementById('siteName');
		var streetElem = document.getElementById('street');
		var cityStateElem = document.getElementById('cityState');
		var licenseeElem = document.getElementById('licensee');
		var siteNumElem = document.getElementById('siteNum');
  
		var mapDiv = document.getElementById('map');
		
		// guesstimate for center of map
    	var latlng = new google.maps.LatLng(37.09, -95.71);
    
    	var options = {
      		center: latlng,
      		zoom: 4, // guesstimate for initial zoom level
      		mapTypeId: google.maps.MapTypeId.ROADMAP
    	};
    
    	var map = new google.maps.Map(mapDiv, options);
    
    	// track markers added to map for later extending bounds
    	var bounds = new google.maps.LatLngBounds();
    
    	var infowindow;
    	
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
   		
   			bounds.extend(latLng);      	
      		
      		(function(infoDiv, marker) {
      			var doZoomIn = function() {
					map.setCenter(marker.getPosition());
            		map.setZoom(15);
            		zoomInLink.innerHTML = 'view all stations';
            		google.maps.event.trigger(marker, 'click');
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
        		
        		google.maps.event.addListener(marker, 'click', function() {
          			if (!infowindow) {
            			infowindow = new google.maps.InfoWindow();
          			}          
          			
          			zoomInLink.onclick = doZoomIn;
          			          			
          			siteNameElem.innerHTML = name;
   					streetElem.innerHTML = address;
   					cityStateElem.innerHTML = city + ', ' + state + ' ' + zip;
   					licenseeElem.innerHTML = licensee;
   					siteNumElem.innerHTML = siteNum;	
          
                	infowindow.setContent(infoDiv);
          			infowindow.open(map, marker);
          			infoDiv.style.visibility = 'visible';
        		});
			})(infoDiv, marker);
		}
   	
    	$.getJSON('data/spirit.geojson', function(json) {
   			jQuery.each(json.features, addStations);
   			map.fitBounds(bounds);
   		});
	}
})();
