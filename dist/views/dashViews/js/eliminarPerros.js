"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
// Ejecución del de la configuración e inicialización de Firebase desde js/firebase.js invocada por EJS
// Función del formulario
function eliminarPerro(_x) {
  return _eliminarPerro.apply(this, arguments);
}
function _eliminarPerro() {
  _eliminarPerro = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(idPerro) {
    var id, nombre, raza, comportamiento, vacunas, estatura, peso, perros;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // Datos del formulario
          id = document.querySelector('#id').value;
          nombre = document.querySelector('#nombre' + idPerro).value;
          raza = document.querySelector('#raza' + idPerro).value;
          comportamiento = document.querySelector('#comportamiento' + idPerro).value;
          vacunas = document.querySelector('#vacunas' + idPerro).value;
          estatura = document.querySelector('#estatura' + idPerro).value;
          peso = document.querySelector('#peso' + idPerro).value; // Objeto con los datos del perro
          perros = {
            "nombre": nombre,
            "raza": raza,
            "comportamiento": comportamiento,
            "vacunas": vacunas,
            "estatura": estatura,
            "peso": peso
          }; // Inserción del perro en el array de perros del usuario
          _context.prev = 8;
          _context.next = 11;
          return db.collection('usuario').doc(id).update({
            // arrayUnion() funciona insertando el dato dentro del parametro al array indicado (perros)
            perros: firebase.firestore.FieldValue.arrayRemove(perros)
          });
        case 11:
          window.location.href = "/v1/dueno/MisPerros";
          _context.next = 17;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](8);
          console.error('Error al insertar perro:', _context.t0);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[8, 14]]);
  }));
  return _eliminarPerro.apply(this, arguments);
}
;