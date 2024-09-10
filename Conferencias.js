const Sesiones = require("./Sesiones");

class Conferencias { 

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
    }
}
module.exports = Conferencias;