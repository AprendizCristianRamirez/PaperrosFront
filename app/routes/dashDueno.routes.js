import { Router, urlencoded } from "express";
import cookieparser from "cookie-parser";
import jwt from "jsonwebtoken";
import fetch from 'node-fetch';
import perros from "../config/perros.json";
import lugaresRecomendados from "../config/lugaresRecomendados.json";

const dash = Router();

//MIS PASEOS
dash.get("/MisPaseos", async (req, res) => {
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

            //Si no tiene cuenta, será redirigido para crear una
            if (usuario == false) {
                res.redirect("Configuracion");
            } else {
                res.render("dashViews/MisPaseos", {
                    "rol": "dueno",
                    "nombre": nombre,
                    "foto": foto,
                    "email": email,
                    "usuario": usuario,
                    "paseo": paseo
                });
            }
        } catch (error) {
            console.log(error + "Error de cookies/fetch")
            res.redirect("/v1/dueno/salir")
        }
    } else {
        console.log("Error de token")
        res.redirect("/v1/dueno/salir")
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

            // Fetch de los paseos
            let rutaPaseo = process.env.API + "paseo/";
            const resultPaseo = await fetch(rutaPaseo)
            const paseo = await resultPaseo.json();

            res.render("dashViews/CrearPaseo", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "email": email,
                "usuario": usuario,
                "lugaresRecomendados": lugaresRecomendados
            });
        } catch (error) {
            res.redirect("/v1/dueno/salir")
        }
    } else {
        res.redirect("/v1/dueno/salir")
    }
});

//Creación del paseo
dash.post("/CrearPaseo", async (req, res) => {

    //Datos del usuario dueño de los perros
    const usuario = {
        nombre_dueno: req.body.duenoNombrePaseo,
        foto_dueno: req.body.duenoFotoPaseo,
        email: req.body.duenoEmailPaseo,
        localizacion: {
            _latitude: req.body.duenoLatitude,
            _longitude: req.body.duenoLongitude
        }
    }

    //Información de los perros seleccionados
    //Este datos es un array de strings
    //por ejemplo: ['{"raza": "Golden", "nombre": "Martina"...}', '{"raza": "Golden", "nombre": "Martina"...}', '{"raza": "Bulldog"...]
    const checkedPerros = req.body.perros;
    let perrosArray = [];
    let perroObjeto;

    if (Array.isArray(checkedPerros)) {
        //Aqui se convierte ese array de strings a un array de objetos con cada posición de checkedPerros
        perrosArray = checkedPerros.map((item) => JSON.parse(item));
        //Añadir información del usuario a los perros
        for (let i = 0; i < perrosArray.length; i++) {
            perrosArray[i].nombre_dueno = usuario.nombre_dueno;
            perrosArray[i].foto_dueno = usuario.foto_dueno;
            perrosArray[i].email = usuario.email;
            perrosArray[i].localizacion = usuario.localizacion;
        }
      } else {
        // Si es un objeto (Un solo perro)
        perroObjeto = JSON.parse(checkedPerros);
        //Añadir información del usuario al perro
        perroObjeto.nombre_dueno = usuario.nombre_dueno;
        perroObjeto.foto_dueno = usuario.foto_dueno;
        perroObjeto.email = usuario.email;
        perroObjeto.localizacion = usuario.localizacion;
        // Insertar el objeto en el array final
        perrosArray[0] = perroObjeto;
    }
    
    //Campos del usuario
    let paseo = {
        autor: req.body.duenoEmailPaseo,
        titulo: req.body.tituloPaseo,
        descripcion: req.body.descripcionPaseo,
        destino: {
            _latitude: req.body.paseoLatitude,
            _longitude: req.body.paseoLongitude
        },
        nombre_destino: req.body.nombreDestinoPaseo,
        fechaPaseo: req.body.fechaPaseo,
        hora_fin: req.body.horaFinPaseo,
        hora_inicio: req.body.horaInicioPaseo,
        precio: req.body.precioPaseo,
        medio_de_pago: req.body.medioPagoPaseo,
        //paseador: { No se usa porque estamos creando un paseo personalizado (que debe tomar el paseador)
        //    id_paseador:req.body.paseadorIdPaseo,
        //    img_paseador:req.body.paseadorImgPaseo,
        //    nombre_paseador:req.body.paseadorNombrePaseo
        //},
        perro: perrosArray
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
            tipo: "personalizado",
            estado: "confirmado",
            nombre_destino: paseo.nombre_destino,
            fechaPaseo: paseo.fechaPaseo,
            hora_fin: paseo.hora_fin,
            hora_inicio: paseo.hora_inicio,
            precio: paseo.precio,
            medio_de_pago: paseo.medio_de_pago,
            paseador: { 
                //Vacio porque luego el paseador decide tomar el paseo
            },
            perro: paseo.perro
        };
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

//BUSCAR PASEO
dash.get("/BuscarPaseo", async(req, res) => {
    if (req.cookies.token) {
        try {
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
            "rol": "dueno",
            "nombre": nombre,
            "foto": foto,
            "email": email,
            "usuario": usuario,
            "paseo": paseo
            });
        } catch (error) {
            res.redirect("/v1/dueno/salir")
        }
    } else {
        res.redirect("/v1/dueno/salir")
    }
});

