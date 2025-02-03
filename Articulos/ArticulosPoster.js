const Articulos = require("./Articulos");

class ArticulosPoster extends Articulos{
    calcularPuntajeFinal(evaluaciones) {
        return evaluaciones.length > 2 ? "Aceptado" : "Rechazado";
    }
}
module.exports = ArticulosPoster;