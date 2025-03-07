const Estrategia = require("../Estrategia/Estrategia");

class PorcentajeDeAceptados extends Estrategia{
    constructor(porcentajeAceptacion) {
      super();
      if (typeof porcentajeAceptacion !== "number" || porcentajeAceptacion <= 0 || porcentajeAceptacion > 100) {
        throw new Error("El porcentaje de aceptación debe estar entre 1 y 100.");
    }
      this._porcentajeAceptacion = porcentajeAceptacion;
    }

    seleccionar(sesion) {
        if (!sesion._puntuacionesRevision || sesion._puntuacionesRevision.size === 0) return [];

        //Obtengo los artículos desde las puntuaciones
        const articulos = Array.from(sesion._puntuacionesRevision.keys());

        //Ordeno artículos por puntaje de mayor a menor
        articulos.sort((a, b) => sesion.obtenerPuntajePromedio(b) - sesion.obtenerPuntajePromedio(a));

        //Determino cuántos artículos se aceptan según el porcentaje
        const cantidadAceptados = Math.ceil((this._porcentajeAceptacion / 100) * articulos.length);

        return articulos.slice(0, cantidadAceptados);
    }
}
module.exports = PorcentajeDeAceptados;