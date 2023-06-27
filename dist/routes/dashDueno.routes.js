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
var _pdfkit = _interopRequireDefault(require("pdfkit"));
var dash = (0, _express.Router)();

//MISPASEOS
dash.get("/MisPaseos", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _token, nombre, foto, id, email, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!req.cookies.token) {
            _context.next = 30;
            break;
          }
          _context.prev = 1;
          //Verificación del token
          _token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Datos de las cookies
          nombre = _token.nombre;
          foto = _token.foto;
          id = _token.id;
          email = _token.email; // Fetch del usuario
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
          //Si no tiene cuenta, será redirigido para crear una
          if (usuario == false) {
            res.redirect("Configuracion");
          } else {
            res.render("dashViews/MisPaseos", {
              "rol": "dueno",
              "nombre": nombre,
              "foto": foto,
              "email": email,
              "usuario": usuario,
              "paseo": paseo
            });
          }
          _context.next = 28;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0 + "Error de cookies/fetch");
          res.redirect("/Salir");
        case 28:
          _context.next = 32;
          break;
        case 30:
          console.log("Error de token");
          res.redirect("/Salir");
        case 32:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 24]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

//CREARPASEO
//Vista para crear paseo
dash.get("/CrearPaseo", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _token2, nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.cookies.token) {
            _context2.next = 28;
            break;
          }
          _context2.prev = 1;
          _token2 = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
          nombre = _token2.nombre;
          foto = _token2.foto;
          email = _token2.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context2.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context2.sent;
          _context2.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context2.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context2.next = 16;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 16:
          resultPaseo = _context2.sent;
          _context2.next = 19;
          return resultPaseo.json();
        case 19:
          paseo = _context2.sent;
          res.render("dashViews/CrearPaseo", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario
          });
          _context2.next = 26;
          break;
        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](1);
          res.redirect("/Salir");
        case 26:
          _context2.next = 29;
          break;
        case 28:
          res.redirect("/Salir");
        case 29:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 23]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
