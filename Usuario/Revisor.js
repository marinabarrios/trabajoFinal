const Usuario = require("./Usuario");

class Revisor extends Usuario{
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        super(nombreUsuario, afiliacion, email, contrasenia);
        this.agregarRol('REVISOR');
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }

    cambiarRolUsuario(nuevosRoles) {
        if (!this._roles) {
            throw new Error("El usuario no tiene un rol asignado.");
        }

        // Si el usuario es "CHAIR" o "REVISOR", evitar que cambie a su opuesto
        if ((nuevosRoles === "CHAIR" && this._roles.includes("REVISOR")) || 
            (nuevosRoles === "REVISOR" && this._roles.includes("CHAIR"))) {
            throw new Error("No se puede cambiar directamente entre CHAIR y REVISOR.");
        }
        this._roles = nuevosRoles;
    }
}
module.exports = Revisor;
