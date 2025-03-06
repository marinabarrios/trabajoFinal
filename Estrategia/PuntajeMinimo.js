const Estrategia = require("./Estrategia/Estrategia");

class PuntajeMinimo extends Estrategia {
    constructor(puntajeMinimo) {
      super();
      this._puntajeMinimo = puntajeMinimo;
    }
  
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
    }

    seleccionar(articulos) {
        if (!Array.isArray(articulos) || articulos.length === 0) return [];

        // Filtrar los artículos que cumplen con el puntaje mínimo
        return articulos.filter(articulo => articulo.obtenerPuntajePromedio() >= this.puntajeMinimo);
    }*/
  }
  module.exports = PuntajeMinimo;