//Creación del paseo
dash.post("/CrearPaseo", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var usuario, checkedPerros, perroArray, i, paseo, url, metodo, datos, id, option, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          //Datos del usuario dueño de los perros
          usuario = {
            nombre_dueno: req.body.duenoNombrePaseo,
            foto_dueno: req.body.duenoFotoPaseo,
            email: req.body.duenoEmailPaseo,
            localizacion: {
              _latitude: req.body.paseoLatitude,
              _longitude: req.body.paseoLongitude
            }
          }; //Información de los perros seleccionados
          //Este datos es un array de strings
          //por ejemplo: ['{"raza": "Golden", "nombre": "Martina"...}', '{"raza": "Golden", "nombre": "Martina"...}', '{"raza": "Bulldog"...]
          checkedPerros = req.body.perros; //Aqui se convierte ese array de strings a un array de objetos con cada posición de checkedPerros
          perroArray = checkedPerros.map(function (item) {
            return JSON.parse(item);
          }); //Añadir información del usuario a los perros
          for (i = 0; i < perroArray.length; i++) {
            perroArray[i].nombre_dueno = usuario.nombre_dueno;
            perroArray[i].foto_dueno = usuario.foto_dueno;
            perroArray[i].email = usuario.email;
            perroArray[i].localizacion = usuario.localizacion;
          }

          //Campos del usuario
          paseo = {
            autor: req.body.duenoEmailPaseo,
            titulo: req.body.tituloPaseo,
            descripcion: req.body.descripcionPaseo,
            destino: {
              _latitude: req.body.paseoLatitude,
              _longitude: req.body.paseoLongitude
            },
            nombre_destino: req.body.nombreDestinoPaseo,
            hora_fin: req.body.horaFinPaseo,
            hora_inicio: req.body.horaInicioPaseo,
            precio: req.body.precioPaseo,
            medio_de_pago: req.body.medioPagoPaseo,
            //paseador: { No se usa porque estamos creando un paseo personalizado (que debe tomar el paseador)
            //    id_paseador:req.body.paseadorIdPaseo,
            //    img_paseador:req.body.paseadorImgPaseo,
            //    nombre_paseador:req.body.paseadorNombrePaseo
            //},
            perro: perroArray
          }; // Petición de POST o PUT del paseo
          _context3.prev = 5;
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
            tipo: "personalizado",
            estado: "confirmado",
            nombre_destino: paseo.nombre_destino,
            hora_fin: paseo.hora_fin,
            hora_inicio: paseo.hora_inicio,
            precio: paseo.precio,
            medio_de_pago: paseo.medio_de_pago,
            paseador: {
              //Vacio porque luego el paseador decide tomar el paseo
            },
            perro: paseo.perro
          }; //Si el campo tiene un id, será metodo put (actualizar)
          if (req.body.id) {
            id = req.body.id;
            metodo = "put";
            datos = {
              titulo: paseo.titulo,
              descripcion: paseo.descripcion,
              destino: {
                _latitude: paseo.destino._latitude,
                _longitude: paseo.destino._longitude
              },
              nombre_destino: paseo.nombre_destino,
              hora_fin: paseo.hora_fin,
              hora_inicio: paseo.hora_inicio,
              precio: paseo.precio,
              medio_de_pago: medio_de_pago,
              paseador: {
                //Vacio porque luego el paseador decide tomar el paseo
              },
              perro: paseo.perro
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
          _context3.next = 13;
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
        case 13:
          result = _context3.sent;
          _context3.next = 19;
          break;
        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](5);
          console.log("Informacion no insertada: " + _context3.t0);
        case 19:
          res.redirect("MisPaseos");
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[5, 16]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

//RUTAS DE PASEADORES (MANADA)
dash.get("/RutasPaseadores", function (req, res) {
  if (req.cookies.token) {
    try {
      var _token3 = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = _token3.nombre;
      var foto = _token3.foto;
      var email = _token3.email;
      res.render("dashViews/RutasPaseadores", {
        "rol": "dueno",
        "nombre": nombre,
        "foto": foto,
        "mnu": 0,
        "email": email
      });
    } catch (error) {
      res.redirect("/Salir");
    }
  } else {
    res.redirect("/Salir");
  }
});

//AÑADIRPERRO
dash.get("/AnadirPerro", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _token4, nombre, foto, email, rutaUsuario, resultUsuario, usuario;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!req.cookies.token) {
            _context4.next = 21;
            break;
          }
          _context4.prev = 1;
          _token4 = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
          nombre = _token4.nombre;
          foto = _token4.foto;
          email = _token4.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context4.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context4.sent;
          _context4.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context4.sent;
          res.render("dashViews/AnadirPerro", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "mnu": 0,
            "email": email
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

//MISPERROS
dash.get("/MisPerros", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _token5, nombre, foto, email, rutaUsuario, resultUsuario, usuario;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!req.cookies.token) {
            _context5.next = 21;
            break;
          }
          _context5.prev = 1;
          _token5 = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
          nombre = _token5.nombre;
          foto = _token5.foto;
          email = _token5.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context5.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context5.sent;
          _context5.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context5.sent;
          res.render("dashViews/MisPerros", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario
          });
          _context5.next = 19;
          break;
        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](1);
          res.redirect("/Salir");
        case 19:
          _context5.next = 22;
          break;
        case 21:
          res.redirect("/Salir");
        case 22:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 16]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

//CONFIGURACIÓN
//Vista para que el usuario cree o actualize su perfil
dash.get("/Configuracion", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _token6, nombre, foto, email, rutaUsuario, resultUsuario, usuario;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (!req.cookies.token) {
            _context6.next = 21;
            break;
          }
          _context6.prev = 1;
          _token6 = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
          nombre = _token6.nombre;
          foto = _token6.foto;
          email = _token6.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context6.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context6.sent;
          _context6.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context6.sent;
          res.render("dashViews/Configuracion", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "mnu": 0,
            "email": email,
            "usuario": usuario
          });
          _context6.next = 19;
          break;
        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](1);
          res.redirect("/Salir");
        case 19:
          _context6.next = 22;
          break;
        case 21:
          res.redirect("/Salir");
        case 22:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 16]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
