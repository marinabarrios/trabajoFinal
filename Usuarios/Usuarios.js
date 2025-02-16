class Usuarios {
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        if (this.constructor === Usuarios) {
            throw new Error("No se puede instanciar una clase abstracta");
        }
        this._nombreUsuario = nombreUsuario;
        this._afiliacion = afiliacion;
        this._email = email;
        this._contrasenia = contrasenia;
        this._usuarios = [];
        this._rol = [];
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
}
module.exports = Usuarios;