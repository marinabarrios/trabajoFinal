const Sesiones = require("./Sesiones");

class SesionRegular extends Sesiones{
    validarArticulo(articulo) {
        return articulo.tipoArticulo === "Regular";
    }
    
    verificarDeadlineRecepcion() {
        return new Date() <= this.deadlineRecepcion;
    }
}
module.exports = SesionRegular;