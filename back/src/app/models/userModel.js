module.exports = class UserModel {
    constructor(user){
        this.codigo = user.codigo;
        this.nome = user.nome;
        this.email = user.email;
        this.login = user.login;
        this.senha = user.senha;
    }
}