const BtnInforme = document.getElementById("BtnInforme");

BtnInforme.addEventListener("click", () => {
    Swal.fire({
        title: "¡Información enviada!",
        icon: "success",
        confirmButtonText: "Aceptar"
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
        }
    });
});