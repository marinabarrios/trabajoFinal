const EstadoSesion = require("./EstadoSesion");
const EstadoSeleccion = require("./EstadoSeleccion");

class EstadoRevision extends EstadoSesion {
    constructor(sesion) {
        super(sesion);
        this._sesion = sesion; 
    }

    setEstado(){
        return 'REVISION';
    }

    asignarEstado() {
        this._session.estadoSesion(new EstadoSeleccion(this._session));
    }

    agregarArticulo(articulo, fechaActual){
        throw new Error('Durante esta instancia, ya no se aceptan más articulos');
    }
}
module.exports = EstadoRevision;