const EstadoSesion = require("./EstadoSesion");

class EstadoSeleccion extends EstadoSesion {
    constructor(sesion) {
        super(sesion);
    }

    setEstado(){
        return 'SELECCION';
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

    seleccionandoArticulos(){
        this._sesion.seleccionarArticulos();
    }
}
module.exports = EstadoSeleccion;