(function() {
	window.onload = function() {
		var stateCenters = {};
		stateCenters['AL'] = new google.maps.LatLng(32.7948233460272,-86.8263454497332);
		stateCenters['AK'] = new google.maps.LatLng(64.3171717929199,-152.571308132839);
		stateCenters['AZ'] = new google.maps.LatLng(34.2916834221835,-111.664591949232);
		stateCenters['AR'] = new google.maps.LatLng(34.8979530772317,-92.4338014912365);
		stateCenters['CA'] = new google.maps.LatLng(37.2417411000423,-119.601147078817);
		stateCenters['CO'] = new google.maps.LatLng(38.9972631547834,-105.547857280633);
		stateCenters['CT'] = new google.maps.LatLng(41.6180326565837,-72.7247699791);
		stateCenters['DE'] = new google.maps.LatLng(38.9951144260073,-75.5005536711258);
		stateCenters['FL'] = new google.maps.LatLng(28.6586764601475,-82.4955741421186);
		stateCenters['GA'] = new google.maps.LatLng(32.6550957052741,-83.4542258116492);
		stateCenters['HI'] = new google.maps.LatLng(20.2401578536914,-156.326917860547);
		stateCenters['ID'] = new google.maps.LatLng(44.3858954726855,-114.661865415542);
		stateCenters['IL'] = new google.maps.LatLng(40.0640001695085,-89.2037678267293);
		stateCenters['IN'] = new google.maps.LatLng(39.9127401204667,-86.2761573203861);
		stateCenters['IA'] = new google.maps.LatLng(42.0759891389773,-93.5010908992209);
		stateCenters['KS'] = new google.maps.LatLng(38.4826574728393,-98.3832572332682);
		stateCenters['KY'] = new google.maps.LatLng(37.5265035728688,-85.2903664199658);
		stateCenters['LA'] = new google.maps.LatLng(31.0957346447301,-92.0291541159725);
		stateCenters['ME'] = new google.maps.LatLng(45.3894093487898,-69.2342803140978);
		stateCenters['MD'] = new google.maps.LatLng(39.0640555384767,-76.8193852682105);
		stateCenters['MA'] = new google.maps.LatLng(42.2568345174596,-71.80258992883);
		stateCenters['MI'] = new google.maps.LatLng(44.3365484429102,-85.4386025294334);
		stateCenters['MN'] = new google.maps.LatLng(46.315646568988,-94.3059456842785);
		stateCenters['MS'] = new google.maps.LatLng(32.7591641085257,-89.6640053796168);
		stateCenters['MO'] = new google.maps.LatLng(38.3639901274756,-92.4801886377418);
		stateCenters['MT'] = new google.maps.LatLng(47.0322664572934,-109.652533686894);
		stateCenters['NE'] = new google.maps.LatLng(41.5231582790057, -99.8078006001403);
		stateCenters['NV'] = new google.maps.LatLng(39.3520158009473,-116.650735151808);
		stateCenters['NH'] = new google.maps.LatLng(43.6851910338169, -71.577769589032);
		stateCenters['NJ'] = new google.maps.LatLng(40.1983130309155,-74.6766277762304);
		stateCenters['NM'] = new google.maps.LatLng(34.4234110071301,-106.102403151381);
		stateCenters['NY'] = new google.maps.LatLng(42.9466608265549, -75.5122574227018);
		stateCenters['NC'] = new google.maps.LatLng(35.5472650672799,-79.4013155346895);
		stateCenters['ND'] = new google.maps.LatLng(47.4460775747168, -100.470755004497);
		stateCenters['OH'] = new google.maps.LatLng(40.2875354201742,-82.7873906731324);
		stateCenters['OK'] = new google.maps.LatLng(35.583978004302,-97.5094585942961);
		stateCenters['OR'] = new google.maps.LatLng(43.9315095486322, -120.55462738557);
		stateCenters['PA'] = new google.maps.LatLng(40.8748890585198,-77.8028454187969);
		stateCenters['RI'] = new google.maps.LatLng(41.6817724921721,-71.5610444257682);
		stateCenters['SC'] = new google.maps.LatLng(33.9187422703577 ,-80.9010200865815);
		stateCenters['SD'] = new google.maps.LatLng(44.4333181443813,-100.235288914651);
		stateCenters['TN'] = new google.maps.LatLng(35.8467078879312,-86.3340670065268);
		stateCenters['TX'] = new google.maps.LatLng(31.4911603586956,-99.3520963926805);
		stateCenters['UT'] = new google.maps.LatLng(39.3225122931614,-111.676053595522);
		stateCenters['VT'] = new google.maps.LatLng(44.072240587832,-72.660656242184);
		stateCenters['VA'] = new google.maps.LatLng(37.5186355576459,-78.8515944401178);
		stateCenters['WA'] = new google.maps.LatLng(47.3767619529735,-120.428027450366);
		stateCenters['WV'] = new google.maps.LatLng(38.6412110051568,-80.614059565661);
		stateCenters['WI'] = new google.maps.LatLng(44.6331178864174,-90.006191227598);
		stateCenters['WY'] = new google.maps.LatLng(42.9982837598069,-107.553081008537);
		
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
    	var stateOutlinesLayer;
    	
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
			
			stateOutlinesLayer = new google.maps.KmlLayer('http://pineapplestreetsoftware.com/spirit/data/us_states9.kml');
			
			stateOutlinesLayer.setMap(map);
			
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
   			stateOutlinesLayer.setMap(null);
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
