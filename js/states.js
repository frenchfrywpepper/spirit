(function() {
	window.onload = function() {
		var spiritState = {
				fillColor: "#ed3a33",
				fillOpacity: "0.75",
				strokeColor: "#006bbb",
				strokeOpacity: "1",
				strokeWeight: "1"
		};
		
		var nonSpiritState = {
				fillColor: "#006bbb",
				fillOpacity: "0.75",
				strokeColor: "#006bbb",
				strokeOpacity: "1",
				strokeWeight: "1"
		};
		
		var mapDiv = document.getElementById('map');
		
		var infoDiv = document.getElementById('info');
      	var siteNameElem = document.getElementById('siteName');
		var streetElem = document.getElementById('street');
		var cityStateElem = document.getElementById('cityState');
		var licenseeElem = document.getElementById('licensee');
		var siteNumElem = document.getElementById('siteNum');
		
		var latlng = new google.maps.LatLng(37.09, -95.71);
	    
    	var options = {
      		center: latlng,
      		zoom: 4, // guesstimate for initial zoom level
      		mapTypeId: google.maps.MapTypeId.ROADMAP
    	};
    
    	var map = new google.maps.Map(mapDiv, options);
    	var mapBounds = new google.maps.LatLngBounds();
    	
    	var countsByState = {};
    	var statePolys = [];
    	var stationMarkers = [];
    	var infowindow;
    	
    	function readSpiritStation(idx, value) {
    		var lng = value.geometry.coordinates[0];
   			var lat = value.geometry.coordinates[1];
   			var name = value.properties.siteName;
//   			var formattedAddress = value.properties.formattedAddress;
   			var address = value.properties.address;
   			var city = value.properties.city;
   			var state = value.properties.state;
   			var zip = value.properties.zip;
   			var licensee = value.properties.licensee;
   			var siteNum = value.properties.num;
   			var latLng = new google.maps.LatLng(lat, lng);
   			if (countsByState[state]) {
   				countsByState[state]++;
   			} else {
   				countsByState[state] = 1;
   			}
   			
   			var marker = new google.maps.Marker({
   				position: latLng,
   				title: name,
   				icon: 'img/spiritmarkerround.png'
   			});
   			stationMarkers.push(marker);
   			
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
		};
		
		function createPolygons(geometry, opts) {	
			if (geometry.type == "Point") return;
			if (geometry.type == "GeometryCollection") {
				var geometries = geometry.geometries;
				for (var idx in geometries) {
					createPolygons(geometries[idx], opts);
				}
				return;
			}
			if (geometry.coordinates && geometry.type == 'Polygon') {
				var paths = [];
				var polyBounds = new google.maps.LatLngBounds();
				for (var i = 0; i < geometry.coordinates.length; i++){
					var path = [];
					for (var j = 0; j < geometry.coordinates[i].length; j++){
						var ll = new google.maps.LatLng(geometry.coordinates[i][j][1], geometry.coordinates[i][j][0]);
						path.push(ll);
						mapBounds.extend(ll);
						polyBounds.extend(ll);
					}
					paths.push(path);
				}
				opts.paths = paths;
				var poly = new google.maps.Polygon(opts);
				poly.setMap(map);
				statePolys.push(poly);
				
				google.maps.event.addListener(poly, 'click', function(event) {
				    map.fitBounds(polyBounds);
				});
				return;
			}
			console.warn("unexpected", geometry);
		}
		
		function hideStatePolys() {
			for (var idx in statePolys) {
				statePolys[idx].setMap(null);
			}
		}
		
		function showStatePolys() {
			for (var idx in statePolys) {
				statePolys[idx].setMap(map);
			}
		}
		
		function showStationMarkers() {
			for(var i in stationMarkers){
    			stationMarkers[i].setMap(map);
   			}
		}
		
		function hideStationMarkers() {
			if (infowindow) infowindow.close();
			for(var i in stationMarkers){
    			stationMarkers[i].setMap(null);
   			}
		}
		
		function readState(idx, value) {
			var abbreviation = value.properties.abbreviation;
			if (!countsByState[abbreviation]) {
				return;
			}
			var opts = countsByState[abbreviation] ? spiritState : nonSpiritState;
			var coords = [];
			var geometryCollection = value.geometry.geometries;
			for (var idx in geometryCollection) {
				createPolygons(geometryCollection[idx], opts);
			}
		}
		
		$.ajax({
			type: 'GET',
			dataType: 'jsonp',
			url: "http://pineapplestreetsoftware.com/spirit/data/spirit.jsonp?callback=?&cache=true",
			jsonpCallback: 'spiritCallback',
			cache: true,
			error: function(arg1, arg2) {
				console.warn('an error occurred!', arg1, arg2);
			},
			success: function(json) {
				jQuery.each(json.features, readSpiritStation);
			}
		});
		    	
//    	$.getJSON('data/spirit.geojson', function(json) {
//   			jQuery.each(json.features, readSpiritStation);
//   		});
    	
		$.ajax({
			type: 'GET',
			dataType: 'jsonp',
			url: "http://pineapplestreetsoftware.com/spirit/data/us_states.jsonp?callback=?&cache=true",
			jsonpCallback: 'statesCallback',
			cache: true,
			error: function(arg1, arg2) {
				console.warn('an error occurred!', arg1, arg2);
			},
			success: function(json) {
				jQuery.each(json.features, readState);
   				map.fitBounds(mapBounds);
    			google.maps.event.addListener(map, 'zoom_changed', function() {
   					if (map.getZoom() >= 6) {
    					hideStatePolys();
    					showStationMarkers();
    				} else {
    					hideStationMarkers();
    					showStatePolys();
    				}
 				});
			}
		});
		
//    	$.getJSON('data/us_states.geojson',
//    	    function(json) {
//    	        jQuery.each(json.features, readState);
//   				map.fitBounds(mapBounds);
//    			google.maps.event.addListener(map, 'zoom_changed', function() {
//   					if (map.getZoom() >= 6) {
//    					hideStatePolys();
//    					showStationMarkers();
//    				} else {
//    					hideStationMarkers();
//    					showStatePolys();
//    				}
// 				});
//   			}
//   		);
	};
})();