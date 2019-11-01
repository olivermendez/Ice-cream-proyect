'use strict'

const bcrypt = require('bcrypt');


class Users{
    constructor(db){
        this.db = db;
        this.ref = this.db.ref('/');
        this.collection = this.ref.child('users');
    }

    async create (data){

        let NewUser = this.collection.push();
        NewUser.set({
            email:data.email,
            name: data.name,
            password: data.password,
            
        });



    }

    static async encrypt (passwd){
        const saltRpunds = 10;
        const hashedPassword = await bcrypt.hash(passwd,saltRpunds);
        return hashedPassword;



    }
}

module.exports = Users;