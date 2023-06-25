// Y establecer el punto donde se iniciará el mapa
// Los parametros de setView son ([Latitud, Longitud], zoom)
var map = L.map('map').setView([6.164065, -75.589371], 12);

// Establecer tile (skin o aspecto) del mapa
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Crear función de clic
map.on('click', function(event) {
    var latlng = event.latlng;
    var latitude = latlng.lat;
    console.log("Latitude"+latitude);
    var longitude = latlng.lng;
    console.log("Longitude"+longitude);

    // Set the value of the target div with the clicked location
    var campoLatitude = document.getElementById('paseoLatitude');
    campoLatitude.value = latitude;

    var campoLongitude = document.getElementById('paseoLongitude');
    campoLongitude.value = longitude;    
});

//Popup flotante
/*var popup = L.popup()
.setLatLng([6.17591, -75.6])
.setContent("I am a standalone popup.")
.openOn(map);*/

//Función de onclick
var popup2 = L.popup();

function onMapClick(e) {
popup2
    .setLatLng(e.latlng)
    .setContent("Hiciste click en " + e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);