class EstadoSesion{
    constructor(sesion) {
        this._sesion = sesion;
    }

    setEstado(){
        throw new Error("Método no implementado en el estado actual");
    }

    agregarArticulo(articulo, fechaActual) {
        throw new Error('Método no implementado en el estado actual');
    }
}
module.exports = EstadoSesion;