//Creación y actualización del perfil del usuario
dash.post("/Configuracion", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var user, url, metodo, datos, id, option, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          //Campos del usuario
          user = {
            //Asignar los campos de los inputs al objeto user
            nombre: req.body.nombre,
            municipio: req.body.municipio,
            direccion: req.body.direccion,
            ubicacion: {
              _latitude: req.body.paseoLatitude,
              _longitude: req.body.paseoLongitude
            },
            telefono: req.body.telefono,
            edad: req.body.edad,
            pais: req.body.pais,
            email: req.body.email
          };
          console.log(user);
          _context7.prev = 2;
          url = process.env.API + "usuarios";
          metodo = "post";
          datos = {
            nombre: user.nombre,
            municipio: user.municipio,
            direccion: user.direccion,
            paseoLatitude: user.ubicacion._latitude,
            paseoLongitude: user.ubicacion._longitude,
            telefono: user.telefono,
            edad: user.edad,
            pais: user.pais,
            id: user.email
          }; //Si el campo tiene un id, será metodo put (actualizar)
          if (req.body.id) {
            id = req.body.id;
            metodo = "put";
            datos = {
              nombre: user.nombre,
              municipio: user.municipio,
              direccion: user.direccion,
              paseoLatitude: user.ubicacion._latitude,
              paseoLongitude: user.ubicacion._longitude,
              telefono: user.telefono,
              edad: user.edad,
              pais: user.pais,
              id: user.email
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
          _context7.next = 10;
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
        case 10:
          result = _context7.sent;
          _context7.next = 16;
          break;
        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](2);
          console.log("Informacion no insertada: " + _context7.t0);
        case 16:
          res.redirect("MisPaseos");
        case 17:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[2, 13]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());

// TERMINOS
dash.get("/Terminos", /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var _token7, nombre, foto, email;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (req.cookies.token) {
            try {
              _token7 = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
              nombre = _token7.nombre;
              foto = _token7.foto;
              email = _token7.email;
              res.render("dashViews/Terminos", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "email": email
              });
            } catch (error) {
              res.redirect("/Ingresa");
            }
          } else {
            res.redirect("/Ingresa");
          }
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());

// REPORTES
dash.get("/Reportes", /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var _token8, nombre, foto, email;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          if (req.cookies.token) {
            try {
              _token8 = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
              nombre = _token8.nombre;
              foto = _token8.foto;
              email = _token8.email;
              res.render("dashViews/reportes", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "email": email
              });
            } catch (error) {
              res.redirect("/Salir");
            }
          } else {
            res.redirect("/Salir");
          }
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());

//PERFIL
dash.get("/Perfil", /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var _token9, nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          if (!req.cookies.token) {
            _context10.next = 28;
            break;
          }
          _context10.prev = 1;
          _token9 = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Información de las cookies
          nombre = _token9.nombre;
          foto = _token9.foto;
          email = _token9.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context10.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context10.sent;
          _context10.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context10.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context10.next = 16;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 16:
          resultPaseo = _context10.sent;
          _context10.next = 19;
          return resultPaseo.json();
        case 19:
          paseo = _context10.sent;
          res.render("dashViews/Perfil", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "paseo": paseo
          });
          _context10.next = 26;
          break;
        case 23:
          _context10.prev = 23;
          _context10.t0 = _context10["catch"](1);
          res.redirect("/Salir");
        case 26:
          _context10.next = 29;
          break;
        case 28:
          res.redirect("/Salir");
        case 29:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 23]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
