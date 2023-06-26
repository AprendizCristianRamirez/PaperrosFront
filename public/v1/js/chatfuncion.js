function openChat(userId) {
    // Aquí puedes cargar el chat correspondiente al usuario seleccionado
    // Puedes utilizar AJAX, fetch o cualquier otra técnica para obtener los mensajes del chat y mostrarlos en el chat window (div con id "chat")
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    // Aquí puedes enviar el mensaje a través de una solicitud al servidor y actualizar el chat en tiempo real

    // Agregar el mensaje al chat window
    const chatWindow = document.getElementById('chat');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
    <div class="message-sender">
        <img src="<%= foto %>" alt="User Avatar">
    </div>
    <div class="message-content">${message}</div>
    `;
    chatWindow.appendChild(messageElement);

    // Limpiar el campo de texto
    messageInput.value = '';
}