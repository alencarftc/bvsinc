let jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
    async checkToken(req, res, next){
        let token = req.headers['x-access-token'] || req.headers['authorization'];

        if (token){
            if (token.startsWith('Bearer ')){
                token = token.slice(7, token.length);
            
                jwt.verify(token, authConfig.hash, (err, decoded) => {
                    if (err)
                        return res
                            .status(401)
                            .json({ message: 'Token inválido' });
                    else {
                        req.decoded = decoded;
                        next();
                    }
                });
            }
            else {
                return res
                    .status(401)
                    .json({ message: 'Token inválido' });
            }
        }
        else
            return res
                .status(401)
                .json({ message: 'Necessário login' });
    }
}