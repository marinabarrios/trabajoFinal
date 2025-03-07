const Estrategia = require("../Estrategia/Estrategia");

class PuntajeMinimo extends Estrategia {
    constructor(puntajeMinimo) {
      super();
      if (typeof puntajeMinimo !== "number" || puntajeMinimo <= 0) {
        throw new Error("El puntaje mínimo debe ser un número positivo.");
      }
      this._puntajeMinimo = puntajeMinimo;
    }

    seleccionar(sesion) {
      if (!sesion._puntuacionesRevision || sesion._puntuacionesRevision.size === 0) return [];

      //Obtengo los artículos desde las puntuaciones
      const articulos = Array.from(sesion._puntuacionesRevision.keys());

      //Filtro los artículos que cumplen con el puntaje mínimo
      return articulos.filter(articulo => {
          const puntuaciones = sesion._puntuacionesRevision.get(articulo);
          if (!puntuaciones) return false; // Si no hay puntuaciones, el promedio es 0 y no cumple

          //Obtengo el puntaje promedio del articulo.
          const puntajePromedio = sesion.obtenerPuntajePromedio(articulo);
          return puntajePromedio >= this._puntajeMinimo;
      });
    }
  }
  module.exports = PuntajeMinimo;