//Adiciona o mapa na página no id 'mapa' informado
var mymap = L.map('mapa', { zoomControl:false }).setView([-20.35199, -40.29699], 16);
//Carrega a tile do mapa no objeto 'mymap'
L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
	maxZoom: 18
}).addTo(mymap);

//'http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', << MORREU 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

var newMarker;
var conf = false;
var staticMarker = true;
var edit = false;

$("#meuModal").on('hide.bs.modal', function () {
	if(conf == false && edit == false){
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
		toastr["warning"]("Você não confirmou a localização do posto. Clique novamente no mapa para confirmar.", "Atenção:")
	}
});

$("#confLoc").on('click', function (){
	conf = true;
	edit = false;
	$('#meuModal').modal('hide');
	newMarker.setOpacity(1);
});

$('#editarLoc').on('click', editar);

function editar(){
	conf = false;
	edit = true;
	$('#meuModal').modal('hide');
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
				  "onclick": "abreModalCadastro(newMarker.getLatLng())",
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
			pos = newpos;
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
	abreModalCadastro(e.latlng);
}
function abreModalCadastro(pos) {
	var tituloModal = document.getElementById("PostoLoc");
	tituloModal.innerHTML = "Localização: <br/>Lat: " + pos.lat.toString() + "</br>Lon: " + pos.lng.toString();
	$('#meuModal').modal('show');
	edit = false;
}
