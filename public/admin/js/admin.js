// Función para mostrar la información del usuario en el modal
function showUserInfo(userId) {
    var modal = document.getElementById('myModal_' + userId);
    modal.style.display = "block";
}

// Función para cerrar el modal
function closeModal(userId) {
    var modal = document.getElementById('myModal_' + userId);
    modal.style.display = "none";
}

function deleteUser(userId) {
    // Realiza una solicitud al servidor para eliminar el usuario con el ID proporcionado
    // Utiliza la ruta adecuada para la eliminación de usuarios, por ejemplo, '/deleteUser/' + userId
    fetch('/deleteUser/:' + userId, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            // Realiza las acciones necesarias después de eliminar al usuario
            console.log(data); // Puedes mostrar una respuesta o realizar otras acciones
        })
        .catch(error => {
            // Maneja el error en caso de que ocurra
            console.error('Error al eliminar al usuario:', error);
        });
}

// Función para confirmar y eliminar un usuario
function confirmDelete(userId) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteUser(userId); // Llama a la función deleteUser con el id del usuario como argumento
            Swal.fire(
                'Borrado',
                'El usuario ha sido eliminado',
                'success'
            );
        }
    });
}
