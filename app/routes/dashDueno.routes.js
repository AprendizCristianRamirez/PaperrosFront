import { Router } from "express";
import cookieparser from "cookie-parser";
import jwt from "jsonwebtoken";
import fetch from 'node-fetch';

const dash = Router();

//MISPASEOS
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
            res.redirect("/Salir")
        }
    } else {
        console.log("Error de token")
        res.redirect("/Salir")
    }
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
                "usuario": usuario
            });
        } catch (error) {
            res.redirect("/Salir")
        }
    } else {
        res.redirect("/Salir")
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
            _latitude: req.body.paseoLatitude,
            _longitude: req.body.paseoLongitude
        }
    }

    //Información de los perros seleccionados
    //Este datos es un array de strings
    //por ejemplo: ['{"raza": "Golden", "nombre": "Martina"...}', '{"raza": "Golden", "nombre": "Martina"...}', '{"raza": "Bulldog"...]
    const checkedPerros = req.body.perros;
    //Aqui se convierte ese array de strings a un array de objetos con cada posición de checkedPerros
    let perroArray = checkedPerros.map((item) => JSON.parse(item));

    //Añadir información del usuario a los perros
    for (let i = 0; i < perroArray.length; i++) {
        perroArray[i].nombre_dueno = usuario.nombre_dueno;
        perroArray[i].foto_dueno = usuario.foto_dueno;
        perroArray[i].email = usuario.email;
        perroArray[i].localizacion = usuario.localizacion;
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
        hora_fin: req.body.horaFinPaseo,
        hora_inicio: req.body.horaInicioPaseo,
        precio: req.body.precioPaseo,
        medio_de_pago: req.body.medioPagoPaseo,
        //paseador: { No se usa porque estamos creando un paseo personalizado (que debe tomar el paseador)
        //    id_paseador:req.body.paseadorIdPaseo,
        //    img_paseador:req.body.paseadorImgPaseo,
        //    nombre_paseador:req.body.paseadorNombrePaseo
        //},
        perro: perroArray
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
            hora_fin: paseo.hora_fin,
            hora_inicio: paseo.hora_inicio,
            precio: paseo.precio,
            medio_de_pago: paseo.medio_de_pago,
            paseador: { 
                //Vacio porque luego el paseador decide tomar el paseo
            },
            perro: paseo.perro
        };
        //Si el campo tiene un id, será metodo put (actualizar)
        if (req.body.id) {
            const id = req.body.id;
            metodo = "put";
            datos = {
                titulo: paseo.titulo,
                descripcion: paseo.descripcion,
                destino: {
                    _latitude:paseo.destino._latitude,
                    _longitude: paseo.destino._longitude
                },
                nombre_destino: paseo.nombre_destino,
                hora_fin: paseo.hora_fin,
                hora_inicio: paseo.hora_inicio,
                precio: paseo.precio,
                medio_de_pago: medio_de_pago,
                paseador: {
                    //Vacio porque luego el paseador decide tomar el paseo
                },
                perro: paseo.perro
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

//RUTAS DE PASEADORES (MANADA)
dash.get("/RutasPaseadores", (req, res) => {
    if (req.cookies.token) {
        try {
            const token = jwt.verify(
                req.cookies.token,
                process.env.SECRET_KEY
            )
            let nombre = token.nombre;
            let foto = token.foto;
            let email = token.email

            res.render("dashViews/RutasPaseadores", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "mnu": 0,
                "email": email

            });
        } catch (error) {
            res.redirect("/Salir")
        }
    } else {
        res.redirect("/Salir")
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

            // Fetch del usuario
            let rutaUsuario = process.env.API + "usuarios/" + email;
            const resultUsuario = await fetch(rutaUsuario)
            const usuario = await resultUsuario.json();

            res.render("dashViews/AnadirPerro", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "mnu": 0,
                "email": email

            });
        } catch (error) {
            res.redirect("/Salir")
        }
    } else {
        res.redirect("/Salir")
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

            res.render("dashViews/MisPerros", {
                "rol": "dueno",
                "nombre": nombre,
                "foto": foto,
                "email": email,
                "usuario": usuario

            });
        } catch (error) {
            res.redirect("/Salir")
        }
    } else {
        res.redirect("/Salir")
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
                "usuario": usuario
            });
        } catch (error) {
            res.redirect("/Salir")
        }
    } else {
        res.redirect("/Salir")
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
            res.redirect("/Salir")
        }
    } else {
        res.redirect("/Salir")
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
            res.redirect("/Salir")
        }
    } else {
        res.redirect("/Salir")
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
            res.redirect("/Salir")
        }
    } else {
        res.redirect("/Salir")
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
            res.redirect("/Salir")
        }
    } else {
        res.redirect("/Salir")
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
            res.redirect("/Salir")
        }
    } else {
        res.redirect("/Salir")
    }
});

//SALIR
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
            res.redirect("/Salir")
        }
    }else{
        res.redirect("/Salir")
    }
});*/

/*Ejemplo de rutas del crud
dash.post("/save",async (req, res)=>{
    const name = req.body.name;
    
    try {
        const url = "http://localhost:5000/api/users";
        let metodo = "post";
        let datos = {
            name : name 
        };
        if (req.body.id){
            const id = req.body.id;
            metodo = "put";
            datos = {
                id:id,
                name:name
            }
        }
        const option = {
            method : metodo,
            body : JSON.stringify(datos),
            headers : {
                'Content-Type':'application/json'
            }
        }


        const result = await fetch(url, option)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            if (data[0].affectedRows>0){
                console.log("Los datos fueron insertados");
            }else{
                console.log("Labase datos no inserto");
            }
        })
        .then(error=>{console.log("Ha habido un error: "+ error);})
    } catch (error) {
        console.log("Informacion no insertada: "+error);
    }
    
    res.redirect("/v1/usuario")
})
dash.get("/usuario-edit", async(req, res)=>{
    if(req.cookies.eib_per){
        try {
            const data = {
                id : req.query.id,
                name : req.query.name
            }
            
            const token = jwt.verify(
                req.cookies.eib_per, 
                process.env.SECRET_KEY
                )
            let nombre = token.nombre;
            let foto = token.foto;
            res.render("dashboard",{
                "nombre": nombre,
                "foto": foto,
                "mnu" : 3,
                "data" : data
            });
        }catch(error){
            console.log("Token no valido");
        }

    }else{
        res.redirect("/login")
    }
})
dash.get("/borrar", async (req, res)=>{
    const id = req.query.id;
    const url = "http://localhost:5000/api/users/"+id;
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
    res.redirect("/v1/usuario")
})*/

export default dash;