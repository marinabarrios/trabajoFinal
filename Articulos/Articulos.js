class Articulos{
    constructor(tituloArticulo, archivoAdjunto, autoresArticulo, autorNotificacion){
        if (this.constructor === Usuarios) {
            throw new Error("No se puede instanciar una clase abstracta");
        }
        this._tituloArticulo = tituloArticulo;
        //this._tipoArticulo = tipoArticulo;
        this._archivoAdjunto = archivoAdjunto;
        this._autoresArticulo = autoresArticulo;
        this._autorNotificacion = autorNotificacion;
        this._interesRevisores = [];
    }  
    //LOS ARTICULOS SE VAN A CREAR INSTANCIANDO LA CLASE

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