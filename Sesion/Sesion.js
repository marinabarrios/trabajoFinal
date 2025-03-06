const Usuario = require("../Usuario/Usuario");
const EstadoRecepcion = require('../EstadoSesion/EstadoRecepcion');

class Sesion{
    constructor(tema, tipoSesion, deadlineRecepcion) {
        if (this.constructor === Sesion) {
            throw new Error("No se puede instanciar una clase abstracta");
        }
        this._tema = tema;
        this._tipoSesion = tipoSesion;
        this._estadoSesion = new EstadoRecepcion(this, deadlineRecepcion);
        this._articulos = [];
        this._revisores = [];
        this._maxArticulosAceptados = null;
        this._estrategia = null;
    }

    listArticulos(){
        return this._articulos;
    }

    estadoSesion(){
        return this._estadoSesion;
    }

    modificarEstadoSesion(estado) {
        this._estadoSesion = estado;
    }

    maxArticulosAceptados(){
        return this._maxArticulosAceptados;
    }

    //La sesion recibe el articulo y envía al estado para verificar si se lo recibe
    recibirArticulo(articulo){
        const fechaActual = new Date().toISOString().split('T')[0];
        this._estadoSesion.agregarArticulo(articulo, fechaActual);
    }

    //Agrego los artículos que pasaron todas las verificaciones
    agregarArticuloVerificado(articulo){
        this._articulos.push(articulo);
    }

    tipoArticuloPermitido(tipoArticulo) {
        throw new Error('Método no implementado en la clase actual');
    }

    //Se agrega los revisores de la sesion
    agregarRevisores(nombreUsuario) {
        //Busco al usuario en la lista de usuarios registrados
        const usuario = Usuario.usuariosRegistrados.find(u => u._nombreUsuario === nombreUsuario);

        if (!usuario) {
            throw new Error('El usuario no está registrado en el sistema');
        }
    
        //Verifico si el usuario ya tiene el rol de REVISOR
        if (!usuario._roles.includes('REVISOR')) {
            throw new Error('El usuario no tiene el rol de REVISOR');
        }
    
        //Verifico si el usuario ya es revisor de la sesión
        if (this._revisores.includes(usuario)) {
            throw new Error('Este usuario ya es revisor de esta sesión');
        }
    
        //Agrego el usuario como revisor de la sesión
        this._revisores.push(usuario);
    }

    guardarAsignacion(articulo, revisoresAsignados) {
        //Encuentro el artículo en la lista de artículos de la sesión
        const articuloEnSesion = this._articulos.find(a => a === articulo);
        if (articuloEnSesion) {
            //Asigno los revisores al artículo usando el método del artículo
            revisoresAsignados.forEach(revisor => {
                articuloEnSesion.agregarRevisorAsignado(revisor);
            });
        } else {
            throw new Error('No se encontró el artículo en esta sesión');
        }
    }

    setMaxDeArticulosAceptados(maxAceptados){
        this._maxArticulosAceptados = maxAceptados;
    }

    setEstrategia(estrategia) {
        this._estrategia = estrategia;
    }

    seleccionarArticulos() {
        if (!this._estrategia) throw new Error("No se ha definido una estrategia de selección.");
        return this._estrategia.seleccionar(this._articulos);
    }
  /*  
   
    /*constructor(tema, tipoSesion, deadlineRecepcion, estadoSesion, estrategiaPorDefecto, estrategiasPorTipoDeArticulo = {}) {
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
    }*/
}
module.exports = Sesion;