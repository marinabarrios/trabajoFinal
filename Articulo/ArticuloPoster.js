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

    notificar(msg){
        this._autorNotificacion.forEach(autor => {
            autor.recibeNotificacion(msg);
        });
    }
}
module.exports = ArticuloPoster;