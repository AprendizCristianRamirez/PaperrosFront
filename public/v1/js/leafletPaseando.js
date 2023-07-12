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

// Creación de icono
var perrito = L.icon({
    iconUrl: '../img/perrito.png',
    shadowUrl: '../img/leaf-shadow.png',

    iconSize:     [19, 47], // Tamaño del icono
    shadowSize:   [25, 32], // Tamaño de la sombra
    iconAnchor:   [11, 47], // Punto del icono que se corresponde con el punto del marcador
    shadowAnchor: [2, 31],  // Lo mismo para la sombra
    popupAnchor:  [-3, -76] // Punto donde el popup se abre en relación al punto del marcador
});

mapaData.perro.forEach((element) => {
    let marker = L.marker([element.localizacion._latitude, element.localizacion._longitude]/*, {icon: perrito}*/).addTo(map);
    //L.marker([lugar.latitud, lugar.longitud], {icon: hojaVerde}).addTo(map);
    marker.bindPopup(`<b>${element.nombre_dueno}:</b><br>${element.nombre}<br>${element.nombre}`).openPopup();
})