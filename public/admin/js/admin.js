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

// Función para eliminar un usuario
function deleteUser(userId) {
    fetch('/usuarios/' + userId, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Realiza las acciones necesarias después de eliminar al usuario
        })
        .catch(error => {
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
            deleteUser(userId);
            Swal.fire(
                'Borrado',
                'El usuario ha sido eliminado',
                'success'
            );
        }
    });
}