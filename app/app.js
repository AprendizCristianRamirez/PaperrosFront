//IMPORTAR LIBRERIAS
import express from "express";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from 'url';
import { loginRouter } from "./routes/login.routes.js";
import passport from "passport";
import cookieparser from "cookie-parser";
import bodyParser from "body-parser";
import "./config/middlewares/google.js"

//RUTAS
import dashAdmin from "./routes/dashAdmin.routes.js";
import dashPaseador from "./routes/dashPaseador.routes.js";
import dashDueno from "./routes/dashDueno.routes.js";
import home from "./routes/homepage.routes.js";

//INICIALIZACION
dotenv.config();
const app = express();
//const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

//CONFIGURACION
app.set("port",process.env.PORT);
app.set("view engine", "ejs");
app.set("views",path.resolve(path.join(__dirname, "app", "views")));
app.use(bodyParser.urlencoded({ extended: false }));

//middleware
app.use(express.static("./public"));
app.use("/",home);
app.use(passport.initialize());
app.use(cookieparser());

//RUTAS
app.use("/v1/dueno", dashDueno);
app.use("/v1/paseador", dashPaseador);
app.use("/v1/admin", dashAdmin);
app.get("/", (req, res)=>{
    res.render("home");
})

app.use("/auth", passport.authenticate("auth-google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
    session: false,
}), loginRouter);

export default app;