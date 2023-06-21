"use strict";

var loginForm = document.querySelector(".login_form");
var login = loginForm.querySelectorAll(".social_login a");
var close = loginForm.querySelector(".close");
function openForm() {
  loginForm.classList.remove("is_closed");
}
function closeForm() {
  loginForm.classList.add("is_closed");
}
login.forEach(function (loginItem) {
  return loginItem.addEventListener("click", openForm);
});
close.addEventListener("click", closeForm);