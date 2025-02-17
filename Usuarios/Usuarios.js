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
        this._rol = []; // el usuario tiene un solo rol... antes de seguir avanzando -> ver todos los cambios que debo hacer. xq así como está puede tener mas de un rol

        // Agrega cada usuario creado a la lista
        Usuarios.usuariosRegistrados.push(this);
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }

    agregarRol(rol){
        if (!this._rol.includes(rol)) {
            this._rol.push(rol);
        }
    }

    static listarUsuariosPorRol(usuarios, rol) {
        return usuarios.filter(usuario => usuario._rol.includes(rol));
    }

    cambiarRolUsuario(nuevoRol) {
        if (!this._rol.length) {
            throw new Error("El usuario no tiene un rol asignado.");
        }

        this._rol = [nuevoRol];
    }

    // Lista todos los usuarios con sus roles
    static listarTodosLosUsuarios() {
        return Usuarios.usuariosRegistrados.map(usuario => ({
            nombre: usuario._nombreUsuario,
            roles: usuario._rol
        }));
    }
}
module.exports = Usuarios;