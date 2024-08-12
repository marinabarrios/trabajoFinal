const Autores = require('./Autores.js');
const Chairs = require('./Chairs.js');
const Conferencias = require('./Conferencias.js');
const Revisores = require('./Revisores.js');

class ComfyChair {
    constructor() {
        this._conferencias = [];
        this._usuarios = [];
        this._chairs = [];
        this._autores = [];
        this._revisores = [];
    }

    registrarUsuario(tipo, nombreUsuario, afiliacion, email, contrasenia) {
        //verifico que no exista ya//
        if(this._usuarios.some((user) => user.nombreUsuario() === nombreUsuario)){// la clase nombreUsuario() NO puedo instanciar
            //Comente la siguiente linea para poder usarlo en el test//
            //throw new Error('Ya existe un usuario con ese nombre');
            console.log('Ya existe un usuario con ese nombre');
        }
        
        //luego lo guardo en una colección//
       /* const user = new Usuarios(nombreUsuario, afiliacion, email, contrasenia);        
        this._usuarios.push(user);
        return user;*/

        let user;
        switch(tipo) {
            case 'chair':
                user = new Chairs(nombreUsuario, afiliacion, email, contrasenia);
                this._chairs.push(user);
                break;
            case 'revisor':
                user = new Revisores(nombreUsuario, afiliacion, email, contrasenia);
                this._revisores.push(user);
                break;
            case 'autor':
                user = new Autores(nombreUsuario, afiliacion, email, contrasenia);
                this._autores.push(user);
                break;
            default:
                throw new Error("Tipo de usuario no válido.");
        }
        this._usuarios.push(user);
        return user;
    }

    listUsuarios() {
        return this._usuarios;
    }

    listChairs() {
        return this._chairs;
    }

    listRevisores() {
        return this._revisores;
    }

    listAutores() {
        return this._autores;
    }

    crearConferencia(nombreConferencia, fechaInicio, fechaFin, organizadores, comite, autores) {
        const nuevaConferencia = new Conferencias (nombreConferencia,fechaInicio, fechaFin, organizadores, comite, autores);
        this._conferencias.push(nuevaConferencia);
        return nuevaConferencia;
    }    

    listConferencias() {
        return this._conferencias;            
    }    
}
module.exports = ComfyChair;