const Sesion = require("./Sesion");

class SesionWorkshop extends Sesion{
    constructor(tema, tipoSesion, deadlineRecepcion) {
        super(tema, tipoSesion, deadlineRecepcion);
        this._deadlineRecepcion = deadlineRecepcion;
    }

    tipoArticuloPermitido(tipoArticulo) {
        return tipoArticulo === "REGULAR" || tipoArticulo === "POSTER";
    }
}
module.exports = SesionWorkshop;