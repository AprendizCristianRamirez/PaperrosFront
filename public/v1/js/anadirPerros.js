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
const form = document.getElementById('anadirPerro');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Datos del formulario
    const id = document.querySelector('#id').value;
    const nombre = document.querySelector('#nombre').value;
    const raza = document.querySelector('#raza').value;
    const comportamiento = document.querySelector('#comportamiento').value;
    const vacunas = document.querySelector('#vacunas').value;
    const estatura = document.querySelector('#estatura').value;
    const peso = document.querySelector('#peso').value;

    // Objeto con los datos del perro
    const perros = {
        "nombre": nombre,
        "raza": raza,
        "comportamiento": comportamiento,
        "vacunas": vacunas,
        "estatura": estatura,
        "peso": peso
    };

    // Inserción del perro en el array de perros del usuario
    try {
        await db.collection('usuario').doc(id).update({
            // arrayUnion() funciona insertando el dato dentro del parametro al array indicado (perros)
            perros: firebase.firestore.FieldValue.arrayUnion(perros)
        });

        // Redireccionar a la pagina de MisPerros
        window.location.href = "/v1/dueno/MisPerros";
    } catch (error) {
        console.error('Error al insertar perro:', error);
    }
});