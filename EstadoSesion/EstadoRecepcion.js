const EstadoSesion = require("./EstadoSesion");
const EstadoBidding = require("./EstadoBidding");

class EstadoRecepcion extends EstadoSesion {
    constructor(sesion, deadlineRecepcion) {
        super(sesion);
        this._sesion = sesion; 
        this._deadlineRecepcion = deadlineRecepcion;
    }

    setEstado(){
        return 'RECEPCION';
    }

    asignarEstado() {
        this._session.estadoSesion(new EstadoBidding(this._session));
    }
      
    verificarDeadline(fechaActual){
        return (fechaActual <= this._deadlineRecepcion);
    }

    agregarArticulo(articulo, fechaActual){
        if (!this.verificarDeadline(fechaActual)) {
            // Notifico a los autores que el artículo fue rechazado por enviarlo fuera de tiempo
            articulo.notificacion('Su artículo fue enviado fuera de tiempo');
            throw new Error('El artículo fue rechazado por estar fuera del deadline');
        }
    
        if (!this._sesion.tipoArticuloPermitido(articulo._tipoArticulo)) {
            // Notifico a los autores que el artículo es del tipo incorrecto
            articulo.notificacion('Su artículo fue rechazado porque no es del tipo permitido para esta sesión');
            throw new Error('El artículo es del tipo incorrecto para esta sesión');
        }
    
        // Si pasa todas las validaciones, se agrega a la sesión
        this._sesion.agregarArticuloVerificado(articulo);
    
        // Notifico a los autores que el artículo fue aceptado
        articulo.notificacion('Su artículo fue aceptado');
    }
}
module.exports = EstadoRecepcion;