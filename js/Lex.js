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

	var newMarker;
	var conf = false;
	var staticMarker = true;

	$('#editarLoc').on('click', editar);
	$('#modalClose').on('click', editar);

function editar(){
	conf = false;
	newMarker.setOpacity(0.5);
	$('#colab-tip').show();
}

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

mymap.on('click', 
	function onMapClick(e){
	var pos = e.latlng;
	
	if(mymap.hasLayer(newMarker)){
		mymap.removeLayer(newMarker);
	}
	
	newMarker = L.marker(pos, {draggable:'true'}, {opacity: 1});
	staticMarker = true;
		newMarker.on('dragstart', function(e){
			newMarker.setOpacity(1);
			conf = true;
			staticMarker = false;
			mymap.off('click', onMapClick);
		});
		newMarker.on('dragend', function(e){
			setInterval(function() {
				mymap.on('click', onMapClick);
			}, 10);
			abreModalCadastro(pos);
			//bindtooltip...
		});
		if(staticMarker == true){
			newMarker.addTo(mymap);
			setMarker(e);
		}
});

/*newMarker.on('dragstart', function(e){
	mymap.off('click', onMapClick);
	newMarker.setOpacity(1);
	conf = true;
	staticMarker = false;
});*/

function setMarker(e){
	newMarker.bindTooltip(
		"Latitude: " + e.latlng.lat.toString() +
		" Longitude: " + e.latlng.lng.toString()
		).openTooltip();
	conf = true;
	abreModalCadastro(e.latlng);
}
function abreModalCadastro(pos) {
	var tituloModal = document.getElementById("PostoLoc");
	tituloModal.innerHTML = "Posto em: </p>Lat: " + pos.lat.toString() + "</br>Lon: " + pos.lng.toString();
	$('#meuModal').modal('show');
}
