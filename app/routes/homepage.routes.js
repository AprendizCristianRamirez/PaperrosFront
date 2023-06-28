import { Router } from "express";

const home = Router();

home.get("/", (req, res)=>{
    res.render("homeViews/Inicio.ejs", {
        "titulo":"Paperros", "activo":1,
        "google": proccess.env.GOOGLE_LOGIN
    });
});
home.get("/Acerca", (req, res)=>{
    res.render("homeViews/Acerca", {
        "titulo":"Paperros","activo":2,
        "google": proccess.env.GOOGLE_LOGIN
    });
});
home.get("/Servicios", (req, res)=>{
    res.render("homeViews/servicios", {
        "titulo":"Paperros","activo":3,
        "google": proccess.env.GOOGLE_LOGIN
    });
});
home.get("/Paseadores", (req, res)=>{
    res.render("homeViews/paseadores", {
        "titulo":"Paperros","activo":4,
        "google": proccess.env.GOOGLE_LOGIN
    });
});
home.get("/Contactanos", (req, res)=>{
    res.render("homeViews/contactanos", {
        "titulo":"Paperros","activo":5,
        "google": proccess.env.GOOGLE_LOGIN,
        "api": proccess.env.API
        });
});

home.get("/Registro", (req, res)=>{
    res.render("homeViews/registro", {
        "titulo":"Paperros","activo":7,
        "google": proccess.env.GOOGLE_LOGIN
        });
});

export default home;