//VER PERFIL ESPECIFICO
dash.get("/Perfil/:id", /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var _token10, nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPerfil, resultPerfil, perfil, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          if (!req.cookies.token) {
            _context11.next = 35;
            break;
          }
          _context11.prev = 1;
          _token10 = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Información de las cookies
          nombre = _token10.nombre;
          foto = _token10.foto;
          email = _token10.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context11.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context11.sent;
          _context11.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context11.sent;
          // Fetch del Perfil
          rutaPerfil = process.env.API + "usuarios/" + req.params.id;
          _context11.next = 16;
          return (0, _nodeFetch["default"])(rutaPerfil);
        case 16:
          resultPerfil = _context11.sent;
          _context11.next = 19;
          return resultPerfil.json();
        case 19:
          perfil = _context11.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context11.next = 23;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 23:
          resultPaseo = _context11.sent;
          _context11.next = 26;
          return resultPaseo.json();
        case 26:
          paseo = _context11.sent;
          res.render("dashViews/Perfil", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "paseo": paseo,
            "perfil": perfil,
            "idPerfil": req.params.id
          });
          _context11.next = 33;
          break;
        case 30:
          _context11.prev = 30;
          _context11.t0 = _context11["catch"](1);
          res.redirect("/Salir");
        case 33:
          _context11.next = 36;
          break;
        case 35:
          res.redirect("/Salir");
        case 36:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[1, 30]]);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());

//PDF
// Render the EJS template to HTML
var renderEjsToHtml = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
    var nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo, html;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          //const templateData = {}; // Add any necessary data for rendering the EJS template
          // Información de las cookies
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context12.next = 7;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 7:
          resultUsuario = _context12.sent;
          _context12.next = 10;
          return resultUsuario.json();
        case 10:
          usuario = _context12.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context12.next = 14;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 14:
          resultPaseo = _context12.sent;
          _context12.next = 17;
          return resultPaseo.json();
        case 17:
          paseo = _context12.sent;
          _context12.next = 20;
          return ejs.renderFile("dashViews/Perfil", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "paseo": paseo,
            "perfil": usuario,
            "idPerfil": email
          });
        case 20:
          html = _context12.sent;
          return _context12.abrupt("return", html);
        case 24:
          _context12.prev = 24;
          _context12.t0 = _context12["catch"](0);
          console.error('Error rendering EJS to HTML:', _context12.t0);
          throw _context12.t0;
        case 28:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 24]]);
  }));
  return function renderEjsToHtml() {
    return _ref12.apply(this, arguments);
  };
}();

// Plantilla  del pdf
// Express route for generating PDF
dash.get('/generate-pdf', /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo, html, doc, stream;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          // Render the EJS template to HTML
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context13.next = 7;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 7:
          resultUsuario = _context13.sent;
          _context13.next = 10;
          return resultUsuario.json();
        case 10:
          usuario = _context13.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context13.next = 14;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 14:
          resultPaseo = _context13.sent;
          _context13.next = 17;
          return resultPaseo.json();
        case 17:
          paseo = _context13.sent;
          _context13.next = 20;
          return ejs.renderFile("dashViews/Perfil", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "paseo": paseo,
            "perfil": usuario,
            "idPerfil": email
          });
        case 20:
          html = _context13.sent;
          // Create a PDF document
          doc = new PDFDocument(); // Pipe the PDF document to a writable stream
          stream = fs.createWriteStream('/');
          doc.pipe(stream);

          // Embed the HTML content into the PDF document
          doc.html(html, {
            // Set options for rendering HTML
            // Add any necessary styling or configuration options
          });

          // Finalize the PDF document
          doc.end();

          // Send the PDF file as a response
          res.contentType('application/pdf');
          doc.pipe(res);

          // Uncomment the following line if you want to save the PDF file locally
          // stream.on('finish', () => console.log('PDF file created successfully'));
          _context13.next = 34;
          break;
        case 30:
          _context13.prev = 30;
          _context13.t0 = _context13["catch"](0);
          console.error('Error generating PDF:', _context13.t0);
          res.status(500).send('Error generating PDF');
        case 34:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 30]]);
  }));
  return function (_x23, _x24) {
    return _ref13.apply(this, arguments);
  };
}());
dash.get("/Reporte", /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var _token11, nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          if (!req.cookies.token) {
            _context14.next = 28;
            break;
          }
          _context14.prev = 1;
          _token11 = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Información de las cookies
          nombre = _token11.nombre;
          foto = _token11.foto;
          email = _token11.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context14.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context14.sent;
          _context14.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context14.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context14.next = 16;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 16:
          resultPaseo = _context14.sent;
          _context14.next = 19;
          return resultPaseo.json();
        case 19:
          paseo = _context14.sent;
          res.render("dashViews/Perfil", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "paseo": paseo,
            "perfil": usuario,
            "idPerfil": email
          });
          _context14.next = 26;
          break;
        case 23:
          _context14.prev = 23;
          _context14.t0 = _context14["catch"](1);
          res.redirect("/Salir");
        case 26:
          _context14.next = 29;
          break;
        case 28:
          res.redirect("/Salir");
        case 29:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[1, 23]]);
  }));
  return function (_x25, _x26) {
    return _ref14.apply(this, arguments);
  };
}());

