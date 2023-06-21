"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _path = _interopRequireDefault(require("path"));
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config({
  path: _path["default"].resolve(__dirname, "".concat(process.env.NODE_ENV, ".env"))
});