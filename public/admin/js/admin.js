const usuarios = [
    { email, nombre: "Usuario 1", correo: "usuario1@example.com" },
    { id: 2, nombre: "Usuario 2", correo: "usuario2@example.com" },
    { id: 3, nombre: "Usuario 3", correo: "usuario3@example.com" },
];

// Obtener la tabla de usuarios
const userTable = document.getElementById("userTable");

// Generar filas de usuarios en la tabla
usuarios.forEach((usuario) => {
    const row = userTable.insertRow();
    row.innerHTML = `
      <td>${usuario.id}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.correo}</td>
    `;
});