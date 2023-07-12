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
var _perros = _interopRequireDefault(require("../config/perros.json"));
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
            _context.next = 30;
            break;
          }
          _context.prev = 1;
          //Verificación del token
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
          res.redirect("/v1/dueno/salir");
        case 28:
          _context.next = 32;
          break;
        case 30:
          console.log("Error de token");
          res.redirect("/v1/dueno/salir");
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

//Eliminar paseo
dash.get("/BorrarPaseo/:id", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, url, option, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
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
          _context2.next = 5;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.affectedRows > 0) {
              console.log("registro borrado");
            }
          });
        case 5:
          result = _context2.sent;
          res.redirect("/v1/dueno/MisPaseos");
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

//CREARPASEO
//Vista para crear paseo
dash.get("/CrearPaseo", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!req.cookies.token) {
            _context3.next = 28;
            break;
          }
          _context3.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context3.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context3.sent;
          _context3.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context3.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context3.next = 16;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 16:
          resultPaseo = _context3.sent;
          _context3.next = 19;
          return resultPaseo.json();
        case 19:
          paseo = _context3.sent;
          res.render("dashViews/CrearPaseo", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "lugaresRecomendados": _lugaresRecomendados["default"]
          });
          _context3.next = 26;
          break;
        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](1);
          res.redirect("/v1/dueno/salir");
        case 26:
          _context3.next = 29;
          break;
        case 28:
          res.redirect("/v1/dueno/salir");
        case 29:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 23]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

//Creación del paseo
dash.post("/CrearPaseo", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var usuario, checkedPerros, perrosArray, perroObjeto, i, paseo, url, metodo, datos, option, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          //Datos del usuario dueño de los perros
          usuario = {
            nombre_dueno: req.body.duenoNombrePaseo,
            foto_dueno: req.body.duenoFotoPaseo,
            email: req.body.duenoEmailPaseo,
            localizacion: {
              _latitude: req.body.duenoLatitude,
              _longitude: req.body.duenoLongitude
            }
          }; //Información de los perros seleccionados
          //Este datos es un array de strings
          //por ejemplo: ['{"raza": "Golden", "nombre": "Martina"...}', '{"raza": "Golden", "nombre": "Martina"...}', '{"raza": "Bulldog"...]
          checkedPerros = req.body.perros;
          perrosArray = [];
          if (Array.isArray(checkedPerros)) {
            //Aqui se convierte ese array de strings a un array de objetos con cada posición de checkedPerros
            perrosArray = checkedPerros.map(function (item) {
              return JSON.parse(item);
            });
            //Añadir información del usuario a los perros
            for (i = 0; i < perrosArray.length; i++) {
              perrosArray[i].nombre_dueno = usuario.nombre_dueno;
              perrosArray[i].foto_dueno = usuario.foto_dueno;
              perrosArray[i].email = usuario.email;
              perrosArray[i].localizacion = usuario.localizacion;
            }
          } else {
            // Si es un objeto (Un solo perro)
            perroObjeto = JSON.parse(checkedPerros);
            //Añadir información del usuario al perro
            perroObjeto.nombre_dueno = usuario.nombre_dueno;
            perroObjeto.foto_dueno = usuario.foto_dueno;
            perroObjeto.email = usuario.email;
            perroObjeto.localizacion = usuario.localizacion;
            // Insertar el objeto en el array final
            perrosArray[0] = perroObjeto;
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
            fechaPaseo: req.body.fechaPaseo,
            hora_fin: req.body.horaFinPaseo,
            hora_inicio: req.body.horaInicioPaseo,
            precio: req.body.precioPaseo,
            medio_de_pago: req.body.medioPagoPaseo,
            //paseador: { No se usa porque estamos creando un paseo personalizado (que debe tomar el paseador)
            //    id_paseador:req.body.paseadorIdPaseo,
            //    img_paseador:req.body.paseadorImgPaseo,
            //    nombre_paseador:req.body.paseadorNombrePaseo
            //},
            perro: perrosArray
          }; // Petición de POST o PUT del paseo
          _context4.prev = 5;
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
            fechaPaseo: paseo.fechaPaseo,
            hora_fin: paseo.hora_fin,
            hora_inicio: paseo.hora_inicio,
            precio: paseo.precio,
            medio_de_pago: paseo.medio_de_pago,
            paseador: {
              //Vacio porque luego el paseador decide tomar el paseo
            },
            perro: paseo.perro
          }; //Configuración del fetch
          option = {
            method: metodo,
            //En metodo iria post si no tiene id y post en el caso contrario
            body: JSON.stringify(datos),
            headers: {
              'Content-Type': 'application/json'
            }
          }; //Fetch
          _context4.next = 12;
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
        case 12:
          result = _context4.sent;
          _context4.next = 18;
          break;
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](5);
          console.log("Informacion no insertada: " + _context4.t0);
        case 18:
          res.redirect("MisPaseos");
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[5, 15]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

