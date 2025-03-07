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
      /*if (!Array.isArray(articulos) || articulos.length === 0) return [];

        // Filtra los artículos que cumplen con el puntaje mínimo
        return articulos.filter(articulo => {
          const puntajePromedio = sesion._puntuacionesRevision.get(articulo);
          return puntajePromedio !== undefined && puntajePromedio >= this._puntajeMinimo;
        });*/
      if (!sesion._puntuacionesRevision || sesion._puntuacionesRevision.size === 0) return [];

      // Obtener los artículos desde las puntuaciones
      const articulos = Array.from(sesion._puntuacionesRevision.keys());

      // Filtra los artículos que cumplen con el puntaje mínimo
      return articulos.filter(articulo => {
          const puntuaciones = sesion._puntuacionesRevision.get(articulo);
          if (!puntuaciones) return false; // Si no hay puntuaciones, el promedio es 0 y no cumple

          const puntajePromedio = sesion.obtenerPuntajePromedio(articulo); //Obtengo el puntaje promedio del articulo.
          return puntajePromedio >= this._puntajeMinimo;
      });
    }
/*  
    seleccionarTipoDeEvaluacion(articulosConPuntaje) {
      //Agrupo puntajes por artículo
      const puntajesPorArticulo = articulosConPuntaje.reduce((acc, { idArticulo, puntajePromedio }) => {
                                      if (!acc[idArticulo]) {
                                        acc[idArticulo] = { puntajes: [], promedio: 0 };
                                      }
                                      acc[idArticulo].puntajes.push(puntajePromedio);
                                      return acc;
                                    }, {});

      //Calculo promedio de puntajes por artículo
      const articulosConPromedio = Object.keys(puntajesPorArticulo).map(idArticulo => {
                                          const { puntajes } = puntajesPorArticulo[idArticulo];
                                          const promedio = puntajes.reduce((a, b) => a + b, 0) / puntajes.length;
                                          return { idArticulo, puntajePromedio: promedio };
                                        });

      //Aplico la lógica de puntaje mínimo
      const articulosAceptados = articulosConPromedio.filter(articulo => articulo.puntajePromedio >= this._puntajeMinimo);
      const articulosRechazados = articulosConPromedio.filter(articulo => articulo.puntajePromedio < this._puntajeMinimo);

      return { articulosAceptados, articulosRechazados};  
    }
    /* constructor(puntajeMinimo) {
        super();
        this.puntajeMinimo = puntajeMinimo;
    }*/

    
  }
  module.exports = PuntajeMinimo;