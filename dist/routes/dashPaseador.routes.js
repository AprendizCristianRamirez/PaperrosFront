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
var _lugaresRecomendados = _interopRequireDefault(require("../config/lugaresRecomendados.json"));
var dash = (0, _express.Router)();

//MIS PASEOS
dash.get("/MisPaseos", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, nombre, foto, id, email, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!req.cookies.token) {
            _context.next = 29;
            break;
          }
          _context.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Datos de las cookies
          nombre = token.nombre;
          foto = token.foto;
          id = token.id;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context.next = 10;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 10:
          resultUsuario = _context.sent;
          _context.next = 13;
          return resultUsuario.json();
        case 13:
          usuario = _context.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context.next = 17;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 17:
          resultPaseo = _context.sent;
          _context.next = 20;
          return resultPaseo.json();
        case 20:
          paseo = _context.sent;
          res.render("dashViews/MisPaseos", {
            "rol": "paseador",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "paseo": paseo
          });
          _context.next = 27;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](1);
          res.redirect("/Ingresa");
        case 27:
          _context.next = 30;
          break;
        case 29:
          res.redirect("/Ingresa");
        case 30:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 24]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
dash.get("/Paseando/:id", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var token, nombre, foto, email, paseoId, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.cookies.token) {
            _context2.next = 29;
            break;
          }
          _context2.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Datos de las cookies
          nombre = token.nombre;
          foto = token.foto;
          email = token.email;
          paseoId = req.params.id; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context2.next = 10;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 10:
          resultUsuario = _context2.sent;
          _context2.next = 13;
          return resultUsuario.json();
        case 13:
          usuario = _context2.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/" + paseoId;
          _context2.next = 17;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 17:
          resultPaseo = _context2.sent;
          _context2.next = 20;
          return resultPaseo.json();
        case 20:
          paseo = _context2.sent;
          res.render("dashViews/Paseando", {
            "rol": "paseador",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "paseo": paseo
          });
          _context2.next = 27;
          break;
        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](1);
          res.redirect("/Ingresa");
        case 27:
          _context2.next = 30;
          break;
        case 29:
          res.redirect("/Ingresa");
        case 30:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 24]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

//Eliminar paseo
dash.get("/BorrarPaseo/:id", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, url, option, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          //Tomar id del paseo
          id = req.params.id; // Invocar API para borrar paseo con el id
          url = process.env.API + "/paseo/" + id; // Describir metodo
          option = {
            method: "delete",
            headers: {
              'Content-Type': 'application/json'
            }
          };
          _context3.next = 5;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.affectedRows > 0) {
              console.log("registro borrado");
            }
          });
        case 5:
          result = _context3.sent;
          res.redirect("/v1/dueno/MisPaseos");
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

//CREARPASEO
//Vista para crear paseo
dash.get("/CrearPaseo", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!req.cookies.token) {
            _context4.next = 21;
            break;
          }
          _context4.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context4.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context4.sent;
          _context4.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context4.sent;
          res.render("dashViews/CrearPaseo", {
            "rol": "paseador",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "lugaresRecomendados": _lugaresRecomendados["default"]
          });
          _context4.next = 19;
          break;
        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](1);
          res.redirect("/Salir");
        case 19:
          _context4.next = 22;
          break;
        case 21:
          res.redirect("/Salir");
        case 22:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 16]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
