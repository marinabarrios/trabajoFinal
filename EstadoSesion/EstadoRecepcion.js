const EstadoSesion = require("./EstadoSesion");
const EstadoBidding = require("./EstadoBidding");

class EstadoRecepcion extends EstadoSesion {
    constructor(sesion, deadlineRecepcion) {
        super(sesion);
        this._deadlineRecepcion = deadlineRecepcion;
    }

    setEstado(){
        return 'RECEPCION';
    }

    asignarEstado() {
        this._sesion.modificarEstadoSesion(new EstadoBidding(this._sesion));
    }
      
    verificarDeadline(fechaActual){
        return (fechaActual <= this._deadlineRecepcion);
    }

    agregarArticulo(articulo, fechaActual){
        if (!this.verificarDeadline(fechaActual)) {
            // Notifico a los autores que el artículo fue rechazado por enviarlo fuera de tiempo
            articulo.notificar('Su artículo fue enviado fuera de tiempo');
            throw new Error('El artículo fue rechazado por estar fuera del deadline');
        }
    
        if (!this._sesion.tipoArticuloPermitido(articulo._tipoArticulo)) {
            // Notifico a los autores que el artículo es del tipo incorrecto
            articulo.notificar('Su artículo fue rechazado porque no es del tipo permitido para esta sesión');
            throw new Error('El artículo es del tipo incorrecto para esta sesión');
        }
    
        // Si pasa todas las validaciones, se agrega a la sesión
        this._sesion.agregarArticuloVerificado(articulo);
    
        // Notifico a los autores que el artículo fue aceptado
        articulo.notificar('Su artículo fue aceptado');
    }

    procesarBidding(revisor, articulo, tipoDeInteres){
        throw new Error('En esta estapa no se procesan los intereses');
    }

    asignarRevisores() {
        throw new Error('El proceso de asignación de artículos sólo se puede realizar durante el estado de asignación');
    }
}
module.exports = EstadoRecepcion;