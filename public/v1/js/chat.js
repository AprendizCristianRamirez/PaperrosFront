//Configuración de firebase
const firebaseConfig = {
    apiKey: "AIzaSyALJKR35EG30on83uQap3Q7Dfv0T3vbK1E",
    authDomain: "paperros-41ac7.firebaseapp.com",
    databaseURL: "https://paperros-41ac7-default-rtdb.firebaseio.com",
    projectId: "paperros-41ac7",
    storageBucket: "paperros-41ac7.appspot.com",
    messagingSenderId: "909088774674",
    appId: "1:909088774674:web:a63a0e3a8f709c5c8716cb",
    measurementId: "G-TX82FTKS5R"
};

//Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Controlador para enviar un mensaje
async function enviarMensaje(req, res) {
    try {
        const { enviador, mensaje, usuario1, usuario2 } = req.body;

        const chatRef = db.collection('chats').doc(usuario1.id + '_' + usuario2.id);
        const mensajeData = {
            enviador,
            mensaje,
            fecha: new Date().toISOString(),
        };

        // Agregar el nuevo mensaje al array de mensajes existente
        await chatRef.update({
            mensajes: Firestore.FieldValue.arrayUnion(mensajeData),
            ultimo_mensaje: mensajeData,
        });

        res.status(200).json({ message: 'Mensaje enviado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al enviar el mensaje' });
    }
}

app.post('/api/enviar-mensaje', enviarMensaje);

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});