const Sesion = require("./Sesion");

class SesionWorkshop extends Sesion{
    constructor(tema, tipoSesion, deadlineRecepcion) {
        super(tema, tipoSesion, deadlineRecepcion);
        this._deadlineRecepcion = deadlineRecepcion;
        this._maximoArticulosAceptados = 0;
              //    this.metodoSeleccionPorTipo = {};
        //this.metodoSeleccionRegulares = null;
        //this.metodoSeleccionPosters = null;
    }

    tipoArticuloPermitido(tipoArticulo) {
        return tipoArticulo === "REGULAR" || tipoArticulo === "POSTER";
    }
}
module.exports = SesionWorkshop;