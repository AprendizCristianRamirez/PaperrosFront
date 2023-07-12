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
  const comportamiento = document.querySelector('#comportamiento').value;
  const estatura = document.querySelector('#estatura').value;
  const peso = document.querySelector('#peso').value;
  const descripcion = document.querySelector('#descripcion').value;
  // Nombre e imagen de la raza del perro
  const razaSelect = document.querySelector('#raza');
  const selectedOption = razaSelect.options[razaSelect.selectedIndex];
  const selectedRaza = selectedOption.value;
  const selectedImagen = selectedOption.dataset.imagen;
  //CheckList de vacunas
  const checkVacunas = document.querySelectorAll('input[name="vacunas"]:checked');
  const vacunas = Array.from(checkVacunas).map((checkbox) => checkbox.value);


  // Objeto con los datos del perro
  const perros = {
      "nombre": nombre,
      "comportamiento": comportamiento,
      "estatura": estatura,
      "peso": peso,
      "descripcion": descripcion,
      "raza": selectedRaza,
      "imagen": selectedImagen,
      "vacunas": vacunas
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