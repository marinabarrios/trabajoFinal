const Conferencias = require('./Conferencias.js');
const Usuarios = require('./Usuarios.js');

class ComfyChair {
    constructor() {
        this._conferencias = [];
        this._usuarios = [];
    }

    registrarUsuario(nombreUsuario, afiliacion, email, contrasenia) {
        //verifico que no exista ya//
        if(this._usuarios.some((user) => user.nombreUsuario() === nombreUsuario)){
            //Comente la siguiente linea para poder usarlo en el test//
            //throw new Error('Ya existe un usuario con ese nombre');
            console.log('Ya existe un usuario con ese nombre');
        }
        
        //luego lo guardo en una colección//
        const user = new Usuarios(nombreUsuario, afiliacion, email, contrasenia);
        this._usuarios.push(user);
        return user;
    }

    listUsuarios() {
        return this._usuarios;
    }

    crearConferencia(nombreConferencia, fechaInicio, fechaFin) {
        const nuevaConferencia = new Conferencias (nombreConferencia,fechaInicio, fechaFin);
        this._conferencias.push(nuevaConferencia);
        return nuevaConferencia;
    }    

    listConferencias() {
        console.log(this._conferencias);
        return this._conferencias;            
    }    
}
module.exports = ComfyChair;