// CHAT
dash.get("/Chat", /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var _token12, nombre, foto, email, rutaUsuario, resultUsuario, usuario;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          if (!req.cookies.token) {
            _context15.next = 21;
            break;
          }
          _context15.prev = 1;
          _token12 = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
          nombre = _token12.nombre;
          foto = _token12.foto;
          email = _token12.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context15.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context15.sent;
          _context15.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context15.sent;
          res.render("dashViews/chat", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": "foto",
            "mnu": 0,
            "email": email
          });
          _context15.next = 19;
          break;
        case 16:
          _context15.prev = 16;
          _context15.t0 = _context15["catch"](1);
          res.redirect("/Salir");
        case 19:
          _context15.next = 22;
          break;
        case 21:
          res.redirect("/Salir");
        case 22:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[1, 16]]);
  }));
  return function (_x27, _x28) {
    return _ref15.apply(this, arguments);
  };
}());

//SALIR
dash.get("/salir", function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
});

// TERMINOS
/*dash.get("/Terminos", async(req, res)=>{
    if(req.cookies.token){
        try{
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
                )
                let nombre = token.nombre;
                let foto = token.foto;
                
                res.render("dashViews/Terminos",{
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "mnu":0

            });
        } catch (error){
            res.redirect("/Salir")
        }
    }else{
        res.redirect("/Salir")
    }
});*/

/*Ejemplo de rutas del crud
dash.post("/save",async (req, res)=>{
    const name = req.body.name;
    
    try {
        const url = "http://localhost:5000/api/users";
        let metodo = "post";
        let datos = {
            name : name 
        };
        if (req.body.id){
            const id = req.body.id;
            metodo = "put";
            datos = {
                id:id,
                name:name
            }
        }
        const option = {
            method : metodo,
            body : JSON.stringify(datos),
            headers : {
                'Content-Type':'application/json'
            }
        }


        const result = await fetch(url, option)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            if (data[0].affectedRows>0){
                console.log("Los datos fueron insertados");
            }else{
                console.log("Labase datos no inserto");
            }
        })
        .then(error=>{console.log("Ha habido un error: "+ error);})
    } catch (error) {
        console.log("Informacion no insertada: "+error);
    }
    
    res.redirect("/v1/usuario")
})
dash.get("/usuario-edit", async(req, res)=>{
    if(req.cookies.eib_per){
        try {
            const data = {
                id : req.query.id,
                name : req.query.name
            }
            
            const token = jwt.verify(
                req.cookies.eib_per, 
                process.env.SECRET_KEY
                )
            let nombre = token.nombre;
            let foto = token.foto;
            res.render("dashboard",{
                "nombre": nombre,
                "foto": foto,
                "mnu" : 3,
                "data" : data
            });
        }catch(error){
            console.log("Token no valido");
        }

    }else{
        res.redirect("/login")
    }
})
dash.get("/borrar", async (req, res)=>{
    const id = req.query.id;
    const url = "http://localhost:5000/api/users/"+id;
    const option = {
        method : "delete",
        headers : {
            'Content-Type':'application/json'
        }
    }

    const result = await fetch(url, option)
    .then(response=>response.json())
    .then(data=>{
        if(data.affectedRows > 0){
            console.log("registro borrado");
        }
    })
    res.redirect("/v1/usuario")
})*/
var _default = dash;
exports["default"] = _default;