const Usuarios = require("./Usuarios");

class Chairs extends Usuarios{
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        super(nombreUsuario, afiliacion, email, contrasenia);
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }

}
module.exports = Chairs;