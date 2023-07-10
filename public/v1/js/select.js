const select = document.querySelector('.custom-select');
const selectedOption = select.querySelector('.selected-option');
const options = select.querySelector('.options');

selectedOption.addEventListener('click', () => {
  options.classList.toggle('open');
});

options.addEventListener('click', (event) => {
  const clickedOption = event.target;
  const value = clickedOption.dataset.value;
  const imagen = clickedOption.dataset.imagen;
  
  selectedOption.textContent = value;
  options.classList.remove('open');
  
  // Aquí puedes realizar las acciones necesarias con el valor y la imagen seleccionados
});