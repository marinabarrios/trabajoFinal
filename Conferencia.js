const SesionRegular = require("./Sesion/SesionRegular");
const SesionWorkshop = require("./Sesion/SesionWorkshop");
const SesionPoster = require("./Sesion/SesionPoster");
const Usuario = require("./Usuario/Usuario");

class Conferencia { 
    constructor(nombreConferencia, fechaInicio, fechaFin) {
        this._nombreConferencia = nombreConferencia;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;

        this._sesiones =[];

        const usuarios = Usuario.listarTodosLosUsuarios();
        this._organizadores = usuarios.filter(usuario => usuario.roles.includes('CHAIR'));
        this._comite = usuarios.filter(usuario => usuario.roles.includes('REVISOR'));
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
module.exports = Conferencia;