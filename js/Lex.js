var ready = false;
var htmlBody = document.getElementById("corpo");
htmlBody.innerHTML = "<img src="30.svg">"
$(document).ready(function() { 
	ready = true;
	htmlBody.innerHTML = "<div class="container">
	<div id="meuModal" class="modal fade" role="dialog">
	  <div class="modal-dialog modal-sm">

	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">&times;</button>
		      <center><h5 class="modal-title" id="PostoLoc"></h5></center>
	      </div>
	      <div class="modal-body" style="font-family: 'Bubbler One', sans-serif; font-weight: bold !important;">
		<p>
		<form>
			  <div class="form-group">
			    <label for="nomePosto">Nome:</label>
			    <input type="text" class="form-control" id="nomePosto" placeholder="Exemplo: Posto ABC">
			  </div>
			  <div class="form-group">
				  <center><h5>Informe ao menos um preço abaixo:</h5></center></p>
			    <label for="precoGC">Gasolina Comum (GC):</label>
			    <input type="text" class="form-control" id="precoGC">
			
			    <label for="precoGA">Gasolina Aditivada (GA):</label>
			    <input type="text" class="form-control" id="precoGA">
			
			    <label for="precoEt">Etanol (Et):</label>
			    <input type="text" class="form-control" id="precoEt">
			
			    <label for="precoDs">Diesel (Ds):</label>
			    <input type="text" class="form-control" id="precoDs">
			
			    <label for="precoGN">Gás Natural Veicular (GNV):</label>
			    <input type="text" class="form-control" id="precoGN">
			  </div>
			  <div class="checkbox">
			    <label><input type="checkbox"> Eu recomendo esse Posto!</label>
			  </div>
			  <!--<button type="submit" class="btn btn-default">Submit</button>-->
		</form>
		</p>
	      </div>
	      <div class="modal-footer">
		<button type="button" class="btn btn-success" data-dismiss="modal">Confirmar</button>
		<a type="button" class="btn btn-warning" data-dismiss="modal" id="editarLoc">Editar Localização</a>
	      </div>
	    </div>

	  </div>
	</div>
		<div class="posicao">Informe a localização do posto no mapa:</div>
		<div id="mapa" class="bordamapa"></div>
		
		<div id="botao">
			<div class="meio">
				<center>
					<a href="javascript: cadastrar();" class="botaoCadastrar btn btn-info btn-lg"><i class='fa fa-plus' style="font-size: large;"></i> Cadastrar</a>
				</center>
			</div>
		</div>
	</div>"
});
var mymap = L.map('mapa').setView([-20.35199, -40.29699], 16);
			L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
				maxZoom: 18
			}).addTo(mymap);
			
			var cont = 0;
			var newMarker = null;
			var markers = new Array();
			var conf = false;

			$('#editarLoc').on('click', function(){
				conf = false;
				newMarker.setOpacity(0.5);
			});
			function cadastrar(){
				if(newMarker != null && conf == true){
					mymap.removeLayer(newMarker);
					alert("Posto cadastrado!");
				}
				else{
					alert("Por favor, selecione uma localização o posto.");
				}
			}
			function onMapClick(e) {
				//Função para checar posto próximo... THEN:
				if(newMarker != null){
					mymap.removeLayer(newMarker);
				}
				newMarker = L.marker(e.latlng, {opacity: 1}).addTo(mymap);
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
