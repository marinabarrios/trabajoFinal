const SesionRegular = require("./Sesiones/SesionRegular");
const SesionWorkshop = require("./Sesiones/SesionWorkshop");
const SesionPoster = require("./Sesiones/SesionPoster");

class Conferencias { 
    constructor(nombreConferencia, fechaInicio, fechaFin) {
        this._nombreConferencia = nombreConferencia;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;
        this._sesiones =[];
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
/*
    constructor(nombreConferencia, fechaInicio, fechaFin, organizadores, comite, autores) {
        this._nombreConferencia = nombreConferencia;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;
        this._organizadores = organizadores; //listado de usuarios organizadores de la conferencia
        this._comite = comite; //listado de usuarios revisores que conforman el comite
        this._autores = autores; //listado de usuarios que enviaron un articulo a la conferencia
        this._sesiones =[];
    }

    nombreConferencia() {
        return this._nombreConferencia;
    }

    crearSesion(tema, tipoSesion, deadlineRecepcion, estadoSesion, tipoDeEvaluacion) {
        const nuevaSesion = new Sesiones (tema, tipoSesion, deadlineRecepcion, estadoSesion, tipoDeEvaluacion);
        this._sesiones.push(nuevaSesion);
        return nuevaSesion;
    }

    listSesiones(){
        return this._sesiones;
    }*/
}
module.exports = Conferencias;