"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
// Ejecución del de la configuración e inicialización de Firebase desde js/firebase.js invocada por EJS

// Función del formulario
var form = document.getElementById('anadirPerro');
form.addEventListener('submit', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
    var id, nombre, raza, comportamiento, vacunas, estatura, peso, perros;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();

          // Datos del formulario
          id = document.querySelector('#id').value;
          nombre = document.querySelector('#nombre').value;
          raza = document.querySelector('#raza').value;
          comportamiento = document.querySelector('#comportamiento').value;
          vacunas = document.querySelector('#vacunas').value;
          estatura = document.querySelector('#estatura').value;
          peso = document.querySelector('#peso').value; // Objeto con los datos del perro
          perros = {
            "nombre": nombre,
            "raza": raza,
            "comportamiento": comportamiento,
            "vacunas": vacunas,
            "estatura": estatura,
            "peso": peso
          }; // Inserción del perro en el array de perros del usuario
          _context.prev = 9;
          _context.next = 12;
          return db.collection('usuario').doc(id).update({
            // arrayUnion() funciona insertando el dato dentro del parametro al array indicado (perros)
            perros: firebase.firestore.FieldValue.arrayUnion(perros)
          });
        case 12:
          window.location.href = "/v1/dueno/MisPerros";
          _context.next = 18;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](9);
          console.error('Error al insertar perro:', _context.t0);
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[9, 15]]);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());