const Articulos = require("./Articulos");

class ArticulosRegular extends Articulos{
    constructor(tituloArticulo, archivoAdjunto, autoresArticulo, archivoFuentes, autorNotificacion){
        super(tituloArticulo, archivoAdjunto, autoresArticulo, autorNotificacion);
        this._tituloArticulo = tituloArticulo;
        //this._tipoArticulo = tipoArticulo;
        this._archivoAdjunto = archivoAdjunto;
        this._autoresArticulo = autoresArticulo;
        this._archivoFuentes = archivoFuentes;
        this._autorNotificacion = autorNotificacion;
    }
    /*calcularPuntajeFinal(evaluaciones) {
        let total = evaluaciones.reduce((sum, eval) => sum + eval.puntaje, 0);
        return total / evaluaciones.length;
    }*/
}
module.exports = ArticulosRegular;