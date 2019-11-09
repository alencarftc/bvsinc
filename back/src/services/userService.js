const db = require('../config/mysql')

module.exports = class UserService {
    add(user){
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO usuario set ?", user, (err, res) => {
                if(err) 
                    reject(err);
                else 
                    resolve(res);
            });
        });
    }
    findUserByEmail(email){
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM usuario WHERE email = ?", email, (err, res) => {
                if(err) 
                    reject(err);
                else if(res.length > 0) 
                    resolve(res);
                else 
                    reject(res)
            });
        });
    }
    findUserByUsername(username){
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM usuario WHERE login = ?", username, (err, res) => {
                if(err) 
                    reject(err);
                else if(res.length > 0) 
                    resolve(res);
                else 
                    reject(res)
            });
        });
    }
}