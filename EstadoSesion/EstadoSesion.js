class EstadoSesion{
    constructor(sesion) {
        this._sesion = sesion;
    }

    setEstado(){
        throw new Error("Método no implementado en la clase actual");
    }

    agregarArticulo(articulo, fechaActual) {
        throw new Error('Método no implementado en la clase actual');
    }

    asignarEstado(){
        throw new Error('Método no implementado en la clase actual');
    }

    procesarBidding(revisor, articulo, tipoDeInteres){
        throw new Error('Método no implementado en la clase actual');
    }

    asignarRevisores() {
        throw new Error('Método no implementado en la clase actual');
    }
}
module.exports = EstadoSesion;