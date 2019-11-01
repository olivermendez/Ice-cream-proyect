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
        path:'/create-user',
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
         
        
        handler: user.createUser

},


{
        method: 'GET', //Metodo http
        path:'/login', //url
        handler: site.login

},
{
        path:'/validate-user',
        method: 'POST',
        options:{
                //validando los datos del usuario
                validate:{
                        payload:{
                                email:Joi.string().required(),
                                password:Joi.string().required().min(6)
                        }
                }
        },
         
        
        handler: user.validateUser

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