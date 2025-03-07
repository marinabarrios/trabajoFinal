const EstadoSesion = require("./EstadoSesion");
const EstadoAsignacion = require("./EstadoAsignacion");
//En el bidding los revisores expresan su interés por los artículos

class EstadoBidding extends EstadoSesion {
    constructor(sesion) {
        super(sesion);
    }

    setEstado(){
        return 'BIDDING';
    }

    asignarEstado() {
        this._sesion.modificarEstadoSesion(new EstadoAsignacion(this._sesion));
    }

    agregarArticulo(articulo, fechaActual){
        throw new Error('Durante esta instancia, ya no se aceptan más articulos');
    }

    procesarBidding(revisor, articulo, tipoDeInteres) {
        if (!(this._sesion.estadoSesion() instanceof EstadoBidding)) {
            throw new Error(
                "El proceso de bidding sólo se puede realizar durante el estado de bidding."
            );
        }     
        
        //Verifico si el interés es válido
        const interesesValidos = ['INTERESADO', 'QUIZAS', 'NO INTERESADO'];
        if (!interesesValidos.includes(tipoDeInteres)) {
            throw new Error('No se reconoce este tipo de interés');
        }

        //Verifico si el revisor es revisor de la sesión
        if (!this._sesion._revisores.includes(revisor)) {
            throw new Error('El revisor no es revisor de la sesión donde se presentó el artículo');
        }

        articulo.interesRevisores(revisor, tipoDeInteres);
    }

    asignarRevisores(){
        throw new Error('El proceso de asignación de artículos sólo se puede realizar durante el estado de asignación');
    }
}
module.exports = EstadoBidding;