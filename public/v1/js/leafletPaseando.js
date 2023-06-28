//mapaData: Array que contiene la info de los paseos, se accede a ella usando mapaData, posición y propiedad. Ej: mapaData[3].descripcion

// Y establecer el punto donde se iniciará el mapa
// Los parametros de setView son ([Latitud, Longitud], zoom)
var map = L.map('map').setView([mapaData.destino._latitude, mapaData.destino._longitude], 14);

// Establecer tile (skin o aspecto) del mapa
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Añadir area del paseo
var circle = L.circle([mapaData.destino._latitude, mapaData.destino._longitude], {
    color: 'none',
    fillColor: '#a47559',
    fillOpacity: 0.4,
    radius: 300
}).addTo(map);

//Asignar popups
circle.bindPopup(mapaData.nombre_destino);

mapaData.perro.forEach((element) => {
    let marker = L.marker([element.localizacion._latitude, element.localizacion._longitude]).addTo(map);
    marker.bindPopup(`<b>${element.nombre_dueno}:</b><br>${element.nombre}`).openPopup();
})