const Sesion = require("./Sesion");

class SesionPoster extends Sesion{
    constructor(tema, tipoSesion, deadlineRecepcion) {
        super(tema, tipoSesion, deadlineRecepcion);
        this._deadlineRecepcion = deadlineRecepcion;
    }

    tipoArticuloPermitido(tipoArticulo) {
        return tipoArticulo === "POSTER";
    }
}
module.exports = SesionPoster;