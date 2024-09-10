const Estrategias = require("./Estrategias");

class PuntajeMinimo extends Estrategias {
    constructor(puntajeMinimo) {
      super();
      this._puntajeMinimo = puntajeMinimo;
    }
  
    seleccionarTipoDeEvaluacion(articulosConPuntaje) {
      // Aceptar todos los artículos con puntaje mayor o igual al mínimo
      const articulosAceptados = articulosConPuntaje.filter(articulo => articulo.puntajePromedio >= this._puntajeMinimo);
      const articulosRechazados = articulosConPuntaje.filter(articulo => articulo.puntajePromedio < this._puntajeMinimo);
  
      return { articulosAceptados, articulosRechazados };
    }
  }
  module.exports = PuntajeMinimo;