//BUSCAR PASEO
dash.get("/BuscarPaseo", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!req.cookies.token) {
            _context5.next = 28;
            break;
          }
          _context5.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Datos de las cookies
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context5.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context5.sent;
          _context5.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context5.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context5.next = 16;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 16:
          resultPaseo = _context5.sent;
          _context5.next = 19;
          return resultPaseo.json();
        case 19:
          paseo = _context5.sent;
          res.render("dashViews/BuscarPaseo", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "paseo": paseo
          });
          _context5.next = 26;
          break;
        case 23:
          _context5.prev = 23;
          _context5.t0 = _context5["catch"](1);
          res.redirect("/v1/dueno/salir");
        case 26:
          _context5.next = 29;
          break;
        case 28:
          res.redirect("/v1/dueno/salir");
        case 29:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 23]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

//AÑADIRPERRO
dash.get("/AnadirPerro", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var token, nombre, foto, email, vacunas, rutaUsuario, resultUsuario, usuario;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (!req.cookies.token) {
            _context6.next = 22;
            break;
          }
          _context6.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // array de vacunas
          vacunas = ["Rabia", "Moquillo canino", "Parvovirus", "Adenovirus canino tipo 2", "Leptospirosis", "Tos de las perreras"]; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context6.next = 10;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 10:
          resultUsuario = _context6.sent;
          _context6.next = 13;
          return resultUsuario.json();
        case 13:
          usuario = _context6.sent;
          res.render("dashViews/AnadirPerro", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "mnu": 0,
            "email": email,
            "usuario": usuario,
            "perros": _perros["default"],
            //Importado desde perros.json
            "vacunas": vacunas
          });
          _context6.next = 20;
          break;
        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](1);
          res.redirect("/v1/dueno/salir");
        case 20:
          _context6.next = 23;
          break;
        case 22:
          res.redirect("/v1/dueno/salir");
        case 23:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 17]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

//MISPERROS
dash.get("/MisPerros", /*#__PURE__*/function () {
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
          //Si no tiene cuenta, será redirigido para crear una
          if (usuario == false) {
            res.redirect("Configuracion");
          } else {
            res.render("dashViews/MisPerros", {
              "rol": "dueno",
              "nombre": nombre,
              "foto": foto,
              "email": email,
              "usuario": usuario
            });
          }
          _context7.next = 19;
          break;
        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](1);
          res.redirect("/v1/dueno/salir");
        case 19:
          _context7.next = 22;
          break;
        case 21:
          res.redirect("/v1/dueno/salir");
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

//CONFIGURACIÓN
//Vista para que el usuario cree o actualize su perfil
dash.get("/Configuracion", /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (!req.cookies.token) {
            _context8.next = 21;
            break;
          }
          _context8.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
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
          res.render("dashViews/Configuracion", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "mnu": 0,
            "email": email,
            "usuario": usuario,
            "lugaresRecomendados": _lugaresRecomendados["default"]
          });
          _context8.next = 19;
          break;
        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](1);
          res.redirect("/v1/dueno/salir");
        case 19:
          _context8.next = 22;
          break;
        case 21:
          res.redirect("/v1/dueno/salir");
        case 22:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[1, 16]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());

//Creación y actualización del perfil del usuario
dash.post("/Configuracion", /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var user, url, metodo, datos, id, option, result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
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
          _context9.prev = 2;
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
          _context9.next = 10;
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
          result = _context9.sent;
          _context9.next = 16;
          break;
        case 13:
          _context9.prev = 13;
          _context9.t0 = _context9["catch"](2);
          console.log("Informacion no insertada: " + _context9.t0);
        case 16:
          res.redirect("MisPaseos");
        case 17:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[2, 13]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());

