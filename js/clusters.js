(function() {
	window.onload = function() {
		var stateCenters = {};
		stateCenters['AL'] = new google.maps.LatLng(32.614361, -86.680733);
		stateCenters['AR'] = new google.maps.LatLng(34.7519,-92.130547);
		stateCenters['AZ'] = new google.maps.LatLng(34.167881,-111.930702);
		stateCenters['CA'] = new google.maps.LatLng(37.271881,-119.270233);
		stateCenters['CO'] = new google.maps.LatLng(38.997921,-105.550957);
		stateCenters['FL'] = new google.maps.LatLng(27.9758,-81.541061);
		stateCenters['GA'] = new google.maps.LatLng(32.67828,-83.222954);
		stateCenters['HI'] = new google.maps.LatLng(19.59009,-155.434143);
		stateCenters['IL'] = new google.maps.LatLng(39.739262,-89.504089);
		stateCenters['IN'] = new google.maps.LatLng(39.766178,-86.441048);
		stateCenters['LA'] = new google.maps.LatLng(30.974199,-91.523819);
		stateCenters['MA'] = new google.maps.LatLng(42.184189,-71.718178);
		stateCenters['MD'] = new google.maps.LatLng(38.823502,-75.923813);
		stateCenters['MI'] = new google.maps.LatLng(43.742699,-84.621674);
		stateCenters['MN'] = new google.maps.LatLng(45.262321,-69.012489);
		stateCenters['MO'] = new google.maps.LatLng(46.679489,-110.04454);
		stateCenters['MS'] = new google.maps.LatLng(38.2589,-92.436592);
		stateCenters['NC'] = new google.maps.LatLng(35.21962,-80.019547);
		stateCenters['NE'] = new google.maps.LatLng(41.500751,-99.680946);
		stateCenters['NJ'] = new google.maps.LatLng(40.14323,-74.726707);
		stateCenters['NV'] = new google.maps.LatLng(38.502048,-117.022583);
		stateCenters['NY'] = new google.maps.LatLng(40.71455,-74.007124);
		stateCenters['OH'] = new google.maps.LatLng(40.190331,-82.669472);
		stateCenters['OR'] = new google.maps.LatLng(44.115589,-120.514839);
		stateCenters['PA'] = new google.maps.LatLng(40.994709,-77.604538);
		stateCenters['TN'] = new google.maps.LatLng(35.83073,-85.978737);
		stateCenters['TX'] = new google.maps.LatLng(31.1689,-100.077148);
		stateCenters['VA'] = new google.maps.LatLng(38.003349,-79.771271);
		stateCenters['WA'] = new google.maps.LatLng(47.274319,-120.832718);
		stateCenters['WI'] = new google.maps.LatLng(44.7272,-90.101257);
		stateCenters['WY'] = new google.maps.LatLng(43.00029,-107.554047);
		
		var infoDiv = document.getElementById('info');
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
    	var countByState = {};
    	var stationMarkers = [];
    	var stateMarkers;
    	var currentState;
    	
    	var processGeoJson = function(idx, value) {
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
   		
   			if (countByState[state]) {
   				countByState[state]++;
   			} else {
   				countByState[state] = 1;
   			}
   			
   		   	var marker = new google.maps.Marker({
   				position: latLng,
   				title: name,
   				icon: 'img/spiritmarkerround.png'
   			});
   			stationMarkers.push(marker);
   		
   			bounds.extend(latLng);      	
      		
      		(function(infoDiv, marker) {
        		google.maps.event.addListener(marker, 'click', function() {
          			if (!infowindow) {
            			infowindow = new google.maps.InfoWindow();
          			}          
          			
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
		
		function addStateClusters() {
			if (currentState == "CLUSTER") {
				return;
			}
			currentState = "CLUSTER";
			if (infowindow) {
				infowindow.close();
			}
			
			if (!stateMarkers) {
				stateMarkers = [];
				for (state in countByState) {
					var marker = new google.maps.Marker({
   						position: stateCenters[state],
   						title: state + ": " + countByState[state] + " stations",
   						icon: 'http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/marker' + countByState[state] + '.png'
   					});
   					
   					(function(marker) {
        				google.maps.event.addListener(marker, 'click', function() {
          					map.setCenter(marker.getPosition());
          					map.setZoom(6);
        				});
					})(marker);
			
   					stateMarkers.push(marker);
				}
			}
			clearIndividualStationMarkers();
			for (var i in stateMarkers) {
				stateMarkers[i].setMap(map);
			}
		}
		
		function addIndividualStationMarkers() {
			if (currentState == "INDIVIDUAL") {
				return;
			}
			currentState = "INDIVIDUAL";
			clearStateMarkers();
			for (var i in stationMarkers) {
				stationMarkers[i].setMap(map);
			}
		}
		
		function clearStateMarkers() {
    		for(var i in stateMarkers){
    			stateMarkers[i].setMap(null);
   			}
		};
		
		function clearIndividualStationMarkers() {
			for(var i in stationMarkers){
    			stationMarkers[i].setMap(null);
   			}
		}
   	
    	$.getJSON('data/spirit.geojson', function(json) {
   			jQuery.each(json.features, processGeoJson);
   			map.fitBounds(bounds);
   			addStateClusters();
   			google.maps.event.addListener(map, 'zoom_changed', function() {
    			if (map.getZoom() >= 6) {
    				addIndividualStationMarkers();
    			} else {
    				addStateClusters();
    			}
 			});
   		});
   		
	}
})();
