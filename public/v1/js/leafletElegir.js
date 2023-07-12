// Y establecer el punto donde se iniciará el mapa
// Los parametros de setView son ([Latitud, Longitud], zoom)
var map = L.map('map').setView([6.164065, -75.589371], 13);
//var map = L.map('map').fitWorld();
map.locate({setView: true, maxZoom: 16});

// Establecer tile (skin o aspecto) del mapa
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Crear función de clic
map.on('click', function(event) {
    var latlng = event.latlng;
    var latitude = latlng.lat;
    console.log("Latitude"+latitude);
    var longitude = latlng.lng;
    console.log("Longitude"+longitude);

    // Establecer la latitud en el campo
    var campoLatitude = document.getElementById('paseoLatitude');
    campoLatitude.value = latitude;
// Establecer la longitud en el campo
    var campoLongitude = document.getElementById('paseoLongitude');
    campoLongitude.value = longitude;    

    //Obtener ubicación
    //map.locate({setView: true, maxZoom: 17});

    //Error cuando no se obtiene la ubicación
    function onLocationError(e) {
        alert(e.message);
    }
    map.on('locationerror', onLocationError);
});

//Función de onclick
var popup2 = L.popup();

function onMapClick(e) {
popup2
    .setLatLng(e.latlng)
    .setContent("Hiciste click en " + e.latlng.lat.toString() + ", " + e.latlng.lng.toString())
    .openOn(map);
}

map.on('click', onMapClick);

// Mostrar lugares recomendados
if (lugaresRecomendados != undefined){

    // Creación de icono
    var hojaVerde = L.icon({
        iconUrl: '../img/arbol.png',
        shadowUrl: '../img/sombraArbol.png',

        iconSize:     [50, 47], // Tamaño del icono
        shadowSize:   [40, 38], // Tamaño de la sombra
        iconAnchor:   [11, 47], // Punto del icono que se corresponde con el punto del marcador
        shadowAnchor: [0, 40],  // Lo mismo para la sombra
        popupAnchor:  [0, -76] // Punto donde el popup se abre en relación al punto del marcador
    });

    // Renderización de marcadores de lugares recomendados
    lugaresRecomendados.forEach((lugar) => {
        L.marker([lugar.latitud, lugar.longitud], {icon: hojaVerde}).addTo(map);
    }) 
}else{
    console.log("No hay que renderizar lugares recomendados")
}