//AÑADIRPERRO
dash.get("/AnadirPerro", async (req, res) => {
    if (req.cookies.token) {
        try {
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
            )
            let nombre = token.nombre;
            let foto = token.foto;
            let email = token.email;

            // array de vacunas
            const vacunas = ["Rabia", "Moquillo canino", "Parvovirus", 
            "Adenovirus canino tipo 2", "Leptospirosis", "Tos de las perreras"];

            // Fetch del usuario
            let rutaUsuario = process.env.API + "usuarios/" + email;
            const resultUsuario = await fetch(rutaUsuario)
            const usuario = await resultUsuario.json();

            res.render("dashViews/AnadirPerro", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "mnu": 0,
                "email": email,
                "usuario": usuario,
                "perros": perros, //Importado desde perros.json
                "vacunas": vacunas

            });
        } catch (error) {
            res.redirect("/v1/dueno/salir")
        }
    } else {
        res.redirect("/v1/dueno/salir")
    }
});

//MISPERROS
dash.get("/MisPerros", async (req, res) => {
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

            //Si no tiene cuenta, será redirigido para crear una
            if (usuario == false) {
                res.redirect("Configuracion");
            } else {
                res.render("dashViews/MisPerros", {
                    "rol": "dueno",
                    "nombre": nombre,
                    "foto": foto,
                    "email": email,
                    "usuario": usuario
                });
            }
        } catch (error) {
            res.redirect("/v1/dueno/salir")
        }
    } else {
        res.redirect("/v1/dueno/salir")
    }
});

//CONFIGURACIÓN
//Vista para que el usuario cree o actualize su perfil
dash.get("/Configuracion", async (req, res) => {
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

            res.render("dashViews/Configuracion", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "mnu": 0,
                "email": email,
                "usuario": usuario,
                "lugaresRecomendados": lugaresRecomendados
            });
        } catch (error) {
            res.redirect("/v1/dueno/salir")
        }
    } else {
        res.redirect("/v1/dueno/salir")
    }
});

