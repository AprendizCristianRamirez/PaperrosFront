"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var home = (0, _express.Router)();
home.get("/", function (req, res) {
  res.render("homeViews/Inicio.ejs", {
    "titulo": "Paperros",
    "activo": 1,
    "google": process.env.GOOGLE_LOGIN
  });
});
home.get("/Acerca", function (req, res) {
  res.render("homeViews/Acerca", {
    "titulo": "Paperros",
    "activo": 2,
    "google": process.env.GOOGLE_LOGIN
  });
});
home.get("/Servicios", function (req, res) {
  res.render("homeViews/servicios", {
    "titulo": "Paperros",
    "activo": 3,
    "google": process.env.GOOGLE_LOGIN
  });
});
home.get("/Paseadores", function (req, res) {
  res.render("homeViews/paseadores", {
    "titulo": "Paperros",
    "activo": 4,
    "google": process.env.GOOGLE_LOGIN
  });
});
home.get("/Contactanos", function (req, res) {
  res.render("homeViews/contactanos", {
    "titulo": "Paperros",
    "activo": 5,
    "google": process.env.GOOGLE_LOGIN,
    "api": proccess.env.API
  });
});
home.get("/Registro", function (req, res) {
  res.render("homeViews/registro", {
    "titulo": "Paperros",
    "activo": 7,
    "google": process.env.GOOGLE_LOGIN
  });
});
var _default = home;
exports["default"] = _default;