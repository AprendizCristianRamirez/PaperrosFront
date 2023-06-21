"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app.js"));
var _index = _interopRequireDefault(require("./config/index.js"));
_app["default"].listen(_app["default"].get("port"), _index["default"]);