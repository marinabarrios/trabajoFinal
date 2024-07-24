class Conferencias {
    constructor(nombreConferencia, fechaInicio, fechaFin, organizadores, comite) {
        this._nombreConferencia = nombreConferencia;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;
        this._organizadores = []; //listado de usuarios organizadores de la conferencia
        this._comite = []; //listado de usuarios revisores que conforman el comite
    }

    crearSesion(tema, tipoSesion, deadlineRecepcion){

    }
}
module.exports = Conferencias;