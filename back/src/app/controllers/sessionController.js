const jwt = require('jsonwebtoken')

const UserService = require('../../services/userService')
const authConfig = require('../../config/auth');

module.exports = {
    async store(req, res) {
        const { username: user, password: senha } = req.body;

        const userService = new UserService();

        userService.findUserByUsername(user)
            .then(user => {
                const { codigo: id, nome: name, email, login } = user[0];

                return res
                    .status(201)
                    .json({ 
                        user: {
                            id, name, email, login
                        },
                        token: jwt.sign({ id }, authConfig.hash, { expiresIn: authConfig.expiresIn })
                    });
            })
            .catch(error => {
                var message = "Credenciais inválidas";

                return res
                    .status(403)
                    .json({ message });            
            })
    },

}