const Articulos = require("./Articulos");

class ArticulosRegular extends Articulos{
    calcularPuntajeFinal(evaluaciones) {
        let total = evaluaciones.reduce((sum, eval) => sum + eval.puntaje, 0);
        return total / evaluaciones.length;
    }
}
module.exports = ArticulosRegular;