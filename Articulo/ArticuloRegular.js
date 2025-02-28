const Articulo = require("./Articulo");

class ArticuloRegular extends Articulo{
    constructor(tituloArticulo, archivoAdjunto, autoresArticulo, abstract, autorNotificacion){
        super(tituloArticulo, archivoAdjunto, autoresArticulo, autorNotificacion);
       
        this.agregarTipoArticulo('REGULAR');
        
        if (!abstract || typeof abstract !== 'string' || abstract.trim() === "") {
            throw new Error("Rechazado: El abstract no puede estar vacío");
        }
        if (abstract.split(/\s+/).length > 300) {
            throw new Error("Rechazado: El resúmen no puede tener más de 300 palabras");
        }
        this._abstract = abstract;
    }

    notificacion(msg){
        this._autorNotificacion.forEach(autor => {
            autor.recibe_notificacion(msg);
        });
    }
    
    /*calcularPuntajeFinal(evaluaciones) {
        let total = evaluaciones.reduce((sum, eval) => sum + eval.puntaje, 0);
        return total / evaluaciones.length;
    }*/
}
module.exports = ArticuloRegular;