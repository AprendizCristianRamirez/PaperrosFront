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
require("node-fetch");
var dash = (0, _express.Router)();
dash.get("/MisPaseos", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/MisPaseos", {
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
dash.get("/Configuracion", function (req, res) {
  if (req.cookies.token) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.token, process.env.SECRET_KEY);
      var nombre = token.nombre;
      var foto = token.foto;
      res.render("dashViews/Configuracion", {
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
dash.get("/salir", function (req, res) {
  res.clearCookie("token");
  res.redirect("/");
});
dash.get("/users", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, nombre, foto;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
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
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

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