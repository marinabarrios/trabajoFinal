class Usuarios {
    // Lista estática de todos los usuarios
    static usuariosRegistrados = [];

    constructor (nombreUsuario, afiliacion, email, contrasenia){
        if (this.constructor === Usuarios) {
            throw new Error("No se puede instanciar una clase abstracta");
        }
        this._nombreUsuario = nombreUsuario;
        this._afiliacion = afiliacion;
        this._email = email;
        this._contrasenia = contrasenia;
        this._usuarios = [];
        this._roles  = [];

        // Agrega cada usuario creado a la lista
        Usuarios.usuariosRegistrados.push(this);
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }

    agregarRol(rol){
        if (!this._roles.includes(rol)) {
            if ((rol === "CHAIR" && this._roles.includes("REVISOR")) || 
                (rol === "REVISOR" && this._roles.includes("CHAIR"))) {
                throw new Error("Un usuario no puede ser CHAIR y REVISOR al mismo tiempo.");
            }
            this._roles.push(rol);
        }
    }

    removerRol(rol) {
        this._roles = this._roles.filter(r => r !== rol);
    }

    static listarUsuariosPorRol(rol) {
        //return usuarios.filter(usuario => usuario._rol.includes(rol));
        return Usuarios.usuariosRegistrados.filter(usuario => usuario._roles.includes(rol));
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

    // Lista todos los usuarios con sus roles
    static listarTodosLosUsuarios() {
        return Usuarios.usuariosRegistrados.map(usuario => ({
            nombre: usuario._nombreUsuario,
            roles: usuario._roles
        }));
    }
}
module.exports = Usuarios;