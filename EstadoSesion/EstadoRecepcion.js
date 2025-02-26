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
        if (this.verificarDeadline(fechaActual)) { // Verifico si está dentro del deadline //falta una verificacion
            this._sesion.agregarArticuloVerificado(articulo);
            
            // Notifico a todos los autores del artículo
            articulo.autoresArticulo.forEach(autor => {
            articulo.notification(autor, 'Su artículo fue aceptado');
        });
        } else {
            articulo.autoresArticulo.forEach(autor => {
                articulo.notification(autor, 'Su artículo fue enviado fuera de tiempo');
            });
            throw new Error('El artículo fue rechazado');
        }
    }

    //verificar si se está mandando el artículo correcto a la sesion correcta
    //sesion regular acepta articulos regulares
    //sesion poster acepta articulos poster
    //sesion workshop acepta ambos
}
module.exports = EstadoRecepcion;