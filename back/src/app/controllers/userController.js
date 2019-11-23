const UserService = require('../../services/userService')
const authConfig = require('../../config/auth')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    async store(req, res) {
        const { name: nome, email, user: login, password: senha } = req.body,
        userService = new UserService();

        userService.findUserByUsername(login)
            .then(response => {
                var message = "Usuário já existente";
                
                return res
                    .status(409)
                    .json({ message });
            })
            .catch(error => {
                bcrypt.hash(senha, 8)
                    .then(password_hash => {
                        userService.add({
                            codigo: null, nome, email, login, senha: password_hash
                        })
                        .then(user => {
                            return res
                                .status(201)
                                .json({ 
                                    user: {
                                        id: user.insertId,
                                        name: nome,
                                        email,
                                        user: login,
                                    },
                                    token: jwt.sign({ id: user.insertId }, authConfig.hash, { expiresIn: authConfig.expiresIn })
                                });    
                        })
                        .catch(err => { 
                            res.status(500);
                        })
                    })
                    .catch(error => {
                        res.status(500);
                    })
            });
    }
}
