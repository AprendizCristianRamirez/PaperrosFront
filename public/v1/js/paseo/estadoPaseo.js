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
async function cambiarEstadoPaseo(documento, estado) {

    if(estado == "enCurso"){
        // Inserción del perro en el array de perros del usuario
        try {
            await db.collection('paseo').doc(documento).update({
                // arrayUnion() funciona insertando el dato dentro del parametro al array indicado (perros)
                estado: estado
            });

            window.location.href = `/v1/paseador/Paseando/${documento}`;
        } catch (error) {
            console.error('Error al cambiar estado del paseo:', error);
        }
    } else {
        const paseoComentario = document.getElementById('comentario').value;

        await db.collection('paseo').doc(documento).update({
            // arrayUnion() funciona insertando el dato dentro del parametro al array indicado (perros)
            estado: estado,
            comentario: paseoComentario
        });

        window.location.href = `/v1/paseador/MisPaseos`;
    }

    
};

async function tomarPaseoPaseador(documento) {

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const foto = document.getElementById('foto').value;

    console.log(nombre, email, foto)
    await db.collection('paseo').doc(documento).update({
        // arrayUnion() funciona insertando el dato dentro del parametro al array indicado (perros)
        paseador: {
            nombre: nombre,
            email: email,
            foto: foto
        }
    });

    window.location.href = `/v1/paseador/MisPaseos`;
    
};


async function agregarPerro(documento, perros) {
    console.log(perros);

    await db.collection('paseo').doc(documento).update({
        // arrayUnion() funciona insertando el dato dentro del parametro al array indicado (perros)
        perro: perros
    });

    window.location.href = `/v1/paseador/MisPaseos`;
}
