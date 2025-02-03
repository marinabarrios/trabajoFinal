class Estrategias {
    constructor() {
      if (this.constructor === Estrategias) {
        throw new Error("No se puede instanciar la clase abstracta 'Estrategia'.");
      }
    }

    seleccionarTipoDeEvaluacion(articulosConPuntaje) {
        throw new Error("Debe implementar el método 'seleccionarTipoDeEvaluacion' en una subclase concreta.");
    }
}

module.exports = Estrategias;