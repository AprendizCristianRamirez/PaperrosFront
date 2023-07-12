document.addEventListener("DOMContentLoaded", function () {
  const selectWrapper = document.querySelector(".custom-select-wrapper");
  const select = selectWrapper.querySelector(".custom-select");
  const selectedOption = selectWrapper.querySelector(".selected-option");
  const optionsList = selectWrapper.querySelector(".options");
  const options = Array.from(optionsList.querySelectorAll(".option"));

  select.addEventListener("click", function () {
    optionsList.style.display = optionsList.style.display === "none" ? "block" : "none";
  });

  options.forEach(function (option) {
    option.addEventListener("click", function () {
      selectedOption.textContent = option.textContent;
      document.getElementById("raza").value = option.dataset.value;
      optionsList.style.display = "none";
    });
  });
});