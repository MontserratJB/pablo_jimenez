// Mapa Leaflet
var mapa = L.map('mapid').setView([9.8, -84.25], 7);

// Definición de capas base
var capas_base = {

  // Capa base agregada mediante L.tileLayer y leaflet-providers
  "Stamen.Toner": L.tileLayer.provider('Stamen.Toner'),	
  // Capa base agregada mediante L.tileLayer y leaflet-providers CAPA EXTRA
  "Stamen.Terrain": L.tileLayer.provider('Stamen.Terrain')
}

// Se agregan todas las capas base al mapa
control_capas = L.control.layers(capas_base).addTo(mapa);

// Se activa una capa base del control
capas_base['Stamen.Toner'].addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);

// Capa vectorial de ASP en formato GeoJSON
$.getJSON("https://raw.githubusercontent.com/MontserratJB/pablo_jimenez/master/marcadores/marcadores.geojson", function(geodata) {
  var capa_marcadores = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#013220", 'weight': 1, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Vértice</strong>: " + feature.properties.NOMBRE + "<br>" + "<strong>Dirección</strong>: " + feature.properties.DIRECCION;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_marcadores, 'Marcadores');
});		
