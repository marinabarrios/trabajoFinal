const EstadoSesion = require("./EstadoSesion");

class EstadoRecepcion extends EstadoSesion {
    constructor(sesion, deadlineRecepcion) {
        super(sesion);
        this._sesion = sesion; 
        this._deadlineRecepcion = deadlineRecepcion;
    }

    setEstado(){
        return 'RECEPCION'
    }

    verificarDeadline(fechaActual){
        return (fechaActual <= this._deadlineRecepcion);
    }

    agregarArticulo(articulo, fechaActual){
        if (!this.verificarDeadline(fechaActual)) {
            // Notificar a los autores que el artículo fue rechazado por enviarlo fuera de tiempo
            articulo.notificacion('Su artículo fue enviado fuera de tiempo');
            throw new Error('El artículo fue rechazado por estar fuera del deadline');
        }
    
        if (!this._sesion.tipoArticuloPermitido(articulo._tipoArticulo)) {
            // Notificar a los autores que el artículo es del tipo incorrecto
            articulo.notificacion('Su artículo fue rechazado porque no es del tipo permitido para esta sesión');
            throw new Error('El artículo es del tipo incorrecto para esta sesión');
        }
    
        // Si pasa todas las validaciones, se agrega a la sesión
        this._sesion.agregarArticuloVerificado(articulo);
    
        // Notificar a los autores que el artículo fue aceptado
        articulo.notificacion('Su artículo fue aceptado');
    }

    //verificar si se está mandando el artículo correcto a la sesion correcta
    //sesion regular acepta articulos regulares
    //sesion poster acepta articulos poster
    //sesion workshop acepta ambos
}
module.exports = EstadoRecepcion;