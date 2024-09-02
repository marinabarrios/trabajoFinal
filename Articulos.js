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
    
    agregarInteres(revisor, tipoInteres, temaSesion) {
        // Buscar si el revisor ya ha expresado interés previamente
        const interesExistente = this._interesRevisores.find(interes => interes.revisor === revisor._nombreUsuario);

        if (interesExistente) {
            // Si ya existe un interés del mismo revisor, modificar el tipo de interés
            interesExistente.tipoInteres = tipoInteres;
        } else {
            // Si no existe, agregar el nuevo interés
            this._interesRevisores.push({ revisor: revisor._nombreUsuario, articulo: this._id, tipoInteres: tipoInteres, sesion: temaSesion});
        }
    }

    mostrarRevisorInteres(){
        return this._interesRevisores;
    }    
}
module.exports = Articulos;