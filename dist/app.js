"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _ejs = _interopRequireDefault(require("ejs"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _loginRoutes = require("./routes/login.routes.js");
var _passport = _interopRequireDefault(require("passport"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
require("./config/middlewares/google.js");
var _dashAdminRoutes = _interopRequireDefault(require("./routes/dashAdmin.routes.js"));
var _dashPaseadorRoutes = _interopRequireDefault(require("./routes/dashPaseador.routes.js"));
var _dashDuenoRoutes = _interopRequireDefault(require("./routes/dashDueno.routes.js"));
var _homepageRoutes = _interopRequireDefault(require("./routes/homepage.routes.js"));
//IMPORTAR LIBRERIAS

//RUTAS

//INICIALIZACION
_dotenv["default"].config();
var app = (0, _express["default"])();
//const __filename = fileURLToPath(import.meta.url);
var _dirname = _path["default"].resolve();

//CONFIGURACION
app.set("port", process.env.PORT);
app.set("view engine", "ejs");
app.set("views", _path["default"].resolve(_path["default"].join(_dirname, "app", "views")));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));

//middleware
app.use(_express["default"]["static"]("./public"));
app.use("/", _homepageRoutes["default"]);
app.use(_passport["default"].initialize());
app.use((0, _cookieParser["default"])());

//RUTAS
app.use("/v1/dueno", _dashDuenoRoutes["default"]);
app.use("/v1/paseador", _dashPaseadorRoutes["default"]);
app.use("/v1/admin", _dashAdminRoutes["default"]);
app.get("/", function (req, res) {
  res.render("home");
});
app.use("/auth", _passport["default"].authenticate("auth-google", {
  scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
  session: false
}), _loginRoutes.loginRouter);
var _default = app;
exports["default"] = _default;