//Creación del paseo
dash.post("/CrearPaseo", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var paseo, url, metodo, datos, id, option, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          //Campos del usuario
          paseo = {
            autor: req.body.paseadorEmailPaseo,
            titulo: req.body.tituloPaseo,
            descripcion: req.body.descripcionPaseo,
            destino: {
              _latitude: req.body.paseoLatitude,
              _longitude: req.body.paseoLongitude
            },
            nombre_destino: req.body.nombreDestinoPaseo,
            fecha: req.body.fechaPaseo,
            hora_fin: req.body.horaFinPaseo,
            hora_inicio: req.body.horaInicioPaseo,
            precio: req.body.precioPaseo,
            medio_de_pago: req.body.medioPagoPaseo,
            paseador: {
              email: req.body.paseadorEmailPaseo,
              img_paseador: req.body.paseadorImgPaseo,
              nombre: req.body.paseadorNombrePaseo
            },
            perro: [] //No hay perros porque los dueños los insertaran en el paseo
          }; // Petición de POST o PUT del paseo
          _context5.prev = 1;
          url = process.env.API + "paseo";
          metodo = "post";
          datos = {
            autor: paseo.autor,
            titulo: paseo.titulo,
            descripcion: paseo.descripcion,
            destino: {
              _latitude: paseo.destino._latitude,
              _longitude: paseo.destino._longitude
            },
            tipo: "manada",
            estado: "confirmado",
            nombre_destino: paseo.nombre_destino,
            fecha: paseo.fecha,
            hora_fin: paseo.hora_fin,
            hora_inicio: paseo.hora_inicio,
            precio: paseo.precio,
            medio_de_pago: paseo.medio_de_pago,
            paseador: paseo.paseador,
            perro: []
          }; //Si el campo tiene un id, será metodo put (actualizar)
          if (req.body.id) {
            id = req.body.id;
            metodo = "put";
            datos = {
              autor: paseo.autor,
              titulo: paseo.titulo,
              descripcion: paseo.descripcion,
              destino: {
                _latitude: paseo.destino._latitude,
                _longitude: paseo.destino._longitude
              },
              tipo: "manada",
              estado: "programado",
              nombre_destino: paseo.nombre_destino,
              fecha: paseo.fecha,
              hora_fin: paseo.hora_fin,
              hora_inicio: paseo.hora_inicio,
              precio: paseo.precio,
              medio_de_pago: paseo.medio_de_pago,
              paseador: paseo.paseador,
              perro: []
            };
          }
          //Configuración del fetch
          option = {
            method: metodo,
            //En metodo iria post si no tiene id y post en el caso contrario
            body: JSON.stringify(datos),
            headers: {
              'Content-Type': 'application/json'
            }
          }; //Fetch
          _context5.next = 9;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            console.log(data);
            if (data[0].affectedRows > 0) {
              console.log("Los datos fueron insertados");
            } else {
              console.log("No se inserto");
            }
          }).then(function (error) {
            console.log("Ha habido un error: " + error);
          });
        case 9:
          result = _context5.sent;
          _context5.next = 15;
          break;
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](1);
          console.log("Informacion no insertada: " + _context5.t0);
        case 15:
          res.redirect("MisPaseos");
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
dash.get("/BuscarPaseo", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (!req.cookies.token) {
            _context6.next = 28;
            break;
          }
          _context6.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Datos de las cookies
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context6.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context6.sent;
          _context6.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context6.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context6.next = 16;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 16:
          resultPaseo = _context6.sent;
          _context6.next = 19;
          return resultPaseo.json();
        case 19:
          paseo = _context6.sent;
          res.render("dashViews/BuscarPaseo", {
            "rol": "paseador",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "paseo": paseo
          });
          _context6.next = 26;
          break;
        case 23:
          _context6.prev = 23;
          _context6.t0 = _context6["catch"](1);
          res.redirect("/Ingresa");
        case 26:
          _context6.next = 29;
          break;
        case 28:
          res.redirect("/Ingresa");
        case 29:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 23]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
dash.get("/Configuracion", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (!req.cookies.token) {
            _context7.next = 21;
            break;
          }
          _context7.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context7.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context7.sent;
          _context7.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context7.sent;
          res.render("dashViews/Configuracion", {
            "rol": "paseador",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario
          });
          _context7.next = 19;
          break;
        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](1);
          res.redirect("/Ingresa");
        case 19:
          _context7.next = 22;
          break;
        case 21:
          res.redirect("/Ingresa");
        case 22:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 16]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
dash.get("/Terminos", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/Terminos", {
        "rol": "paseador",
        "nombre": nombre,
        "foto": foto,
        "mnu": 0
      });
    } catch (error) {
      res.redirect("/Ingresa");
    }
  } else {
    res.redirect("/Ingresa");
  }
});
dash.get("/Perfil", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/Perfil", {
        "rol": "paseador",
        "nombre": nombre,
        "foto": "foto",
        "mnu": 0
      });
    } catch (error) {
      res.redirect("/Ingresa");
    }
  } else {
    res.redirect("/Ingresa");
  }
});

//VER PERFIL ESPECIFICO
dash.get("/Perfil/:id", /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPerfil, resultPerfil, perfil, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (!req.cookies.token) {
            _context8.next = 35;
            break;
          }
          _context8.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Información de las cookies
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context8.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context8.sent;
          _context8.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context8.sent;
          // Fetch del Perfil
          rutaPerfil = process.env.API + "usuarios/" + req.params.id;
          _context8.next = 16;
          return (0, _nodeFetch["default"])(rutaPerfil);
        case 16:
          resultPerfil = _context8.sent;
          _context8.next = 19;
          return resultPerfil.json();
        case 19:
          perfil = _context8.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context8.next = 23;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 23:
          resultPaseo = _context8.sent;
          _context8.next = 26;
          return resultPaseo.json();
        case 26:
          paseo = _context8.sent;
          res.render("dashViews/Perfil", {
            "rol": "paseador",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "paseo": paseo,
            "perfil": perfil,
            "idPerfil": req.params.id
          });
          _context8.next = 33;
          break;
        case 30:
          _context8.prev = 30;
          _context8.t0 = _context8["catch"](1);
          res.redirect("/Salir");
        case 33:
          _context8.next = 36;
          break;
        case 35:
          res.redirect("/Salir");
        case 36:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 30]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
dash.get("/Chat", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/chat", {
        "rol": "paseador",
        "nombre": nombre,
        "foto": "foto",
        "mnu": 0
      });
    } catch (error) {
      res.redirect("/Ingresa");
    }
  } else {
    res.redirect("/Ingresa");
  }
});
dash.get("/salir", function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
});
dash.get("/Terminos", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/Terminos", {
        "rol": "paseador",
        "nombre": nombre,
        "foto": foto,
        "mnu": 0
      });
    } catch (error) {
      res.redirect("/Ingresa");
    }
  } else {
    res.redirect("/Ingresa");
  }
});
var _default = dash;
exports["default"] = _default;