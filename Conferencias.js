const SesionRegular = require("./Sesiones/SesionRegular");
const SesionWorkshop = require("./Sesiones/SesionWorkshop");
const SesionPoster = require("./Sesiones/SesionPoster");
const Usuarios = require("./Usuarios/Usuarios");

class Conferencias { 
    constructor(nombreConferencia, fechaInicio, fechaFin) {
        this._nombreConferencia = nombreConferencia;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;

        this._sesiones =[];

        const usuarios = Usuarios.listarTodosLosUsuarios();
        this._organizadores = usuarios.filter(usuario => usuario.roles === 'CHAIR');
        this._comite = usuarios.filter(usuario => usuario.roles === 'REVISOR');
    }

    nombreConferencia() {
        return this._nombreConferencia;
    }

    crearSesion(tema, tipoSesion, deadlineRecepcion) {
        let sesion;
        switch (tipoSesion) {
        case 'REGULAR':
            sesion = new SesionRegular(tema, tipoSesion, deadlineRecepcion);
            break;
        case 'WORKSHOP':
            sesion = new SesionWorkshop(tema, tipoSesion, deadlineRecepcion);
            break;
        case 'POSTER':
            sesion = new SesionPoster(tema, tipoSesion, deadlineRecepcion);
            break;
        default:
            throw new Error("Tipo de sesión no válido");
        }
        this._sesiones.push(sesion);
        return sesion;
    }

    listSesiones(){
        return this._sesiones;
    }

    // Lista organizadores y comité de revisores de la conferencia
    listarOrganizadoresYComite() {
        return {
            organizadores: this._organizadores.map(org => org.nombre),
            comite: this._comite.map(rev => rev.nombre)
        };
    }
}
module.exports = Conferencias;