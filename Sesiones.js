const GestorDeArticulos = require("./GestorDeArticulos");

class Sesiones{
    constructor(tema, tipoSesion, deadlineRecepcion, estadoSesion, tipoDeEvaluacion = null) {
        this._tema = tema;
        this._tipoSesion = tipoSesion; // 'regular', 'workshop', 'posters'
        this._deadlineRecepcion = deadlineRecepcion;
        this._estadoSesion = estadoSesion;
        this._tipoDeEvaluacion = tipoDeEvaluacion;
        this._articulos = [];
    }

    recibirArticulo(articulo) {
        if (this.validarArticulo(articulo)) {
            this._articulos.push(articulo);
            const gestor = new GestorDeArticulos();
            gestor.agregarArticulo(articulo);
            return this._articulos;
        } else {
           // throw new Error('Artículo no válido para esta sesión');
           console.log('Artículo no válido para esta sesión');
        }
    }

    validarArticulo(articulo) {
        if (this._tipoSesion === 'regular' && articulo._tipoArticulo !== 'regular') {
            return false;
        }
        if (this._tipoSesion === 'workshop' && articulo._tipoArticulo !== 'regular' && articulo._tipoArticulo !== 'poster') {
            return false;
        }
        if (this._tipoSesion === 'posters' && articulo._tipoArticulo !== 'poster') {
            return false;
        }

        // Validar otros requisitos como abstract y autores
        if (articulo._tipoArticulo === 'regular' && (!articulo._abstract || articulo._abstract.length > 300)) {
            //debería informarle al autor que tiene errores
            const mensaje = 'Falta Abstract o tiene mas de 300 caracteres. Se rechaza el artículo';
            this.realizarNotificacion(articulo._autorNotificacion, mensaje);
            return false;
        }

        if (articulo._autoresArticulo.length < 1) {
            const mensaje = 'Falta definir los Autores. Se rechaza el artículo';
            this.realizarNotificacion(articulo._autorNotificacion, mensaje);
            return false;
        }
        
        return true;
    }

    realizarNotificacion(autores, mensaje){
        autores.agregarNotificacion(mensaje);
    }

    /*cambiarTipoDeEvaluacion(tipoDeEvaluacion){

    }*/
}
module.exports = Sesiones;