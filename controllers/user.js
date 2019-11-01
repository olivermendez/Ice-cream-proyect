'use strict'


const users = require('../models/database').users;

async function createUser(req,h) {

    let result;

    try{
        result = await users.create(req.payload);
        //result = await users.create(req.payload);

    }catch(error){
        console.error(error);
        return h.response('Problemas al crear el usuario').code(500);

    }
    return h.response(`Usuario creado ID: ${result}`);
}


module.exports ={

    createUser:createUser
};