//Creación y actualización del perfil del usuario
dash.post("/Configuracion", async (req, res) => {
    //Campos del usuario
    let user = {
        //Asignar los campos de los inputs al objeto user
        nombre: req.body.nombre,
        municipio: req.body.municipio,
        direccion: req.body.direccion,
        ubicacion: {
            _latitude: req.body.paseoLatitude,
            _longitude: req.body.paseoLongitude
        },
        telefono: req.body.telefono,
        edad: req.body.edad,
        pais: req.body.pais,
        email: req.body.email
    }
    console.log(user);
    try {
        const url = process.env.API + "usuarios";
        let metodo = "post";
        let datos = {
            nombre: user.nombre,
            municipio: user.municipio,
            direccion: user.direccion,
            paseoLatitude: user.ubicacion._latitude,
            paseoLongitude: user.ubicacion._longitude,
            telefono: user.telefono,
            edad: user.edad,
            pais: user.pais,
            id: user.email
        };
        //Si el campo tiene un id, será metodo put (actualizar)
        if (req.body.id) {
            const id = req.body.id;
            metodo = "put";
            datos = {
                nombre: user.nombre,
                municipio: user.municipio,
                direccion: user.direccion,
                paseoLatitude: user.ubicacion._latitude,
                paseoLongitude: user.ubicacion._longitude,
                telefono: user.telefono,
                edad: user.edad,
                pais: user.pais,
                id: user.email
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

// TERMINOS
dash.get("/Terminos", async (req, res) => {
    if (req.cookies.token) {
        try {
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
            )
            let nombre = token.nombre;
            let foto = token.foto;
            let email = token.email;

            res.render("dashViews/Terminos", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "email": email

            });
        } catch (error) {
            res.redirect("/Ingresa")
        }
    } else {
        res.redirect("/Ingresa")
    }
});

// REPORTES
dash.get("/Reportes", async (req, res) => {
    if (req.cookies.token) {
        try {
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
            )
            let nombre = token.nombre;
            let foto = token.foto;
            let email = token.email;

            res.render("dashViews/reportes", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "email": email

            });
        } catch (error) {
            res.redirect("/v1/dueno/salir")
        }
    } else {
        res.redirect("/v1/dueno/salir")
    }
});

//PERFIL
dash.get("/Perfil", async (req, res) => {
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

            // Fetch de los paseos
            let rutaPaseo = process.env.API + "paseo/";
            const resultPaseo = await fetch(rutaPaseo)
            const paseo = await resultPaseo.json();


            res.render("dashViews/Perfil", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "email": email,
                "usuario": usuario,
                "paseo": paseo

            });
        } catch (error) {
            res.redirect("/v1/dueno/salir")
        }
    } else {
        res.redirect("/v1/dueno/salir")
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
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "email": email,
                "usuario": usuario,
                "paseo": paseo,
                "perfil": perfil,
                "idPerfil": req.params.id
            });

        } catch (error) {
            res.redirect("/v1/dueno/salir")
        }
    } else {
        res.redirect("/v1/dueno/salir")
    }
});

//PDF
dash.get("/Reporte", async (req, res) => {
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

            // Fetch de los paseos
            let rutaPaseo = process.env.API + "paseo/";
            const resultPaseo = await fetch(rutaPaseo)
            const paseo = await resultPaseo.json();

            res.render("dashViews/Reporte", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "email": email,
                "usuario": usuario,
                "paseo": paseo,
                "perfil": usuario,
                "idPerfil": email
            });

        } catch (error) {
            res.redirect("/v1/dueno/salir")
        }
    } else {
        res.redirect("/v1/dueno/salir")
    }
});

// CHAT
dash.get("/Chat", async (req, res) => {
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
            const resultUsuario = await fetch(rutaUsuario);
            const usuario = await resultUsuario.json();

            res.render("dashViews/chat", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": "foto",
                "mnu": 0,
                "email": email

            });
        } catch (error) {
            res.redirect("/v1/dueno/salir")
        }
    } else {
        res.redirect("/v1/dueno/salir")
    }
});

//v1/dueno/salir
dash.get("/salir", (req, res) => {
    res.clearCookie("token");
    res.redirect("/")
})

// TERMINOS
/*dash.get("/Terminos", async(req, res)=>{
    if(req.cookies.token){
        try{
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
                )
                let nombre = token.nombre;
                let foto = token.foto;
                
                res.render("dashViews/Terminos",{
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "mnu":0

            });
        } catch (error){
            res.redirect("/v1/dueno/salir")
        }
    }else{
        res.redirect("/v1/dueno/salir")
    }
});*/

export default dash;