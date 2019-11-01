'use strict'

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
        method: 'POST', //Metodo http
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