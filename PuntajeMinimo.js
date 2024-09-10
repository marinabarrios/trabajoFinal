const Estrategias = require("./Estrategias");

class PuntajeMinimo extends Estrategias {
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
  }
  module.exports = PuntajeMinimo;