$(document).ready(function(){
	$('#colab-wrn').hide();
	$('#colab-scs').hide();
	$('#colab-tip').hide();
});
	//Adiciona o mapa na página no id 'mapa' informado
	var mymap = L.map('mapa').setView([-20.35199, -40.29699], 16);
	//Carrega a tile do mapa no objeto 'mymap'
	L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
		maxZoom: 18
	}).addTo(mymap);

	var cont = 0;
	var newMarker = null;
	var markers = new Array();
	var conf = false;
	var staticMarker = true;

	$('#editarLoc').on('click', function(){
		conf = false;
		newMarker.setOpacity(0.5);
		$('#colab-tip').show();
	});

			function cadastrar(){
				$('#colab-wrn').hide();
				$('#colab-scs').hide();
				$('#colab-tip').hide();
				if(newMarker != null && conf == true){
					mymap.removeLayer(newMarker);
					$('#colab-scs').show();
				}
				else{
					$('#colab-wrn').show();
				}
				conf = false;
			}
			function onMapClick(e) {
				//Função para checar posto próximo... THEN:
				if(newMarker != null){
					staticMarker = true;
					newMarker.setOpacity(1);
					newMarker.on('dragend', function(e){
						newMarker.bindTooltip(
						"Latitude: " + e.latlng.lat.toString() +
						" Longitude: " + e.latlng.lng.toString()
						).openTooltip();
						conf = true;
						staticMarker = false;
						abreModalCadastro(e);
					});
					if(staticMarker == true){
						mymap.removeLayer(newMarker);
					}
				}
				newMarker = L.marker(e.latlng, {draggable:'true'}, {opacity: 1}).addTo(mymap);
				setMarker(e);
				}


			function setMarker(e){
				newMarker.bindTooltip(
					"Latitude: " + e.latlng.lat.toString() +
					" Longitude: " + e.latlng.lng.toString()
					).openTooltip();
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
