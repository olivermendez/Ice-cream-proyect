'use strict' 
//Requerir el modulo de hapi (Framework)
const Hapi = require('hapi');

const handlerbars = require('handlebars');

//Framework para dar respuesta a archivos.
const inert = require('inert');
const path = require('path');
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
        

        server.views({
            engines:{
                hbs: handlerbars
            },
            relativeTo: __dirname,
            path:'views',
            layout: true,
            layoutPath:'views'
        });

        //definiendo las rutas
        server.route({
            method: 'GET', //Metodo http
            path:'/', //url
            handler:(req,h) => {
                return h.view('index',{
                    title:'home'
                });
            }
    
    });

        server.route({
            method: 'GET', //Metodo http
            path:'/register', //url
            handler:(req,h) => {
                return h.view('register',{
                    title:'Registro'
                });
            }

    });

        server.route({
            method: 'POST', //Metodo http
            path:'/create-user', //url
            handler:(req,h) => {
                console.log(req.payload);
                return 'Usuario creado.';
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