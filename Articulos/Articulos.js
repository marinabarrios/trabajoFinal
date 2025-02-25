class Articulos{
    constructor(tituloArticulo, archivoAdjunto, autoresArticulo, autorNotificacion){
        if (this.constructor === Articulos) {
            throw new Error("No se puede instanciar una clase abstracta");
        }
        
        if (!tituloArticulo || typeof tituloArticulo !== 'string' || tituloArticulo.trim() === "") {
            throw new Error("Rechazado: El título del artículo no puede estar vacío");
        }
        this._tituloArticulo = tituloArticulo;

        try {
            new URL(archivoAdjunto);
            this._archivoAdjunto = archivoAdjunto;
        } catch (_) {
            throw new Error("Rechazado: El archivo adjunto debe ser una URL válida");
        }       
        
        if (!Array.isArray(autoresArticulo) || autoresArticulo.length === 0 || autoresArticulo[0] === null) {
            throw new Error("Rechazado: Debe tener definido al menos un autor");
        }
        this._autoresArticulo = autoresArticulo;

        if (!autorNotificacion && !autoresArticulo.includes(autorNotificacion)) {
            throw new Error("Rechazado: Debe tener un autor designado para recibir notificaciones");
        }
        this._autorNotificacion = autorNotificacion;
        
        this._tipoArticulo = null;
        this._interesRevisores = [];
    }  

    //Defino el tipo de artículo
    agregarTipoArticulo(tipoArticulo) {
        if (this._tipoArticulo !== null) {
            throw new Error(`El artículo ya tiene un tipo asignado: ${this._tipoArticulo}`);
        }
        this._tipoArticulo = tipoArticulo;;
    }

/*
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
    }    */
}
module.exports = Articulos;