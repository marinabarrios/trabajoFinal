const Conferencias = require('./Conferencias');

class ComfyChair {
    constructor() {
        this._conferencias = [];
    }

    crearConferencia(nombreConferencia, fechaInicio, fechaFin) {
        const nuevaConferencia = new Conferencias (nombreConferencia,fechaInicio, fechaFin);
        this._conferencias.push(nuevaConferencia);
        return nuevaConferencia;
    } 

    listConferencias() {
        return this._conferencias;            
    } 
}
module.exports = ComfyChair;