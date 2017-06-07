			var mymap = L.map('mapa').setView([-20.35042, -40.34008], 14);
			var map;
			L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
				maxZoom: 18
			}).addTo(mymap);
			
			function onMapClick(e) {
				var marker = L.marker(e.latlng).addTo(mymap);
				var popup = L.popup()
				.setLatLng(e.latlng)
				.setContent("<center>Você clicou aqui!</center></br>(" + e.latlng.toString() + ")")
				.openOn(mymap);
				marker.bindTooltip("Latitude e Longitude: "+ e.latlng).openTooltip();
			}

			mymap.on('click', onMapClick);
				
			//adiciona o marcador no mapa
			var marker = L.marker([51.505, -0.09]).addTo(mymap);
