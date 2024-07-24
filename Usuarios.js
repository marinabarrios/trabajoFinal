class Usuarios {
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        this._nombreUsuario = nombreUsuario;
        this._afiliacion = afiliacion;
        this._email = email;
        this._contrasenia = contrasenia;
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }
}
module.exports = Usuarios;