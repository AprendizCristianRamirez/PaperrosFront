import {Router} from "express";
import cookieparser from "cookie-parser";
import jwt from "jsonwebtoken";
import fetch from 'node-fetch';
import lugaresRecomendados from "../config/lugaresRecomendados.json";

const dash = Router();

//MIS PASEOS
dash.get("/MisPaseos", async(req, res)=>{
    if(req.cookies.token){
        try{
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
                )
                // Datos de las cookies
                let nombre = token.nombre;
                let foto = token.foto;
                let id = token.id;
                let email = token.email;

                // Fetch del usuario
                let rutaUsuario = process.env.API + "usuarios/" + email;
                const resultUsuario = await fetch(rutaUsuario)
                const usuario = await resultUsuario.json();

                // Fetch de los paseos
                let rutaPaseo = process.env.API + "paseo/";
                const resultPaseo = await fetch(rutaPaseo)
                const paseo = await resultPaseo.json();
                
                res.render("dashViews/MisPaseos",{
                    "rol": "paseador",
                    "nombre": nombre,
                    "foto": foto,
                    "email": email,
                    "usuario": usuario,
                    "paseo": paseo
                }
            );
        } catch (error){
            res.redirect("/Ingresa")
        }
    }else{
        res.redirect("/Ingresa")
    }
});

dash.get("/Paseando/:id", async(req, res)=>{
    if(req.cookies.token){
        try{
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
                )
                // Datos de las cookies
                let nombre = token.nombre;
                let foto = token.foto;
                let email = token.email;

                let paseoId = req.params.id;

                // Fetch del usuario
                let rutaUsuario = process.env.API + "usuarios/" + email;
                const resultUsuario = await fetch(rutaUsuario)
                const usuario = await resultUsuario.json();

                // Fetch de los paseos
                let rutaPaseo = process.env.API + "paseo/" + paseoId;
                const resultPaseo = await fetch(rutaPaseo)
                const paseo = await resultPaseo.json();
                
                res.render("dashViews/Paseando",{
                    "rol": "paseador",
                    "nombre": nombre,
                    "foto": foto,
                    "email": email,
                    "usuario": usuario,
                    "paseo": paseo
                }
            );
        } catch (error){
            res.redirect("/Ingresa")
        }
    }else{
        res.redirect("/Ingresa")
    }
});

//Eliminar paseo
dash.get("/BorrarPaseo/:id", async (req, res)=>{
    //Tomar id del paseo
    const id = req.params.id;
    // Invocar API para borrar paseo con el id
    const url = process.env.API + "/paseo/" + id;
    // Describir metodo
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
    res.redirect("/v1/dueno/MisPaseos")
});

//CREARPASEO
//Vista para crear paseo
dash.get("/CrearPaseo", async (req, res) => {
    if (req.cookies.token) {
        try {
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
            )
            let nombre = token.nombre;
            let foto = token.foto;
            let email = token.email;

            // Fetch del usuario
            let rutaUsuario = process.env.API + "usuarios/" + email;
            const resultUsuario = await fetch(rutaUsuario)
            const usuario = await resultUsuario.json();

            res.render("dashViews/CrearPaseo", {
                "rol": "paseador",
                "nombre": nombre,
                "foto": foto,
                "email": email,
                "usuario": usuario,
                "lugaresRecomendados": lugaresRecomendados
            })
        } catch (error) {
            res.redirect("/Salir")
        }
    } else {
        res.redirect("/Salir")
    }
});
//Creación del paseo
dash.post("/CrearPaseo", async (req, res) => {
    //Campos del usuario
    let paseo = {
        autor: req.body.paseadorEmailPaseo,
        titulo: req.body.tituloPaseo,
        descripcion: req.body.descripcionPaseo,
        destino: {
            _latitude: req.body.paseoLatitude,
            _longitude: req.body.paseoLongitude
        },
        nombre_destino: req.body.nombreDestinoPaseo,
        fecha: req.body.fechaPaseo,
        hora_fin: req.body.horaFinPaseo,
        hora_inicio: req.body.horaInicioPaseo,
        precio: req.body.precioPaseo,
        medio_de_pago: req.body.medioPagoPaseo,
        paseador: {
            email:req.body.paseadorEmailPaseo,
            img_paseador:req.body.paseadorImgPaseo,
            nombre:req.body.paseadorNombrePaseo
        },
        perro: [] //No hay perros porque los dueños los insertaran en el paseo
    }
    // Petición de POST o PUT del paseo
    try {
        const url = process.env.API + "paseo";
        let metodo = "post";
        let datos = {
            autor: paseo.autor,
            titulo: paseo.titulo,
            descripcion: paseo.descripcion,
            destino: {
                _latitude:paseo.destino._latitude,
                _longitude: paseo.destino._longitude
            },
            tipo: "manada",
            estado: "confirmado",
            nombre_destino: paseo.nombre_destino,
            fecha: paseo.fecha,
            hora_fin: paseo.hora_fin,
            hora_inicio: paseo.hora_inicio,
            precio: paseo.precio,
            medio_de_pago: paseo.medio_de_pago,
            paseador: paseo.paseador,
            perro: []
        };
        //Si el campo tiene un id, será metodo put (actualizar)
        if (req.body.id) {
            const id = req.body.id;
            metodo = "put";
            datos = {
                autor: paseo.autor,
                titulo: paseo.titulo,
                descripcion: paseo.descripcion,
                destino: {
                    _latitude:paseo.destino._latitude,
                    _longitude: paseo.destino._longitude
                },
                tipo: "manada",
                estado: "programado",
                nombre_destino: paseo.nombre_destino,
                fecha: paseo.fecha,
                hora_fin: paseo.hora_fin,
                hora_inicio: paseo.hora_inicio,
                precio: paseo.precio,
                medio_de_pago: paseo.medio_de_pago,
                paseador: paseo.paseador,
                perro: []
            }
        }
        //Configuración del fetch
        const option = {
            method: metodo, //En metodo iria post si no tiene id y post en el caso contrario
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //Fetch
        const result = await fetch(url, option)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data[0].affectedRows > 0) {
                    console.log("Los datos fueron insertados");
                } else {
                    console.log("No se inserto");
                }
            })
            .then(error => { console.log("Ha habido un error: " + error); })
    } catch (error) {
        console.log("Informacion no insertada: " + error);
    }

    res.redirect("MisPaseos")
});

