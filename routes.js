'use strict'

const Joi = require('joi');
const site = require('./controllers/site');
const user = require('./controllers/user');

//Arreglo de rutas
module.exports =[
    
{
        method: 'GET', //Metodo http
        path:'/', //url
        handler:site.home

},
{
        method: 'GET', //Metodo http
        path:'/register', //url
        handler: site.register

},

{
        method: 'POST',
        options:{
                //validando los datos del usuario
                validate:{
                        payload:{
                                name:Joi.string().required().min(3),
                                email:Joi.string().required(),
                                password:Joi.string().required().min(6)
                        }
                }
        },
         
        path:'/create-user', //url
        handler: user.createUser

},

{
        method: 'GET',
        path:'/{param*}',
        handler:{
            directory:{
                path:'.',
                index: ['index.html']
        } 
            
    }
}

];