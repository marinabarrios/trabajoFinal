const EstadoSesion = require("./EstadoSesion");
const EstadoSeleccion = require("./EstadoSeleccion");
//En la Revision los revisores puntuan los artículos que le asignaron

class EstadoRevision extends EstadoSesion {
    constructor(sesion) {
        super(sesion);
        this._puntuaciones = new Map(); //Almacena { articulo: [{ revisor, puntaje, comentario }] }
    }

    setEstado(){
        return 'REVISION';
    }

    asignarEstado() {     
        this._sesion.modificarEstadoSesion(new EstadoSeleccion(this._sesion));
    }

    agregarArticulo(articulo, fechaActual){
        throw new Error('En esta estapa ya no se aceptan artículos');
    }

    procesarBidding(revisor, articulo, tipoDeInteres){
        throw new Error('En esta estapa no se procesan los intereses');
    }

    asignarRevisores() {
        throw new Error('El proceso de asignación de artículos sólo se puede realizar durante el estado de asignación');
    }

    puntuarArticulo(revisor, articulo, puntaje, comentario) {
        if (!(this._sesion.estadoSesion() instanceof EstadoRevision)) {
            throw new Error(
              "El proceso de revisión solo se puede realizar durante el estado de revisión."
            );
          }
        if (!articulo.listRevisoresAsignados().includes(revisor)) {
            throw new Error("El revisor no está asignado a este artículo");
        }
        if (puntaje < -3 || puntaje > 3) {
            throw new Error("El puntaje debe estar entre -3 y 3");
        }

        if (!this._puntuaciones.has(articulo)) {
            this._puntuaciones.set(articulo, []);
        }
        //Guardo las puntuaciones en la sesion para poder usarla en la etapa de seleccion
        this._sesion._puntuacionesRevision = this._puntuaciones;
        this._puntuaciones.get(articulo).push({ revisor, puntaje, comentario });
    }
}
module.exports = EstadoRevision;