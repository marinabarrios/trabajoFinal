const GestorDeArticulos = require("./GestorDeArticulos");
const Articulos = require("./Articulos");
const Autores = require("./Autores");

class Sesiones{
    constructor(tema, tipoSesion, deadlineRecepcion, estadoSesion, estrategiaPorDefecto, estrategiasPorTipoDeArticulo = {}) {
        this._tema = tema;
        this._tipoSesion = tipoSesion; // 'regular', 'workshop', 'posters'
        this._deadlineRecepcion = deadlineRecepcion;
        this._estadoSesion = estadoSesion;
        this._tipoDeEvaluacion = estrategiaPorDefecto;
        this._estrategiasPorTipoDeArticulo = new Map(Object.entries(estrategiasPorTipoDeArticulo));//Inicializo con las estrategias dadas;
        this._articulos = [];
        this._asignaciones = [];
        this._evaluaciones = [];
        this._articulosAceptados = [];
        this._articulosRechazados = [];

        if (tipoSesion !== 'workshop' && Object.keys(estrategiasPorTipoDeArticulo).length > 0) {
            console.warn("Las estrategias por tipo de artículo solo son aplicables para sesiones tipo 'Workshop'.");
            this._estrategiasPorTipoDeArticulo.clear();
        }
    }

    //Método que recibe el artículo del autor
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

