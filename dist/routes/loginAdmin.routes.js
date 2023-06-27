"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginRouterAdmin = void 0;
var _express = require("express");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
var loginRouterAdmin = (0, _express.Router)();
exports.loginRouterAdmin = loginRouterAdmin;
loginRouterAdmin.get("/google", function (req, res) {
  // console.log(req.user);
  var data = {
    "nombre": req.user.displayName,
    "id": req.user.id,
    "email": req.user.emails[0].value,
    "foto": req.user.photos[0].value
  };
  var token = _jsonwebtoken["default"].sign(data, process.env.SECRET_KEY, {
    "expiresIn": process.env.EXPIRE_TOKEN
  });

  //let timeExpireCookie = 3000 * 60 * process.env.EXPIRE_COOKIE;

  res.cookie("token", token /*, {"maxAge": timeExpireCookie }*/);

  res.redirect("/v1/admin/usuarios");
});