'use strict'

const bcrypt = require('bcrypt');

class Users{
    constructor(db){
        this.db = db;
        this.ref = this.db.ref('/');
        this.collection = this.ref.child('/users');
    }

    async create (data){

        let NewUser = this.collection.push();
        NewUser.set({
            email:data.email,
            name: data.name,
            password: data.password
        });  
        return NewUser.key;

    }

    async validateUser(data){
        //const userQuery = this.db.ref()
        const userQuery = await this.collection.orderByChild('email').equalTo(data.email[0]).once('value');
        const userFound = userQuery.val();
        
        if(userFound){
            const userId = Object.keys(userFound)[0];
            const passwdRight = await bcrypt.compare(data.password,userFound[userId].password);
            const result = (passwdRight) ? userFound[userId]: false;
            return result;
        }

        return false;
    }


    static async encrypt (passwd){
        const saltRpunds = 10;
        const hashedPassword = await bcrypt.hash(passwd,saltRpunds);
        return hashedPassword;
    }
}

module.exports = Users;