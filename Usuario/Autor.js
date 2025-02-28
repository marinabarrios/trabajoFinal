const Usuario = require("./Usuario");

class Autor extends Usuario{
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        super(nombreUsuario, afiliacion, email, contrasenia);
        this.agregarRol('AUTOR');
        
        //this._articulosCreados = []; //Lista de articulos enviados
        //this._notificaciones = []; // Lista de notificaciones recibidas
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }

    // Método que permite a los usuarios cambiar de rol
    cambiarRolUsuario(nuevosRoles) {
        if (!this._roles) {
            throw new Error("El usuario no tiene un rol asignado.");
        }

        // Si el usuario es "CHAIR" o "REVISOR", no puede cambiar a su opuesto
        if ((nuevosRoles === "CHAIR" && this._roles.includes("REVISOR")) || 
            (nuevosRoles === "REVISOR" && this._roles.includes("CHAIR"))) {
            throw new Error("No se puede cambiar directamente entre CHAIR y REVISOR.");
        }
        this._roles = nuevosRoles;
    }

    // Método para enviar artículos a la sesion
    enviarArticulo(sesion, articulo) { 
        sesion.recibirArticulo(articulo);
    }

    recibe_notificacion(msg) {
        console.log(`Notificación para ${this._nombreUsuario}: ${msg}`);
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
module.exports = Autor;