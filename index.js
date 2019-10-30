'use strict'

//Requerir el modulo de hapi (Framework)
const Hapi = require('hapi');

//Se configura el servidor de la app.
const server = Hapi.Server({
    port: process.env.port || 3000,
    host:'localhost'
});

//Se define la funcion para inicializar el proyecto.
async function init(){
    

    //En esta parte se define las rutas
    //>Metodo http, url, controlador de ruta
    server.route({

        //Metodo http
        method: 'GET',

        //url
        path:'/',

        //controlador de la ruta
        handler:(req,h) => {

            //El objeto <h> trae consigo un conjunto de respuestas
            return h.response('hola mundo').code(200);
        }
    });

    server.route({
        method: 'GET',
        path:'/redirect',
        handler:(req,h) => {

            //El objeto <h> trae consigo un conjunto de respuestas
            return h.redirect('https://platzi.com');
        }
    });

    //Al arrancar el servidor, HapiJs, se considera una tarea asincrona
    //Cuando trabajamos con procesos asincronos, debemos incluir un <await> y luego validar posibles erroes con el <try/catch>
    
    try{
        
        await server.start();

    }catch(error){
        console.error(error);
        process.exit(1);
    }

    console.log(`servidor lanzado en: ${server.info.uri}`);
}


init();