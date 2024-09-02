const GestorDeArticulos = require("./GestorDeArticulos");
const Articulos = require("./Articulos");
const Autores = require("./Autores");

class Sesiones{
    constructor(tema, tipoSesion, deadlineRecepcion, estadoSesion, tipoDeEvaluacion = null) {
        this._tema = tema;
        this._tipoSesion = tipoSesion; // 'regular', 'workshop', 'posters'
        this._deadlineRecepcion = deadlineRecepcion;
        this._estadoSesion = estadoSesion;
        this._tipoDeEvaluacion = tipoDeEvaluacion;
        this._articulos = [];
        this._asignaciones = [];
    }

    recibirArticulo(articulo) {
        if (this.validarArticulo(articulo)) {
            this._articulos.push(articulo);
            const articuloGuardar = this.simplificarArticulo(articulo);
            const gestor = new GestorDeArticulos();
            gestor.agregarArticulo(this._tema, articuloGuardar);
        } else {
           // throw new Error('Artículo no válido para esta sesión');
           console.log('El artículo '+ articulo._id +' no válido para esta sesión');
        }
    }

    obtenerArticulos() {
        return this._articulos;
    }

    modificarEstadoSesion(estadoSesion){
        this._estadoSesion = estadoSesion;
        return this._estadoSesion; 
    }

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
        if (articulo._tipoArticulo === 'regular' && (!articulo._tituloArticulo || !articulo._archivoAdjunto || !articulo._abstract || articulo._abstract.length > 300)) {
            //debería informarle al autor que tiene errores
            const mensaje = 'Falta Abstract o tiene mas de 300 caracteres o Falta Título o Archivo Adjunto. Se rechaza el artículo';
            this.realizarNotificacion(articulo._autorNotificacion, mensaje);
            return false;
        }

        if (articulo._tipoArticulo === 'poster' && (!articulo._tituloArticulo || !articulo._archivoAdjunto || !articulo._archivoFuentes || articulo._abstract)) {
            //debería informarle al autor que tiene errores
            const mensaje = 'Falta Título o Archivo Adjunto o Fuentes o Tiene Abstract y no debe tener. Se rechaza el artículo';
            this.realizarNotificacion(articulo._autorNotificacion, mensaje);
            return false;
        }

        if (articulo._tipoArticulo === 'regular' && (!articulo._tituloArticulo)) {
            //debería informarle al autor que tiene errores
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
    }

    verificarDeadlineRecepcion(){
        const fechaActual = new Date();
        const fechaActualSinHora = fechaActual.toISOString().split('T')[0];
        if (fechaActualSinHora > this._deadlineRecepcion) {
            this._estadoSesion = 'bidding';
        } else {
            this._estadoSesion = 'recepcion';
        }
        return this._estadoSesion;
    }

    realizarNotificacion(autores, mensaje){
        autores.agregarNotificacion(mensaje);
    }

    verArticulos(){
        const gestor = new GestorDeArticulos();
        const articulosAlmacenados =gestor.leerArticulos(this._tema);
        const articulosDeLaSesion = this.desdeObjetoPlano(articulosAlmacenados);
        return articulosDeLaSesion;
    }

    guardarAsignacion(articuloId, revisoresAsignados) {
        if (!this._asignaciones[articuloId]) {
          // Inicializa el array de revisores asignados si no existe para el artículo dado
          this._asignaciones[articuloId] = [];
        }
    
        // Agrega los revisores asignados para el artículo
        this._asignaciones[articuloId] = revisoresAsignados;
    
        console.log(`Asignación guardada para el artículo ${articuloId} de la Sesion ${this._tema}:`, revisoresAsignados);
      }
    
      // Método para obtener las asignaciones de un artículo
      obtenerAsignaciones(articuloId) {
        return this._asignaciones[articuloId] || [];
      }
    
      // Método para ver todos los artículos con sus asignaciones
      verAsignaciones() {
        return this._asignaciones;
      }

    recuperarArticulo(){
        
    }

    simplificarArticulo(articulo) {
        return {
            id: articulo._id,
            tituloArticulo: articulo._tituloArticulo,
            tipoArticulo: articulo._tipoArticulo,
            abstract: articulo._abstract,
            archivoAdjunto: articulo._archivoAdjunto,
            autoresArticulo: articulo._autoresArticulo.map(autores => autores._nombreUsuario),
            archivoFuentes: articulo._archivoFuentes,
            autorNotificacion: articulo._autorNotificacion._nombreUsuario,         
            fechaEntrega: articulo._fechaEntrega,
            estadoArticulo: articulo._estadoArticulo
        };
    }

    desdeObjetoPlano(obj) {
        const armoArticulo = [];
        const articulosCreados = [];
        obj.forEach(articulo => {           
            armoArticulo._id = articulo.id;
            armoArticulo._tituloArticulo = articulo.tituloArticulo;
            armoArticulo._abstract = articulo.abstract;
            armoArticulo._archivoAdjunto = articulo.archivoAdjunto;
            armoArticulo._autoresArticulo = articulo.autoresArticulo.map(nombre => new Autores(nombre, '', '', ''));
            armoArticulo._archivoFuentes = articulo.archivoFuentes;
            armoArticulo._autorNotificacion = new Autores(articulo.autorNotificacion, '', '', '');
            armoArticulo._fechaEntrega = articulo.fechaEntrega;
            armoArticulo._estadoArticulo = articulo.estadoArticulo;

            const artObj = new Articulos(
                armoArticulo._id,
                armoArticulo._tituloArticulo,
                armoArticulo._tipoArticulo,
                armoArticulo._abstract,
                armoArticulo._archivoAdjunto,
                armoArticulo._autoresArticulo, 
                armoArticulo._archivoFuentes,
                armoArticulo._autorNotificacion, 
                armoArticulo._fechaEntrega,
                armoArticulo._estadoArticulo
            );
            articulosCreados.push(artObj);
        });
        return articulosCreados;
    }
}
module.exports = Sesiones;