let modalReporte = document.getElementById("modalRep");
let myBtnReporte = document.getElementById("myBtnRep");
let myBtnCerrarReporte = document.getElementById("myBtnCerrarRep");

// Abrir el modal cuando se hace clic en el botón
myBtnReporte.addEventListener("click", function () {
    modalReporte.style.display = "flex";
});

myBtnCerrarReporte.addEventListener("click", function () {
    modalReporte.style.display = "none";
});

// Cerrar el modal cuando se hace clic fuera de él
window.addEventListener("click", function (event) {
    if (event.target == modalReporte) {
        modalReporte.style.display = "none";
    }
});
