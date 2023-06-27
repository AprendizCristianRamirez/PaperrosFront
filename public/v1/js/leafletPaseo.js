//mapa: Cantidad de mapas generados en el front con el id "mapa"+mapa ej: "mapa0", "mapa1", "mapa2", "mapa3"...
//mapaData: Array que contiene la info de los paseos, se accede a ella usando mapaData, posición y propiedad. Ej: mapaData[3].descripcion

for (i = 0; i < mapa; i++){
    // Asignarle un mapa a cada etiqueta con id map
    let mapId = 'map'+i;
    
    // Y establecer el punto donde se iniciará el mapa
    // Los parametros de setView son ([Latitud, Longitud], zoom)
    var map = L.map(mapId).setView([mapaData[i].destino._latitude, mapaData[i].destino._longitude], 14);

    // Establecer tile (skin o aspecto) del mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //Añadir area del paseo
    var circle = L.circle([mapaData[i].destino._latitude, mapaData[i].destino._longitude], {
        color: 'none',
        fillColor: '#a47559',
        fillOpacity: 0.4,
        radius: 300
    }).addTo(map);
    
    //Asignar popups
    circle.bindPopup(mapaData[i].nombre_destino);

    //Crear función de clic
    map.on('click', function(event) {
    var latlng = event.latlng;
    var latitude = latlng.lat;
    console.log("Latitude"+latitude);
    var longitude = latlng.lng;
    console.log("Longitude"+longitude);

    // Set the value of the target div with the clicked location
    var targetDiv = document.getElementById('locacion'+i);
    //targetDiv.innerHTML = ('Latitude: ' + latitude + ', Longitude: ' + longitude);
    targetDiv.innerHTML = (latlng);
  });
}

//Popup flotante
/*var popup = L.popup()
    .setLatLng([6.17591, -75.6])
    .setContent("I am a standalone popup.")
    .openOn(map);

//Función de onclick
var popup2 = L.popup();

function onMapClick(e) {
    popup2
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);*/