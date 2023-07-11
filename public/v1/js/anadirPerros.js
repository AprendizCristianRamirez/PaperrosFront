//Configuración de firebase
const firebaseConfig = {
    // Tu configuración de Firebase aquí
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
    const selectedOption = document.querySelector('.selected-option');
    const selectedRaza = selectedOption.dataset.value;
    const selectedImagen = selectedOption.dataset.imagen;
    //CheckList de vacunas
    const checkVacunas = document.querySelectorAll('input[name="vacunas"]:checked');
    const vacunas = Array.from(checkVacunas).map((checkbox) => checkbox.value);
  
    // Objeto con los datos del perro
    const perro = {
      nombre: nombre,
      comportamiento: comportamiento,
      estatura: estatura,
      peso: peso,
      descripcion: descripcion,
      raza: selectedRaza,
      imagen: selectedImagen,
      vacunas: vacunas
    };
  
    // Inserción del perro en el array de perros del usuario
    try {
      await db.collection('usuario').doc(id).update({
        perros: firebase.firestore.FieldValue.arrayUnion(perro)
      });
  
      // Redireccionar a la página de MisPerros
      window.location.href = "/v1/dueno/MisPerros";
    } catch (error) {
      console.error('Error al insertar perro:', error);
    }
  });
  
  // Evento para mostrar/ocultar las opciones del select personalizado
  document.addEventListener("DOMContentLoaded", function () {
    const selectWrapper = document.querySelector(".custom-select-wrapper");
    const select = selectWrapper.querySelector(".custom-select");
    const selectedOption = selectWrapper.querySelector(".selected-option");
    const optionsList = selectWrapper.querySelector(".options");
    const options = Array.from(optionsList.querySelectorAll(".option"));
    const hiddenInput = document.getElementById("raza");
  
    select.addEventListener("click", function () {
      optionsList.style.display = optionsList.style.display === "none" ? "block" : "none";
    });
  
    options.forEach(function (option) {
      option.addEventListener("click", function () {
        selectedOption.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;
        optionsList.style.display = "none";
      });
    });
  });
  