class Articulos{
    constructor(id, tituloArticulo, tipoArticulo, abstract = null, archivoAdjunto, autoresArticulo, archivoFuentes = null, autorNotificacion, fechaEntrega){
        this._id = id;
        this._tituloArticulo = tituloArticulo;
        this._tipoArticulo = tipoArticulo;
        this._abstract = abstract;
        this._archivoAdjunto = archivoAdjunto;
        this._autoresArticulo = autoresArticulo;
        this._archivoFuentes = archivoFuentes;
        this._autorNotificacion = autorNotificacion;
        this._fechaEntrega = fechaEntrega;
        this._interesRevisores = [];
    }    

    agregarInteres(revisor, tipoInteres) {
        this._interesRevisores.push({ revisor, tipoInteres });
    }

    mostrarRevisorInteres(){
        return this._interesRevisores;
    }
}
module.exports = Articulos;