dash.get("/BuscarPaseo", async (req, res)=>{
    if(req.cookies.token){
        try{
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
                )
                // Datos de las cookies
                let nombre = token.nombre;
                let foto = token.foto;
                let email = token.email;

                // Fetch del usuario
                let rutaUsuario = process.env.API + "usuarios/" + email;
                const resultUsuario = await fetch(rutaUsuario)
                const usuario = await resultUsuario.json();

                // Fetch de los paseos
                let rutaPaseo = process.env.API + "paseo/";
                const resultPaseo = await fetch(rutaPaseo)
                const paseo = await resultPaseo.json();
                
                res.render("dashViews/BuscarPaseo",{
                "rol": "paseador",
                "nombre": nombre,
                "foto": foto,
                "email": email,
                "usuario": usuario,
                "paseo": paseo

            });
        } catch (error){
            res.redirect("/Ingresa")
        }
    }else{
        res.redirect("/Ingresa")
    }
});

dash.get("/Configuracion", async(req, res)=>{
    if(req.cookies.token){
        try{
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
                )
                let nombre = token.nombre;
                let foto = token.foto;
                let email = token.email;
                
                // Fetch del usuario
                let rutaUsuario = process.env.API + "usuarios/" + email;
                const resultUsuario = await fetch(rutaUsuario)
                const usuario = await resultUsuario.json();
                
                res.render("dashViews/Configuracion",{
                "rol": "paseador",
                "nombre": nombre,
                "foto": foto,
                "email": email,
                "usuario": usuario

            });
        } catch (error){
            res.redirect("/Ingresa")
        }
    }else{
        res.redirect("/Ingresa")
    }
});

dash.get("/Terminos", (req, res)=>{
    if(req.cookies.token){
        try{
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
                )
                let nombre = token.nombre;
                let foto = token.foto;

                res.render("dashViews/Terminos",{
                "rol": "paseador",
                "nombre": nombre,
                "foto": foto,
                "mnu":0

            });
        } catch (error){
            res.redirect("/Ingresa")
        }
    }else{
        res.redirect("/Ingresa")
    }
});

dash.get("/Perfil", (req, res)=>{
    if(req.cookies.token){
        try{
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
                )
                let nombre = token.nombre;
                let foto = token.foto;
                
                res.render("dashViews/Perfil",{
                "rol": "paseador",
                "nombre": nombre,
                "foto": "foto",
                "mnu":0

            });
        } catch (error){
            res.redirect("/Ingresa")
        }
    }else{
        res.redirect("/Ingresa")
    }
}); 

//VER PERFIL ESPECIFICO
dash.get("/Perfil/:id", async (req, res) => {
    if (req.cookies.token) {
        try {
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
            )
            // Información de las cookies
            let nombre = token.nombre;
            let foto = token.foto;
            let email = token.email;

            // Fetch del usuario
            let rutaUsuario = process.env.API + "usuarios/" + email;
            const resultUsuario = await fetch(rutaUsuario)
            const usuario = await resultUsuario.json();

            // Fetch del Perfil
            let rutaPerfil = process.env.API + "usuarios/" + req.params.id;
            const resultPerfil = await fetch(rutaPerfil)
            const perfil = await resultPerfil.json();

            // Fetch de los paseos
            let rutaPaseo = process.env.API + "paseo/";
            const resultPaseo = await fetch(rutaPaseo)
            const paseo = await resultPaseo.json();

            res.render("dashViews/Perfil", {
                "rol": "paseador",
                "nombre": nombre,
                "foto": foto,
                "email": email,
                "usuario": usuario,
                "paseo": paseo,
                "perfil": perfil,
                "idPerfil": req.params.id
            });

        } catch (error) {
            res.redirect("/Salir")
        }
    } else {
        res.redirect("/Salir")
    }
});

dash.get("/Chat", (req, res)=>{
    if(req.cookies.token){
        try{
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
                )
                let nombre = token.nombre;
                let foto = token.foto;
                
                res.render("dashViews/chat",{
                "rol": "paseador",
                "nombre": nombre,
                "foto": "foto",
                "mnu":0

            });
        } catch (error){
            res.redirect("/Ingresa")
        }
    }else{
        res.redirect("/Ingresa")
    }
});

dash.get("/salir", (req, res)=>{
    res.clearCookie("token");
    res.redirect("/")
})

dash.get("/Terminos", (req, res)=>{
    if(req.cookies.token){
        try{
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
                )
                let nombre = token.nombre;
                let foto = token.foto;
                
                res.render("dashViews/Terminos",{
                "rol": "paseador",
                "nombre": nombre,
                "foto": foto,
                "mnu":0

            });
        } catch (error){
            res.redirect("/Ingresa")
        }
    }else{
        res.redirect("/Ingresa")
    }
});

export default dash;