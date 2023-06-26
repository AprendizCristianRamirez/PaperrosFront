/*



*/
var map = L.map('map').setView([6.164065, -75.589371], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Añadir marcador
var marker = L.marker([6.17591, -75.59174]).addTo(map);
var marker = L.marker([6.2, -75.6]).addTo(map);

//Añadir area
var circle = L.circle([6.164065, -75.589371], {
    color: 'brown',
    fillColor: '#a47559',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

//Añadir poligono
var polygon = L.polygon([
    [6.27591, -75.62],
    [6.27591, -75.69],
    [6.27991, -75.7]
]).addTo(map);

//Asignar popups
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("Area del paseo");
polygon.bindPopup("I am a polygon.");

//Popup flotante
var popup = L.popup()
    .setLatLng([6.17591, -75.6])
    .setContent("I am a standalone popup.")
    .openOn(map);

//Función de onclick
var popup2 = L.popup();

function onMapClick(e) {
    popup2
        .setLatLng(e.latlng)
        .setContent("Hiciste click en:  " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


//OBTENER UBICACIÓN ACTUAL

map.locate({setView: true, maxZoom: 16});

    
function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}
map.on('locationerror', onLocationError);