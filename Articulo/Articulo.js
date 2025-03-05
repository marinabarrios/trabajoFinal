class Articulo{
    constructor(tituloArticulo, archivoAdjunto, autoresArticulo, autorNotificacion){
        if (this.constructor === Articulo) {
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

        if (!Array.isArray(autorNotificacion)) {
            throw new Error("Rechazado: autorNotificacion debe ser un array de autores.");
        }

        if (!autorNotificacion.every(autor => autoresArticulo.includes(autor))) {
            throw new Error("Rechazado: Todos los autores de notificación deben estar en la lista de autores del artículo.");
        }

        this._autorNotificacion = autorNotificacion;
        
        this._tipoArticulo = null;
        this._interesRevisores = new Map();
        this._revisoresAsignados = [];
    }  

    //Defino el tipo de artículo
    agregarTipoArticulo(tipoArticulo) {
        if (this._tipoArticulo !== null) {
            throw new Error(`El artículo ya tiene un tipo asignado: ${this._tipoArticulo}`);
        }
        this._tipoArticulo = tipoArticulo;
    }

    notificar(msg){
        this._autorNotificacion.forEach(autor => {
            autor.recibeNotificacion(msg);
        });
    }

    interesRevisores(revisor, interes) {
        this._interesRevisores.set(revisor, interes);
    }

    listInteresRevisores(){
        return this._interesRevisores;
    }

    agregarRevisorAsignado(revisor) {
        if (this._revisoresAsignados.length < 3 && !this._revisoresAsignados.includes(revisor)) {
            this._revisoresAsignados.push(revisor);
        } else {
            throw new Error("No se puede asignar más de 3 revisores a este artículo.");
        }
    }

    listRevisoresAsignados() {
        return this._revisoresAsignados;
    }

    addRevision(revision) {
        if (this.revisiones.length >= 3) {
          throw new Error("No se pueden añadir más de 3 revisiones.");
        }
        this.revisiones.push(revision);
        this.calculatePuntaje();
    }
/*    
    addRevision(revision) {
        if (this.revisiones.length >= 3) {
          throw new Error("No se pueden añadir más de 3 revisiones.");
        }
        this.revisiones.push(revision);
        this.calculatePuntaje();
      }
    
    calculatePuntaje() {
        if (this.revisiones.length > 0) {
          const totalPuntaje = this.revisiones.reduce(
            (sum, rev) => sum + rev.puntaje,
            0
          );
          this.puntaje = totalPuntaje / this.revisiones.length;
        } else {
          this.puntaje = null;
        }
    }*/
/*
  addRevision(revision) {
    if (this.revisiones.length >= 3) {
      throw new Error("No se pueden añadir más de 3 revisiones.");
    }
    this.revisiones.push(revision);
    this.calculatePuntaje();
  }*/
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
module.exports = Articulo;