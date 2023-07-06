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

// Función del formulario
async function eliminarPerro(idPerro) {

    // Datos del formulario
    const id = document.querySelector('#id').value;
    const perro = JSON.parse(document.querySelector('#perro' + idPerro).value);

    // Inserción del perro en el array de perros del usuario
    try {
        await db.collection('usuario').doc(id).update({
            // arrayUnion() funciona insertando el dato dentro del parametro al array indicado (perros)
            perros: firebase.firestore.FieldValue.arrayRemove(perro)
        });
        window.location.href = "/v1/dueno/MisPerros";
    } catch (error) {
        console.error('Error al eliminar:', error);
    }
};