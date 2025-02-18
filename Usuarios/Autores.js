const Articulos = require("../Articulos/Articulos");
const Usuarios = require("./Usuarios");

class Autores extends Usuarios{
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        super(nombreUsuario, afiliacion, email, contrasenia);
        this._nombreUsuario = nombreUsuario;
        this._afiliacion = afiliacion;
        this._email = email;
        this._contrasenia = contrasenia;
        this.agregarRol('AUTOR');
        //this._articulosCreados = []; //Lista de articulos enviados
        //this._notificaciones = []; // Lista de notificaciones recibidas
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }

    cambiarRolUsuario(nuevoRol) {
        if (!this._rol) {
            throw new Error("El usuario no tiene un rol asignado.");
        }

        this._rol = nuevoRol;
    }
/*
    crearArticulo(id, tituloArticulo, tipoArticulo, abstract = null, archivoAdjunto, autoresArticulo, archivoFuentes = null, autorNotificacion, fechaEntrega){
        const nuevoArticulo = new Articulos (id, tituloArticulo, tipoArticulo, abstract, archivoAdjunto, autoresArticulo, archivoFuentes, autorNotificacion, fechaEntrega);
        //Cuando se crea el articulo se crea en el estado enProceso, eso quiere decir que aun no esta aceptado ni rechazado//
        nuevoArticulo._estadoArticulo = 'enProceso';
        this._articulosCreados.push(nuevoArticulo);
        return nuevoArticulo;
    }

    // Método para enviar artículos
    enviarArticulo(sesion, articulo) { 
        //le paso a la sesion el estado del articulo// 
        articulo._estadoArticulo = 'enProceso';
        sesion.recibirArticulo(articulo);
        console.log(`El artículo con ID ${articulo._id} fue enviado a la Sesion.`);
    }

    listArticulosCreados(){
        return this._articulosCreados;
    }

    agregarNotificacion(mensaje) {
        this._notificaciones.push(mensaje);
    }

    obtenerNotificaciones() {
        return this._notificaciones;
    }*/
}
module.exports = Autores;