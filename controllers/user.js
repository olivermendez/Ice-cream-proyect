'use strict'


const users = require('../models/database').users;

async function createUser(req,h) {

    let result;

    try{
        result = await users.create(req.payload);
        
    }catch(error){
        console.error(error);
        return h.response('Problemas al crear el usuario').code(500);
    }
    return h.response(`Usuario creado ID: ${result}`);
}


async function validateUser (req, h) {
    let result;
    try {
      result = await users.validateUser(req.payload);
      if(!result){
        return h.response('Email y passwd incorrectos').code(401);

      }
    } catch (error) {
      console.error(error);
      return h.response('Problemas validando el usuario').code(500);
    }

    return h.redirect('/').state('user',{
        name:result.name,
        email:result.email
    });
        
  }


module.exports ={

    createUser:createUser,
    validateUser: validateUser
};