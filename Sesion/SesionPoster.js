const Sesion = require("./Sesion");

class SesionPoster extends Sesion{
    constructor(tema, tipoSesion, deadlineRecepcion) {
        super(tema, tipoSesion, deadlineRecepcion);
        this._maximoArticulosAceptados = 0;
              //    this.metodoSeleccionPorTipo = {};
        //this.metodoSeleccionRegulares = null;
        //this.metodoSeleccionPosters = null;
    }

    tipoArticuloPermitido(tipoArticulo) {
        return tipoArticulo === "POSTER";
    }
    
    agregarEvaluacion(articulo, revisor, comentario, puntaje) {
        return { articulo, revisor, comentario, puntaje, fecha: new Date() };
    }
}
module.exports = SesionPoster;