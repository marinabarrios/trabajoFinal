const Usuario = require("./Usuario");

class Autor extends Usuario{
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        super(nombreUsuario, afiliacion, email, contrasenia);
        this.agregarRol('AUTOR');
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

    //Similo la recepción de la notificación
    recibeNotificacion(msg) {
        console.log(`Notificación para ${this._nombreUsuario}: ${msg}`);
    }
}
module.exports = Autor;