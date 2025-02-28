const Articulo = require("./Articulo");

class ArticuloPoster extends Articulo{
    constructor(tituloArticulo, archivoAdjunto, autoresArticulo, archivoFuentes, autorNotificacion){
        super(tituloArticulo, archivoAdjunto, autoresArticulo, autorNotificacion);

        try {
            new URL(archivoFuentes);
            this._archivoFuentes = archivoFuentes;
        } catch (_) {
            throw new Error("Rechazado: El archivo fuente debe ser una URL válida");
        }
        
        this.agregarTipoArticulo('POSTER');
    }

    notificacion(msg){
        this._autorNotificacion.forEach(autor => {
            autor.recibe_notificacion(msg);
        });
    }
    
    /*calcularPuntajeFinal(evaluaciones) {
        return evaluaciones.length > 2 ? "Aceptado" : "Rechazado";
    }*/
}
module.exports = ArticuloPoster;