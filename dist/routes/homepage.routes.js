"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var home = (0, _express.Router)();
home.get("/", function (req, res) {
  res.render("homeViews/inicio", {
    "titulo": "Paperros",
    "activo": 1
  });
});
home.get("/Acerca", function (req, res) {
  res.render("homeViews/acerca", {
    "titulo": "Paperros",
    "activo": 2
  });
});
home.get("/Servicios", function (req, res) {
  res.render("homeViews/servicios", {
    "titulo": "Paperros",
    "activo": 3
  });
});
home.get("/Paseadores", function (req, res) {
  res.render("homeViews/paseadores", {
    "titulo": "Paperros",
    "activo": 4
  });
});
home.get("/Contactanos", function (req, res) {
  res.render("homeViews/contactanos", {
    "titulo": "Paperros",
    "activo": 5
  });
});
home.get("/Ingresa", function (req, res) {
  res.render("homeViews/ingresa", {
    "titulo": "Paperros",
    "activo": 6,
    "google": process.env.GOOGLE_LOGIN
  });
});
home.get("/Registro", function (req, res) {
  res.render("homeViews/registro", {
    "titulo": "Paperros",
    "activo": 7
  });
});
var _default = home;
exports["default"] = _default;