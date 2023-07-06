document.addEventListener('DOMContentLoaded', function() {
    const btnBorrar = document.getElementById('btnBorrar');
  
        btnBorrar.addEventListener('click', function(event) {
          event.preventDefault(); // Evitar el envío tradicional del formulario
      
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              eliminarPerro(); // Llamar a la función eliminarPerro() después de la confirmación
            }
          });
        });
      });

      
      document.addEventListener('DOMContentLoaded', function() {
        const btnBorrarPaseo = document.getElementById('btnBorrarPaseo');
  
  btnBorrarPaseo.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Esta opcion no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Borrado!',
          'Se ha eliminado correctamente',
          'success',
          <a href="/v1/dueno/BorrarPaseo/<%= element.id %>"></a>
        ); // Llamar a la función eliminarPerro() después de la confirmación
      }
    });
  });
});