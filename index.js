'use strict' 

//Requerir el modulo de hapi (Framework)
const Hapi = require('hapi');

//Framework para dar respuesta a archivos.
const inert = require('inert');

const path = require('path');

//Se configura el servidor de la app.
const server = Hapi.Server({
    port: process.env.port || 3000,
    host:'localhost',
    routes:{
        files:{
            relativeTo:path.join(__dirname,'public')
        }
    }
});

//Se define la funcion para inicializar el proyecto.
async function init(){
    
    

    //Al arrancar el servidor, HapiJs, se considera una tarea asincrona
    //Cuando trabajamos con procesos asincronos, debemos incluir un <await> y luego validar posibles erroes con el <try/catch>
    
    try{
        await server.register(inert);

        //definiendo las rutas
        server.route({
            method: 'GET', //Metodo http
            path:'/home', //url
        
        //controlador de la ruta
            handler:(req,h) => {
            return h.file('index.html');
            //El objeto <h> trae consigo un conjunto de respuestas
        }
    });

        server.route({
            method: 'GET',
            path:'/{param*}',
            handler:{
                directory:{
                    path:'.',
                    index: ['index.html']
                }


            //El objeto <h> trae consigo un conjunto de respuestas
            
            }
    });


        
        await server.start();

    }catch(error){
        console.error(error);
        process.exit(1);
    }

    console.log(`servidor lanzado en: ${server.info.uri}`);
}


init();