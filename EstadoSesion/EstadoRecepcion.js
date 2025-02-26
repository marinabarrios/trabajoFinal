const EstadoSesion = require("../EstadoSesion/EstadoSesion");

class EstadoRecepcion extends EstadoSesion {
    constructor(sesion, deadlineRecepcion) {
        super(sesion);
        this._deadlineRecepcion = deadlineRecepcion;
    }

    setEstado(){
        return 'RECEPCION'
    }

    verificarDeadline(fechaActual){
        return (fechaActual <= this._deadlineRecepcion);
    }

    agregarArticulo(articulo, autorNotificacion, fechaActual){
        if (this.verificarDeadline(fechaActual)) {//falta una verificacion
            this._sesion.agregarArticuloVerificado(articulo);
            articulo.notification(autorNotificacion,'Su articulo fue aceptado');
        } else {
            articulo.notification(autorNotificacion,'Su artículo fue enviado fuera de tiempo');
            throw new Error('El artículo fue rechazado');
        }
    }
    //verificar deadline

    //verificar si se está mandando el artículo correcto a la sesion correcta
    //sesion regular acepta articulos regulares
    //sesion poster acepta articulos poster
    //sesion workshop acepta ambos
}