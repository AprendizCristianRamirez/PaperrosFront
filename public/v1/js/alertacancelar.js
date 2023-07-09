const btnCancelar = document.querySelector("input[type='submit']");

btnCancelar.addEventListener("click", (event) => {
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
