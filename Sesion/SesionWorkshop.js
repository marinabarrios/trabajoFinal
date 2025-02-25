const Sesion = require("./Sesion");

class SesionWorkshop extends Sesion{
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
        return articulo.tipoArticulo === "Workshop";
    }
    
    simplificarArticulo(articulo) {
        return {
            titulo: articulo.tituloArticulo,
            autores: articulo.autoresArticulo,
            resumen: articulo.abstract
        };
    }
}
module.exports = SesionWorkshop;