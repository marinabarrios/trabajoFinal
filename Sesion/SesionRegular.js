const Sesion = require("./Sesion");

class SesionRegular extends Sesion{
    constructor(tema, tipoSesion, deadlineRecepcion) {
        super(tema, tipoSesion, deadlineRecepcion);
        this._deadlineRecepcion = deadlineRecepcion;
    }

    tipoArticuloPermitido(tipoArticulo) {
        return tipoArticulo === "REGULAR";
    }
}
module.exports = SesionRegular;