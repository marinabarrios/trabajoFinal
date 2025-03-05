const EstadoSesion = require("./EstadoSesion");
const EstadoSeleccion = require("./EstadoSeleccion");
//En la Revision los revisores puntuan los artículos que le asignaron
class EstadoRevision extends EstadoSesion {
    constructor(sesion) {
        super(sesion);
    }

    setEstado(){
        return 'REVISION';
    }

    asignarEstado() {
        this._session.estadoSesion(new EstadoSeleccion(this._session));
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

    agregarRevision(articulo, revisor, revision) {
        if (!(this._sesion.estadoSesion() instanceof EstadoRevision)) {
          throw new Error(
            "El proceso de revisión solo se puede realizar durante el estado de revisión."
          );
        }
        if (!articulo.listRevisoresAsignados().includes(revisor)) {
          throw new Error("El revisor no está asignado a este artículo.");
        }
        articulo.addRevision(revision);
    }
    /*  una vez finalizado el proceso de bidding, los artículos se 
asignan a los revisores. Cada revisor emite una revisión con una recomendación que es 
una calificación entre -3 y +3 (incluyendo el 0). Durante esta instancia, no se aceptan 
más artículos.

La asignación se realiza de la siguiente manera: para cada artículo, se buscan revisores que no 
hayan llegado al límite de revisiones. De éstos se asignan primero los que se marcaron 
“interesado”, si no se llega a 3, se buscan entre los “quizás”. Si aún no se llegó a los 3, se 
busca entre los que no indicaron interés alguno, y si no hay se recurre finalmente a los “no 
interesado”. Luego de la asignación, los revisores ingresan sus revisiones para cada artículo. 
Una revisión tiene un texto y un puntaje que va de -3 a 3 incluyendo el 0. Los artículos no 
deben admitir más de 3 revisiones. */
}
module.exports = EstadoRevision;