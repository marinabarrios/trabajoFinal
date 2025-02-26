const Sesion = require("./Sesion");

class SesionRegular extends Sesion{
    constructor(tema, tipoSesion, deadlineRecepcion) {
        super(tema, tipoSesion, deadlineRecepcion);
        this._tema = tema;
        this._tipoSesion = tipoSesion;
        this._deadlineRecepcion = deadlineRecepcion;
        this._maximoArticulosAceptados = 0;
              //    this.metodoSeleccionPorTipo = {};
        //this.metodoSeleccionRegulares = null;
        //this.metodoSeleccionPosters = null;
    }

    tipoArticuloPermitido(tipoArticulo) {
        return tipoArticulo === "REGULAR";
    }

    /*//Método que verifica si el artículo es válido. Si no es válido envía una notificación al autor
    validarArticulo(articulo) {
        if (!articulo._autorNotificacion) {
            throw new Error('Falta definir el Autor que recibe las notificaciones. Se rechaza el artículo');
        }

        const estado = this.verificarDeadlineRecepcion();
        if (estado === 'bidding') {
            const mensaje = 'No se puede crear el artículo, ya ha pasado la fecha límite de entrega.';
            this.realizarNotificacion(articulo._autorNotificacion, mensaje);
            return false;
        }
        if (this._tipoSesion === 'regular' && articulo._tipoArticulo !== 'regular') {
            const mensaje = 'Esta Sesión sólo admite Artículos Regulares.';
            this.realizarNotificacion(articulo._autorNotificacion, mensaje);
            return false;
        }
        if (this._tipoSesion === 'workshop' && articulo._tipoArticulo !== 'regular' && articulo._tipoArticulo !== 'poster') {
            const mensaje = 'El tipo de Artículo es incorrecto.';
            this.realizarNotificacion(articulo._autorNotificacion, mensaje);
            return false;
        }
        if (this._tipoSesion === 'poster' && articulo._tipoArticulo !== 'poster') {
            const mensaje = 'Esta Sesión sólo admite Artículos Posters.';
            this.realizarNotificacion(articulo._autorNotificacion, mensaje);
            return false;
        }

        // Validar otros requisitos como abstract y autores
        if (articulo._tipoArticulo === 'regular' && (!articulo._tituloArticulo || !articulo._archivoAdjunto || !articulo._abstract || articulo._abstract.length >= 300)) {
            const mensaje = 'Falta Abstract o no tiene menos de 300 caracteres o Falta Título o Archivo Adjunto. Se rechaza el artículo';
            this.realizarNotificacion(articulo._autorNotificacion, mensaje);
            return false;
        }

        if (articulo._tipoArticulo === 'poster' && (!articulo._tituloArticulo || !articulo._archivoAdjunto || !articulo._archivoFuentes || articulo._abstract)) {
            const mensaje = 'Falta Título o Archivo Adjunto o Fuentes o Tiene Abstract y no debe tener. Se rechaza el artículo';
            this.realizarNotificacion(articulo._autorNotificacion, mensaje);
            return false;
        }

        if (articulo._tipoArticulo === 'regular' && (!articulo._tituloArticulo)) {
            const mensaje = 'Falta el Título. Se rechaza el artículo';
            this.realizarNotificacion(articulo._autorNotificacion, mensaje);
            return false;
        }

        if (articulo._autoresArticulo && articulo._autoresArticulo.length < 1) {
            const mensaje = 'Falta definir los Autores. Se rechaza el artículo';
            this.realizarNotificacion(articulo._autorNotificacion, mensaje);
            return false;
        }
       
        return true;
    }*/
}
module.exports = SesionRegular;