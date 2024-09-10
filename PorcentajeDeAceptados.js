const Estrategias = require("./Estrategias.js");

class PorcentajeDeAceptados extends Estrategias{
    constructor(porcentajeAceptacion) {
      super();
      this._porcentajeAceptacion = porcentajeAceptacion;
    }
  
    seleccionarTipoDeEvaluacion(articulosConPuntaje) {
        // Crear un objeto para almacenar los puntajes acumulados y la cantidad de evaluaciones de cada artículo
        const puntajesPorArticulo = {};

        // Calcular el puntaje total y la cantidad de evaluaciones para cada artículo
        articulosConPuntaje.forEach(evaluacion => {
            const idArticulo = evaluacion.articulo;

            if (!puntajesPorArticulo[idArticulo]) {
            puntajesPorArticulo[idArticulo] = { puntajeTotal: 0, cantidadEvaluaciones: 0 };
            }

            puntajesPorArticulo[idArticulo].puntajeTotal += evaluacion.puntaje;
            puntajesPorArticulo[idArticulo].cantidadEvaluaciones += 1;
        });

        // Calcular el puntaje promedio de cada artículo
        const puntajes = Object.entries(puntajesPorArticulo).map(([idArticulo, datos]) => {
                                    const puntajePromedio = datos.puntajeTotal / datos.cantidadEvaluaciones;
                                    return { idArticulo, puntajePromedio };
        });

        // Ordenar los artículos por puntaje en orden decreciente
        puntajes.sort((a, b) => b.puntajePromedio - a.puntajePromedio);

        // Calcular la cantidad de artículos a aceptar según el porcentaje
        const cantidadAceptada = Math.ceil(puntajes.length * this._porcentajeAceptacion);

        // Seleccionar los artículos aceptados y rechazados
        const articulosAceptados = puntajes.slice(0, cantidadAceptada);
        const articulosRechazados = puntajes.slice(cantidadAceptada);

        return { articulosAceptados, articulosRechazados };
    }
}
module.exports = PorcentajeDeAceptados;