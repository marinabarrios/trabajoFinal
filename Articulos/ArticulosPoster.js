const Articulos = require("./Articulos");

class ArticulosPoster extends Articulos{
    constructor(tituloArticulo, archivoAdjunto, autoresArticulo, abstract, autorNotificacion){
        super(tituloArticulo, archivoAdjunto, autoresArticulo, autorNotificacion);
        this._tituloArticulo = tituloArticulo;
        //this._tipoArticulo = tipoArticulo;
        this._archivoAdjunto = archivoAdjunto;
        this._autoresArticulo = autoresArticulo;
        this._abstract = abstract;
        this._autorNotificacion = autorNotificacion;
    }
    /*calcularPuntajeFinal(evaluaciones) {
        return evaluaciones.length > 2 ? "Aceptado" : "Rechazado";
    }*/
}
module.exports = ArticulosPoster;