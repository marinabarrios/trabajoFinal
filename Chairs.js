const Usuarios = require("./Usuarios");

class Chairs extends Usuarios{
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        super(nombreUsuario, afiliacion, email, contrasenia);
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }    

    verBidds(articulo){
        return articulo.mostrarRevisorInteres();
    }
    
    cambiarEstadoSesion(sesion,estadoSesion){
        return sesion.modificarEstadoSesion(estadoSesion);
    }

    asignarRevisores(sesion){
        const maxRevisiones = 3;
        /** TRAER TODOS LOS ARTICULOS QUE ESTAN EN LA CLASE SESION,
         * RECORRER EL ARRAY Y BUSCAR SUS INTERESES QUE ESTAN EN LA CLASE ARTICULO, 
         * ASIGNAR REVISOR Y LUEGO GUARDAR TODO EN UN NUEVO ARRAY */
        const todosLosArticulos = sesion.obtenerArticulos();
//console.log('todosLosArticulos',todosLosArticulos);
        //articulo.mostrarRevisorInteres();
    }
}
module.exports = Chairs;