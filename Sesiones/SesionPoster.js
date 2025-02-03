const Sesiones = require("./Sesiones");

class SesionPoster extends Sesiones{
    validarArticulo(articulo) {
        return articulo.tipoArticulo === "Poster";
    }
    
    agregarEvaluacion(articulo, revisor, comentario, puntaje) {
        return { articulo, revisor, comentario, puntaje, fecha: new Date() };
    }
}
module.exports = SesionPoster;