for (i = 0; i < perroId; i++){
    // Obtener elementos del DOM
    let modal = document.getElementById("modalPerro"+i);
    let btn = document.getElementById("btnAbrirPerro"+i);
    //let btn2 = document.getElementById("btnClose"+i);
    //let input = document.getElementById("myInput"+i);

    // Abrir el modal cuando se hace clic en el botón
    btn.addEventListener("click", function () {
        modal.style.display = "block";
    });

    // Cerrar el modal cuando se hace clic en el botón
    /*btn2.addEventListener("click", function () {
        modal = document.getElementById('btnClose'+i);
        modal.style.display = 'none';
    });*/

    // Cerrar el modal cuando se hace clic fuera de él
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Mostrar la ventana emergente cuando se hace clic en el input
    //input.addEventListener("click", function () {
    //    dropdownContent = document.querySelector(".dropdown-content");
    //    dropdownContent.style.display = "block";
    //});
}