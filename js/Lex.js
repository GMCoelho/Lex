//Adiciona o mapa na página no id 'mapa' informado
var mymap = L.map('mapa').setView([-20.35199, -40.29699], 16);
//Carrega a tile do mapa no objeto 'mymap'
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18
}).addTo(mymap);

//http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', << MORREU

var newMarker = L.marker([-20.35199, -40.29699], {draggable:'true'}, {opacity: 0});
var conf = false;
var staticMarker = true;
var pos = [-20.35199, -40.29699];

$("#meuModal").on('hide.bs.modal', function () {
	if(conf == false){
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
		toastr["warning"]("Você não confirmou a localização do posto. <br/><a id='confToast'>Clique aqui</a> para confirmar.", "Atenção:")
	}
});
$("#confToast").on('click', abreModalCadastro(null));
$("#confLoc").on('click', function (){
	conf = true;
	$('#meuModal').modal('hide');
	newMarker.setOpacity(1);
});
$('#editarLoc').on('click', editar);

function editar(){
	conf = false;
	$('#meuModal').modal('hide');
	newMarker.setOpacity(0.5);
	toastr.options = {
			  "closeButton": false,
			  "debug": true,
			  "newestOnTop": true,
			  "progressBar": false,
			  "positionClass": "toast-top-center",
			  "preventDuplicates": false,
			  "onclick": abreModalCadastro(newMarker.getLatLng()),
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
	pos = e.latlng;
	abreModalCadastro(pos);
}
function abreModalCadastro(mdPos) {
	if(mdPos == null){
		mdPos = pos;
	}
	var tituloModal = document.getElementById("PostoLoc");
	tituloModal.innerHTML = "Localização: <br/>Lat: " + mdPos.lat.toString() + "</br>Lon: " + mdPos.lng.toString();
	$('#meuModal').modal('show');
}
