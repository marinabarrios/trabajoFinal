const Usuario = require("../Usuario/Usuario");
const EstadoRecepcion = require('../EstadoSesion/EstadoRecepcion');
const Estrategia = require('../Estrategia/Estrategia');

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
        this._articulosSeleccionados = [];
        this._puntuacionesRevision = new Map(); //Guardo las puntuaciones hechas en el estado de revisión
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
        if (typeof maxAceptados !== "number" || maxAceptados <= 0) {
            throw new Error("El número máximo de artículos aceptados debe ser un número positivo.");
        }
        this._maxArticulosAceptados = maxAceptados;
    }

    setEstrategia(estrategia) {
        if (!(estrategia instanceof Estrategia)) {
            throw new Error("La estrategia debe ser una instancia válida de Estrategia.");
        }
        this._estrategia = estrategia;
    }

    seleccionarArticulos() {
        if (!this._estrategia) throw new Error("No se ha definido una estrategia de selección.");
        if (!this._maxArticulosAceptados) throw new Error("No esta definido el número máximo a aceptar de esta sesión");
        
        // Aplicar estrategia para obtener los artículos seleccionados
        const articulosPreseleccionados = this._estrategia.seleccionar(this);
        
        // Limitar la cantidad de artículos seleccionados
        this._articulosSeleccionados = articulosPreseleccionados.slice(0, this._maxArticulosAceptados);
        return this._articulosSeleccionados;
    }

    obtenerPuntajePromedio(articulo) {
        if (!this._puntuacionesRevision || !this._puntuacionesRevision.has(articulo)) {
            return 0; // Si no hay puntuaciones, el promedio es 0
        }
    
        const puntuaciones = this._puntuacionesRevision.get(articulo).map(p => p.puntaje);
        const suma = puntuaciones.reduce((acc, p) => acc + p, 0);
        return suma / puntuaciones.length;
    }

    articulosSeleccionados(){
        return this._articulosSeleccionados;
    }
}
module.exports = Sesion;