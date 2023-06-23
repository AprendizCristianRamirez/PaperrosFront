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
              "mnu": 0,
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
          res.redirect("/Ingresa");
        case 28:
          _context.next = 32;
          break;
        case 30:
          console.log("Error de token");
          res.redirect("/Ingresa");
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
dash.get("/CrearPaseo", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/CrearPaseo", {
        "rol": "dueno",
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
dash.get("/RutasPaseadores", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/RutasPaseadores", {
        "rol": "dueno",
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

//AÑADIRPERRO
dash.get("/AnadirPerro", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/AnadirPerro", {
        "rol": "dueno",
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

//MISPERROS
dash.get("/MisPerros", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/MisPerros", {
        "rol": "dueno",
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

//CONFIGURACIÓN
//Vista para que el usuario cree o actualize su perfil
dash.get("/Configuracion", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var token, nombre, foto, email, ruta, result, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!req.cookies.token) {
            _context2.next = 21;
            break;
          }
          _context2.prev = 1;
          token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
          nombre = token.nombre;
          foto = token.foto;
          email = token.email;
          ruta = process.env.API + "usuarios/" + email;
          _context2.next = 9;
          return (0, _nodeFetch["default"])(ruta);
        case 9:
          result = _context2.sent;
          _context2.next = 12;
          return result.json();
        case 12:
          data = _context2.sent;
          //console.log(data);

          res.render("dashViews/Configuracion", {
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "mnu": 0,
            "email": email,
            "usuario": data
          });
          _context2.next = 19;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](1);
          res.redirect("/Ingresa");
        case 19:
          _context2.next = 22;
          break;
        case 21:
          res.redirect("/Ingresa");
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 16]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

//Creación y actualización del perfil del usuario
dash.post("/Configuracion", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user, url, metodo, datos, id, option, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          //Campos del usuario
          user = {
            //Asignar los campos de los inputs al objeto user
            nombre: req.body.nombre,
            //apellidos: req.body.apellidos,
            municipio: req.body.municipio,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            edad: req.body.edad,
            pais: req.body.pais,
            email: req.body.email
          };
          _context3.prev = 1;
          url = process.env.API + "usuarios";
          metodo = "post";
          datos = {
            nombre: user.nombre,
            //apellidos: user.apellidos,
            municipio: user.municipio,
            direccion: user.direccion,
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
              apellidos: user.apellidos,
              municipio: user.municipio,
              direccion: user.direccion,
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
          _context3.next = 9;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            console.log(data);
            if (data[0].affectedRows > 0) {
              console.log("Los datos fueron insertados");
              //console.log("Metodo: " + option.method);
            } else {
              console.log("No se inserto");
              //console.log("Metodo: " + option.method);
            }
          }).then(function (error) {
            console.log("Ha habido un error: " + error);
          });
        case 9:
          result = _context3.sent;
          _context3.next = 15;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          console.log("Informacion no insertada: " + _context3.t0);
          //console.log("Metodo: " + option.method);
        case 15:
          res.redirect("MisPaseos");
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 12]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
dash.get("/Terminos", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/Terminos", {
        "rol": "dueno",
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

//PERFIL
dash.get("/Perfil", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/Perfil", {
        "rol": "dueno",
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
dash.get("/Chat", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/chat", {
        "rol": "dueno",
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

//SALIR
dash.get("/salir", function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
});

//Esto hay que bananearlo cuando acabemos xd
dash.get("/users", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var token, nombre, foto;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (req.cookies.token) {
            try {
              token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
              nombre = token.nombre;
              foto = token.foto;
              /*let ruta = process.env.API + "users";
              let info;
              const result = await fetch(ruta)
              .then(resp => resp.json())
              .then(data =>{
                  info = data
              })
                console.log(info);*/
              res.render("dashboard", {
                "nombre": nombre,
                "foto": foto,
                "mnu": 2
              });
            } catch (error) {
              res.redirect("/Ingresa");
            }
          } else {
            res.redirect("/Ingresa");
          }
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
dash.get("/Terminos", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/Terminos", {
        "rol": "dueno",
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
dash.get("/usuario-edit", (req, res)=>{
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