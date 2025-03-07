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
        /*if (!Array.isArray(articulos) || articulos.length === 0) return [];

        //Ordeno artículos por puntaje de mayor a menor
        articulos.sort((a, b) => sesion.obtenerPuntajePromedio(b) - sesion.obtenerPuntajePromedio(a));

        //Se determina cuántos artículos se aceptan según el porcentaje
        const cantidadAceptados = Math.ceil((this._porcentajeAceptacion / 100) * articulos.length);

        return articulos.slice(0, cantidadAceptados);*/

        if (!sesion._puntuacionesRevision || sesion._puntuacionesRevision.size === 0) return [];

        // Obtener los artículos desde las puntuaciones
        const articulos = Array.from(sesion._puntuacionesRevision.keys());

        // Ordenar artículos por puntaje de mayor a menor
        articulos.sort((a, b) => sesion.obtenerPuntajePromedio(b) - sesion.obtenerPuntajePromedio(a));

        // Se determina cuántos artículos se aceptan según el porcentaje
        const cantidadAceptados = Math.ceil((this._porcentajeAceptacion / 100) * articulos.length);

        return articulos.slice(0, cantidadAceptados);
    }
  
/*    seleccionarTipoDeEvaluacion(articulosConPuntaje) {
        const puntajesPorArticulo = {};

        //Calculo el puntaje total y la cantidad de evaluaciones para cada artículo
        articulosConPuntaje.forEach(evaluacion => {
            const idArticulo = evaluacion.idArticulo;

            if (!puntajesPorArticulo[idArticulo]) {
            puntajesPorArticulo[idArticulo] = { puntajeTotal: 0, cantidadEvaluaciones: 0 };
            }

            puntajesPorArticulo[idArticulo].puntajeTotal += evaluacion.puntajePromedio;
            puntajesPorArticulo[idArticulo].cantidadEvaluaciones += 1;
        });

        //Calculo el puntaje promedio de cada artículo
        const puntajes = Object.entries(puntajesPorArticulo).map(([idArticulo, datos]) => {
                                    const puntajePromedio = datos.puntajeTotal / datos.cantidadEvaluaciones;
                                    return { idArticulo, puntajePromedio };
        });

        //Ordeno los artículos por puntaje en orden decreciente
        puntajes.sort((a, b) => b.puntajePromedio - a.puntajePromedio);

        //Calculo la cantidad de artículos a aceptar según el porcentaje
        const cantidadAceptada = Math.ceil(puntajes.length * this._porcentajeAceptacion);
        
        //Selecciono los artículos aceptados y rechazados
        const articulosAceptados = puntajes.slice(0, cantidadAceptada);
        const articulosRechazados = puntajes.slice(cantidadAceptada);

        return { articulosAceptados, articulosRechazados };
    }

    /* constructor(porcentaje) {
        super();
        this.porcentaje = porcentaje; // Valor entre 0 y 100
    }*/

    
}
module.exports = PorcentajeDeAceptados;