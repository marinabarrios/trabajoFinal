const Usuarios = require('./Usuarios.js');

class ComfyChair {
    constructor() {
        this._conferencias = [];
        this._usuarios = [];
    }

    registrarUsuario(nombreUsuario, afiliacion, email, contrasenia) {
        //verifico que no exista ya//
        if(this._usuarios.some((user) => user.nombreUsuario() === nombreUsuario)){
            throw new Error('Ya existe un usuario con ese nombre');
        }
        
        //luego lo guardo en una colección//
        const user = new Usuarios(nombreUsuario, afiliacion, email, contrasenia);
        this._usuarios.push(user);
        return user;
    }
}
module.exports = ComfyChair;