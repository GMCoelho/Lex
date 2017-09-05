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
$("#meuModal").on('hide.bs.modal', function () {
	if(conf == false){
		newMarker.setOpacity(0.5);	
	}
});

function editar(){
	conf = false;
	newMarker.setOpacity(0.5);
	toastr.options = {
			  "closeButton": false,
			  "debug": true,
			  "newestOnTop": true,
			  "progressBar": false,
			  "positionClass": "toast-top-center",
			  "preventDuplicates": false,
			  "onclick": null,
			  "showDuration": "300",
			  "hideDuration": "1000",
			  "timeOut": "5000",
			  "extendedTimeOut": "5000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}
	toastr.info("para editar a localização você pode arrastar o marcador antigo ou selecionar outro local!", "Dica: ");
}

function cadastrar(){
	if(newMarker != null && conf == true){
		mymap.removeLayer(newMarker);
		toastr.options = {
				  "closeButton": false,
				  "debug": true,
				  "newestOnTop": true,
				  "progressBar": false,
				  "positionClass": "toast-top-center",
				  "preventDuplicates": false,
				  "onclick": null,
				  "showDuration": "300",
				  "hideDuration": "1000",
				  "timeOut": "5000",
				  "extendedTimeOut": "5000",
				  "showEasing": "swing",
				  "hideEasing": "linear",
				  "showMethod": "fadeIn",
				  "hideMethod": "fadeOut"
				}
		toastr.success("Sua colaboração sera validada e aparecerá no mapa em breve", "Obrigado!");
	}
	else{
		
		toastr.options = {
				  "closeButton": false,
				  "debug": true,
				  "newestOnTop": true,
				  "progressBar": false,
				  "positionClass": "toast-top-center",
				  "preventDuplicates": false,
				  "onclick": null,
				  "showDuration": "300",
				  "hideDuration": "1000",
				  "timeOut": "5000",
				  "extendedTimeOut": "5000",
				  "showEasing": "swing",
				  "hideEasing": "linear",
				  "showMethod": "fadeIn",
				  "hideMethod": "fadeOut"
				}
		toastr.warning(" você precisa selecionar a localização do posto no mapa.", "Atenção:");
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
			conf = true;
			staticMarker = false;
			newMarker.setOpacity(0.5);
			mymap.off('click', onMapClick);
		});
		newMarker.on('dragend', function(e){
			setInterval(function() {
				mymap.on('click', onMapClick);
			}, 10);
			newMarker.setOpacity(1);
			var newpos = newMarker.getLatLng();
			abreModalCadastro(newpos);
			newMarker.bindTooltip(
				"Latitude: " + newpos.lat.toString() +
				" Longitude: " + newpos.lng.toString()
				).openTooltip();
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
	tituloModal.innerHTML = "Localização: <br/>Lat: " + pos.lat.toString() + "</br>Lon: " + pos.lng.toString();
	$('#meuModal').modal('show');
}
