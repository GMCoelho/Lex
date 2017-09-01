var mymap = L.map('mapa').setView([-20.35199, -40.29699], 16);
			L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
				maxZoom: 18
			}).addTo(mymap);
			
			var cont = 0;
			var newMarker = null;
			var markers = new Array();
			var conf = false;
			function editarLoc(){
				console.log("EDITAR LOCALIZAÇÃO -> CONF = FALSE");
				conf = false;
				mymap.removeLayer(newMarker);
			}
			function cadastrar(){
				if(newMarker != null && conf == true){
					mymap.removeLayer(newMarker);
					alert("Posto cadastrado!");
				}
				else{
					alert("Por favor, selecione novamente a localização o posto.");
				}
			}
			function onMapClick(e) {
				//Função para checar posto próximo... THEN:
				if(newMarker != null){
					mymap.removeLayer(newMarker);
				}
				newMarker = L.marker(e.latlng, {opacity: 1}).addTo(mymap);
				newMarker.bindTooltip("Latitude e Longitude: "+
					e.latlng.toString()).openTooltip();
				conf = true;
				abreModalCadastro(e);
				}
			function abreModalCadastro(e) {
				var tituloModal = document.getElementById("PostoLoc");
				var locAux = e.latlng;
				tituloModal.innerHTML = "Posto em: </p>Lat: " + locAux.lat.toString() + "</br>Lon: " + locAux.lng.toString();
				$('#meuModal').modal('show');
			}				

			function cadastrarN(){
				if(newMarker != null){
					alert("Posto(s) cadastrado(s)!");
					$(markers).each(function(){
						this.remove();
					});
				}
				else{
					alert("Você ainda não selecionou a localização do ponto.");
				}
			}
			
			function onMapClickN(e) {
				if(cont == 0){
					newMarker = L.marker(e.latlng, {opacity: 1}).addTo(mymap);
					newMarker.bindTooltip("Latitude e Longitude: "+ e.latlng.toString()).openTooltip();
					markers[cont] = newMarker;
				}
				else{
					markers[cont-1].setOpacity(0.65);
					newMarker = L.marker(e.latlng, {opacity: 1}).addTo(mymap);
					newMarker.bindTooltip("Latitude e Longitude: "+ e.latlng.toString()).openTooltip();	
					markers[cont] = newMarker;
				}
				cont++;
			}

			mymap.on('click', onMapClick);
