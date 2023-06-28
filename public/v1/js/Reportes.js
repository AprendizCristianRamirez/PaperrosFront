let modalReporte = document.getElementById("modalRep");
let myBtnReporte = document.getElementById("myBtnRep");
let myBtnCerrarReporte = document.getElementById("myBtnCerrarRep");
const btnReporte = document.querySelector("#modalRep input[type='submit']");

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

myBtnCerrarReporte.addEventListener("click", function (event) {
    event.preventDefault();
});

// Evitar el envío del formulario al hacer clic fuera del modal
window.addEventListener("click", function (event) {
    if (event.target == modalReporte) {
        event.preventDefault();
    }
});

btnReporte.addEventListener("click", (event) => {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    Swal.fire({
        title: "¡Información enviada!",
        icon: "success",
        confirmButtonText: "Aceptar"
    }).then((result) => {
        if (result.isConfirmed) {
            modalReporte.style.display = "none";
            location.reload();
        }
    });
});
