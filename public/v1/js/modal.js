// Obtener elementos del DOM
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn2");
var input = document.getElementById("myInput");

// Abrir el modal cuando se hace clic en el botón
btn.addEventListener("click", function () {
    modal.style.display = "block";
});

// Cerrar el modal cuando se hace clic en el botón
btn2.addEventListener("click", function () {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
});

// Cerrar el modal cuando se hace clic fuera de él
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Mostrar la ventana emergente cuando se hace clic en el input
input.addEventListener("click", function () {
    var dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.style.display = "block";
});