    //Método que verifica si el artículo es válido. Si no es válido envía una notificación al autor
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
    }

    //Método que permite verificar si se pasó la fecha del deadline
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

    //Método que envía la notificación de que no pasó la validación al autorNotificacion
    realizarNotificacion(autores, mensaje){
        autores.agregarNotificacion(mensaje);
    }

    //Método que busca los artículos de la sesión en archivo .json que se generó
    verArticulos(){
        const gestor = new GestorDeArticulos();
        const articulosAlmacenados = gestor.leerArticulos(this._tema);console.log('articulosAlmacenados',articulosAlmacenados);
        const articulosDeLaSesion = this.desdeObjetoPlano(articulosAlmacenados);
        return articulosDeLaSesion;
    }

    //Método que guarda a que revisor se le asignó el artículo
    guardarAsignacion(articuloId, revisoresAsignados) {
        if (!this._asignaciones) {
          //Inicializo el array de revisores asignados si no existe para el artículo dado
          this._asignaciones= [];
        }
    
        //Agrego los revisores asignados para el artículo
        this._asignaciones.push({sesion: this._tema, articulo: articuloId, revisor: revisoresAsignados});    
        console.log(`Asignación guardada para el artículo ${articuloId} de la Sesion ${this._tema}:`, revisoresAsignados);
    } 

    //Método que guarda la evaluación del revisor a cada artículo
    agregarEvaluacion(articuloId, nombreRevisor, comentario, puntaje) {
        //Creo una nueva evaluación
        const tipoArticulo = this.verTipoArticulo(articuloId);
        const nuevaEvaluacion = {
            articulo: articuloId,
            tipoArticulo: tipoArticulo,
            revisor: nombreRevisor,
            comentario: comentario,
            puntaje: puntaje,
            fecha: new Date()
        };

        //Agrego la evaluación al array de evaluaciones
        this._evaluaciones.push(nuevaEvaluacion);
        console.log(`Evaluación agregada: ${nombreRevisor} evaluó el artículo ${articuloId} con puntaje ${puntaje}.`);
    }
      
    //Método para ver todos los artículos con sus asignaciones
    verAsignaciones(revisor=null) {
        if (revisor) {
            const asignacionesFiltradas = this._asignaciones.filter(asignacion =>
                                                                    asignacion.revisores.includes(revisor)
                                                                    );
            return asignacionesFiltradas;
        } else {
            return this._asignaciones;     
        }        
    }

    //Método para Seleccionar artículos basado en la estrategia
    procesoDeSeleccionDeArticulos() {
        //Agrupo evaluaciones por artículo
        const puntajesPorArticulo = this._evaluaciones.reduce((acc, evaluacion) => {
            if (!acc[evaluacion.articulo]) acc[evaluacion.articulo] = [];
            acc[evaluacion.articulo].push(evaluacion.puntaje);
            return acc;
        }, {});

        //Calculo el puntaje promedio de cada artículo
        const articulosConPuntaje = Object.keys(puntajesPorArticulo).map(articulo => {
        const puntajes = puntajesPorArticulo[articulo];
        const puntajePromedio = puntajes.reduce((acc, p) => acc + p, 0) / puntajes.length;
        return { articulo, puntajePromedio };
        });

        //Aplico la estrategia de Selección
        const { articulosAceptados, articulosRechazados } = this._tipoDeEvaluacion.seleccionarTipoDeEvaluacion(articulosConPuntaje);

        //Actualizo estado de la sesión y resultados
        this._articulosAceptados = articulosAceptados;
        this._articulosRechazados = articulosRechazados;
        this._estadoSesion = 'seleccion';

        console.log(`Artículos aceptados para la sesión ${this._tema}:`, articulosAceptados);
        console.log(`Artículos rechazados para la sesión ${this._tema}:`, articulosRechazados);
    }

    //Método para ejecutar la evaluación con la estrategia actual
    ejecutarEvaluacion(evaluaciones) {
        if (!this._tipoDeEvaluacion) {
            throw new Error("No se ha definido una estrategia de evaluación.");
        }
        const resultados = {};
        //Agrupo evaluaciones por tipo de artículo
        const evaluacionesPorTipo = evaluaciones.reduce((grupos, evaluacion) => {
                                        const { tipoArticulo } = evaluacion;
                                        if (!grupos[tipoArticulo]) {
                                        grupos[tipoArticulo] = [];
                                        }
                                        grupos[tipoArticulo].push(evaluacion);
                                        return grupos;
        }, {});

        //Evaluar cada grupo de artículos por separado según su tipo
        for (const tipoArticulo in evaluacionesPorTipo) {
            const estrategia = this._tipoSesion === 'workshop' && this._estrategiasPorTipoDeArticulo.has(tipoArticulo)
                ? this._estrategiasPorTipoDeArticulo.get(tipoArticulo)
                : this._tipoDeEvaluacion;

            const evaluacionesGrupo = evaluacionesPorTipo[tipoArticulo];
    
            const resultado = estrategia.seleccionarTipoDeEvaluacion(
            evaluacionesGrupo.map(e => ({ idArticulo: e.articulo, puntajePromedio: e.puntaje }))
            );
    
            resultados[tipoArticulo] = resultado;
        }
        return resultados;
    }

    definirEstrategiaPorTipoArticulo(tipoArticulo, estrategia) {
        if (this._tipoSesion === 'workshop') {
            this._estrategiasPorTipoDeArticulo.set(tipoArticulo, estrategia);
        } else {
            console.warn("No se pueden definir estrategias por tipo de artículo para esta sesión.");
        }
    }

    //Método para cambiar la estrategia de evaluación
    cambiarEstrategia(tipoDeEvaluacion) {
        this._tipoDeEvaluacion = tipoDeEvaluacion;
        console.log(`Estrategia de evaluación cambiada a ${tipoDeEvaluacion.constructor.name}`);
    }

    mostrarEvaluaciones(){
        return this._evaluaciones;
    }

    verTipoArticulo(id){
        const gestor = new GestorDeArticulos();
        const articulosAlmacenados = gestor.obtenerArticuloPorId(this._tema, id);
        const articulosDeLaSesion = articulosAlmacenados.tipoArticulo;
        return articulosDeLaSesion;
    }

    //Método que recibe un objeto y lo guarda en plano en el archivo .json
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

    //Método que combierte algo plano a objeto para luego poder tratarlo
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