// TERMINOS
dash.get("/Terminos", /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var token, nombre, foto, email;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          if (req.cookies.token) {
            try {
              token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
              nombre = token.nombre;
              foto = token.foto;
              email = token.email;
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
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());

// REPORTES
dash.get("/Reportes", /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var token, nombre, foto, email;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          if (req.cookies.token) {
            try {
              token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
              nombre = token.nombre;
              foto = token.foto;
              email = token.email;
              res.render("dashViews/reportes", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "email": email
              });
            } catch (error) {
              res.redirect("/v1/dueno/salir");
            }
          } else {
            res.redirect("/v1/dueno/salir");
          }
        case 1:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());

//PERFIL
dash.get("/Perfil", /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          if (!req.cookies.token) {
            _context12.next = 28;
            break;
          }
          _context12.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Información de las cookies
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context12.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context12.sent;
          _context12.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context12.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context12.next = 16;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 16:
          resultPaseo = _context12.sent;
          _context12.next = 19;
          return resultPaseo.json();
        case 19:
          paseo = _context12.sent;
          res.render("dashViews/Perfil", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "paseo": paseo
          });
          _context12.next = 26;
          break;
        case 23:
          _context12.prev = 23;
          _context12.t0 = _context12["catch"](1);
          res.redirect("/v1/dueno/salir");
        case 26:
          _context12.next = 29;
          break;
        case 28:
          res.redirect("/v1/dueno/salir");
        case 29:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[1, 23]]);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());

//VER PERFIL ESPECIFICO
dash.get("/Perfil/:id", /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPerfil, resultPerfil, perfil, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          if (!req.cookies.token) {
            _context13.next = 35;
            break;
          }
          _context13.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Información de las cookies
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
          rutaUsuario = process.env.API + "usuarios/" + email;
          _context13.next = 9;
          return (0, _nodeFetch["default"])(rutaUsuario);
        case 9:
          resultUsuario = _context13.sent;
          _context13.next = 12;
          return resultUsuario.json();
        case 12:
          usuario = _context13.sent;
          // Fetch del Perfil
          rutaPerfil = process.env.API + "usuarios/" + req.params.id;
          _context13.next = 16;
          return (0, _nodeFetch["default"])(rutaPerfil);
        case 16:
          resultPerfil = _context13.sent;
          _context13.next = 19;
          return resultPerfil.json();
        case 19:
          perfil = _context13.sent;
          // Fetch de los paseos
          rutaPaseo = process.env.API + "paseo/";
          _context13.next = 23;
          return (0, _nodeFetch["default"])(rutaPaseo);
        case 23:
          resultPaseo = _context13.sent;
          _context13.next = 26;
          return resultPaseo.json();
        case 26:
          paseo = _context13.sent;
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
          _context13.next = 33;
          break;
        case 30:
          _context13.prev = 30;
          _context13.t0 = _context13["catch"](1);
          res.redirect("/v1/dueno/salir");
        case 33:
          _context13.next = 36;
          break;
        case 35:
          res.redirect("/v1/dueno/salir");
        case 36:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[1, 30]]);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());

//PDF
dash.get("/Reporte", /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario, rutaPaseo, resultPaseo, paseo;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          if (!req.cookies.token) {
            _context14.next = 28;
            break;
          }
          _context14.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY); // Información de las cookies
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
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
          res.render("dashViews/Reporte", {
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
          res.redirect("/v1/dueno/salir");
        case 26:
          _context14.next = 29;
          break;
        case 28:
          res.redirect("/v1/dueno/salir");
        case 29:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[1, 23]]);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());

// CHAT
dash.get("/Chat", /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var token, nombre, foto, email, rutaUsuario, resultUsuario, usuario;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          if (!req.cookies.token) {
            _context15.next = 21;
            break;
          }
          _context15.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
          nombre = token.nombre;
          foto = token.foto;
          email = token.email; // Fetch del usuario
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
          res.redirect("/v1/dueno/salir");
        case 19:
          _context15.next = 22;
          break;
        case 21:
          res.redirect("/v1/dueno/salir");
        case 22:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[1, 16]]);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());

//v1/dueno/salir
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
            res.redirect("/v1/dueno/salir")
        }
    }else{
        res.redirect("/v1/dueno/salir")
    }
});*/
var _default = dash;
exports["default"] = _default;