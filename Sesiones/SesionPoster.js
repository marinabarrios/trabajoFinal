const Sesiones = require("./Sesiones");

class SesionPoster extends Sesiones{
    constructor(tema, tipoSesion, deadlineRecepcion) {
        super(tema, tipoSesion, deadlineRecepcion);
        this._tema = tema;
        this._tipoSesion = tipoSesion;
        this._deadlineRecepcion = deadlineRecepcion;
        this._maximoArticulosAceptados = 0;
              //    this.metodoSeleccionPorTipo = {};
        //this.metodoSeleccionRegulares = null;
        //this.metodoSeleccionPosters = null;
    }

    validarArticulo(articulo) {
        return articulo.tipoArticulo === "Poster";
    }
    
    agregarEvaluacion(articulo, revisor, comentario, puntaje) {
        return { articulo, revisor, comentario, puntaje, fecha: new Date() };
    }
}
module.exports = SesionPoster;