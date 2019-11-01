'use strict' 
//Requerir el modulo de hapi (Framework)
const Hapi = require('hapi');
const handlerbars = require('handlebars');
const inert = require('inert'); //Framework para dar respuesta a archivos.
const path = require('path');
const routes = require('./routes');
const vision = require('vision');

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
        await server.register(vision);

        server.state('user',{
            ttl:1000 * 60 * 60 * 24 * 7,
            isSecure:process.env.NODE_ENV === 'prod',
            encoding:'base64json',
        });
        

        server.views({
            engines:{
                hbs: handlerbars
            },
            relativeTo: __dirname,
            path:'views',
            layout: true,
            layoutPath:'views'
        });

    server.route(routes);
    await server.start();

    }catch(error){
        console.error(error);
        process.exit(1);
    }

    console.log(`servidor lanzado en: ${server.info.uri}`);
}


init();