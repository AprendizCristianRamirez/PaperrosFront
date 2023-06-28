import { Router } from "express";
import cookieparser from "cookie-parser";
import jwt from "jsonwebtoken";
import fetch from 'node-fetch';

const dash = Router();

//MISPASEOS
dash.get("/AdminUsuarios", async (req, res) => {
    if (req.cookies.token) {
        try {
            //Verificación del token
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
            )
            // Datos de las cookies
            let nombre = token.nombre;
            let foto = token.foto;
            let email = token.email;

            // Fetch del usuario
            let rutaUsuario = process.env.API + "/usuarios/";
            const resultUsuario = await fetch(rutaUsuario)
            const usuario = await resultUsuario.json();

            // Fetch del usuario
            let rutaDelete = process.env.API + "/usuarios/:id";
            const resultDelete = await fetch(rutaDelete)
            const deleteUsuario = await resultDelete.json();

            //Si no tiene cuenta, será redirigido para crear una
            if (usuario == false) {
                res.redirect("Configuracion");
            } else {
                res.render("dashViews/adminUsuarios", {
                    "nombre": nombre,
                    "foto": foto,
                    "email": email,
                    "usuario": usuario,
                    "deleteUsuario": deleteUsuario
                });
            }
        } catch (error) {
            console.log(error + "Error de cookies/fetch")
            res.redirect("/Salir")
        }
    } else {
        console.log("Error de token")
        res.redirect("/Salir")
    }
});

dash.get("/AdminInformes", async (req, res) => {
    if (req.cookies.token) {
        try {
            //Verificación del token
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
            )
            // Datos de las cookies
            let nombre = token.nombre;
            let foto = token.foto;
            let email = token.email;

            // Fetch del usuario
            let rutaUsuario = process.env.API + "usuarios/";
            const resultUsuario = await fetch(rutaUsuario)
            const usuario = await resultUsuario.json();

            //Si no tiene cuenta, será redirigido para crear una
            if (usuario == false) {
                res.redirect("Configuracion");
            } else {
                res.render("dashViews/AdminInformes", {
                    "nombre": nombre,
                    "foto": foto,
                    "email": email,
                    "usuario": usuario,
                });
            }
        } catch (error) {
            console.log(error + "Error de cookies/fetch")
            res.redirect("/Salir")
        }
    } else {
        console.log("Error de token")
        res.redirect("/Salir")
    }
});

dash.get("/AdminReportes", async (req, res) => {
    if (req.cookies.token) {
        try {
            //Verificación del token
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
            )
            // Datos de las cookies
            let nombre = token.nombre;
            let foto = token.foto;
            let email = token.email;

            // Fetch del usuario
            let rutaUsuario = process.env.API + "usuarios/";
            const resultUsuario = await fetch(rutaUsuario)
            const usuario = await resultUsuario.json();

            //Si no tiene cuenta, será redirigido para crear una
            if (usuario == false) {
                res.redirect("Configuracion");
            } else {
                res.render("dashViews/AdminReportes", {
                    "nombre": nombre,
                    "foto": foto,
                    "email": email,
                    "usuario": usuario,
                });
            }
        } catch (error) {
            console.log(error + "Error de cookies/fetch")
            res.redirect("/Salir")
        }
    } else {
        console.log("Error de token")
        res.redirect("/Salir")
    }
});

dash.get("/salir", (req, res) => {
    res.clearCookie("token");
    res.redirect("/")
})

export default dash;