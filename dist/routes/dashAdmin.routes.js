"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var dash = (0, _express.Router)();

//MISPASEOS
dash.get("/AdminUsuarios", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaDelete, resultDelete, deleteUsuario;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!req.cookies.token) {
            _context.next = 29;
            break;
          }
          _context.prev = 1;
          //Verificación del token
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Datos de las cookies
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "/usuarios/";
          _context.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context.sent;
          _context.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context.sent;
          // Fetch del usuario
          rutaDelete = process.env.API + "/usuarios/:id";
          _context.next = 16;
          return (0, _nodeFetch["default"])(rutaDelete);
        case 16:
          resultDelete = _context.sent;
          _context.next = 19;
          return resultDelete.json();
        case 19:
          deleteUsuario = _context.sent;
          //Si no tiene cuenta, será redirigido para crear una
          if (usuario == false) {
            res.redirect("Configuracion");
          } else {
            res.render("dashViews/adminUsuarios", {
              "nombre": nombre,
              "foto": foto,
              "email": email,
              "usuario": usuario,
              "deleteUsuario": deleteUsuario
            });
          }
          _context.next = 27;
          break;
        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0 + "Error de cookies/fetch");
          res.redirect("/Salir");
        case 27:
          _context.next = 31;
          break;
        case 29:
          console.log("Error de token");
          res.redirect("/Salir");
        case 31:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 23]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
dash.get("/AdminInformes", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.cookies.token) {
            _context2.next = 22;
            break;
          }
          _context2.prev = 1;
          //Verificación del token
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Datos de las cookies
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/";
          _context2.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context2.sent;
          _context2.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context2.sent;
          //Si no tiene cuenta, será redirigido para crear una
          if (usuario == false) {
            res.redirect("Configuracion");
          } else {
            res.render("dashViews/AdminInformes", {
              "nombre": nombre,
              "foto": foto,
              "email": email,
              "usuario": usuario
            });
          }
          _context2.next = 20;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0 + "Error de cookies/fetch");
          res.redirect("/Salir");
        case 20:
          _context2.next = 24;
          break;
        case 22:
          console.log("Error de token");
          res.redirect("/Salir");
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 16]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
dash.get("/AdminReportes", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!req.cookies.token) {
            _context3.next = 22;
            break;
          }
          _context3.prev = 1;
          //Verificación del token
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Datos de las cookies
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/";
          _context3.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context3.sent;
          _context3.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context3.sent;
          //Si no tiene cuenta, será redirigido para crear una
          if (usuario == false) {
            res.redirect("Configuracion");
          } else {
            res.render("dashViews/AdminReportes", {
              "nombre": nombre,
              "foto": foto,
              "email": email,
              "usuario": usuario
            });
          }
          _context3.next = 20;
          break;
        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0 + "Error de cookies/fetch");
          res.redirect("/Salir");
        case 20:
          _context3.next = 24;
          break;
        case 22:
          console.log("Error de token");
          res.redirect("/Salir");
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 16]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
dash.get("/salir", function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
});
var _default = dash;
exports["default"] = _default;