const Usuarios = require("./Usuarios");
const Articulos = require("./Articulos");

class Chairs extends Usuarios{
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        super(nombreUsuario, afiliacion, email, contrasenia);
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }    

    verBidds(articulo){
        return articulo.mostrarRevisorInteres();
    }
    
    cambiarEstadoSesion(sesion,estadoSesion){
        return sesion.modificarEstadoSesion(estadoSesion);
    }

    asignarRevisores(sesion, intereses, revisores){
        if (sesion._estadoSesion === 'asignacion') {
            const maxRevisionesPorArticulo = 3;
            const cantRevisores = revisores.length;
            if (cantRevisores >= maxRevisionesPorArticulo) {
                //Obtengo un array aplanado con todos los intereses más la falta de interés
                const interesesCompleto = this.obtenerIntereses(sesion, intereses, revisores);
                
                //Contador de revisiones asignadas por cada revisor
                const contadorRevisiones = {};
    
                //Inicializo el contador de revisiones para cada revisor
                revisores.forEach(revisor => {
                    contadorRevisiones[revisor._nombreUsuario] = 0;
                });
    
                //Clasifico intereses por artículo
                const asignaciones = {};
    
                interesesCompleto.forEach(interes => {
                    const { articulo, revisor, tipoInteres } = interes;
    
                    if (!asignaciones[articulo]) {
                        asignaciones[articulo] = {
                            interesados: [],
                            quizas: [],
                            sinInteres: [],
                            noInteresado: []
                        };
                    }
                
                    //Clasifico revisores según su interés
                    if (tipoInteres === 'interesado') asignaciones[articulo].interesados.push(interes);
                    else if (tipoInteres === 'quizas') asignaciones[articulo].quizas.push(interes);
                    else if (tipoInteres === 'no interesado') asignaciones[articulo].noInteresado.push(interes);
                    else asignaciones[articulo].sinInteres.push(interes);
                });
    
                //Asigno revisores a cada artículo
                Object.keys(asignaciones).forEach(articulo => {
                    const { interesados, quizas, sinInteres, noInteresado } = asignaciones[articulo];
                    const revisoresAsignados = [];
                    let revisionesRestantes = maxRevisionesPorArticulo;
        
                    //Función auxiliar para ordenar revisores dentro de cada grupo
                    const ordenarPorMenosRevisiones = (grupo) => {
                        return grupo.sort((a, b) => contadorRevisiones[a.revisor] - contadorRevisiones[b.revisor]);
                    };
        
                    //Ordeno cada grupo por el número de revisiones asignadas
                    const interesadosOrdenados = ordenarPorMenosRevisiones(interesados);
                    const quizasOrdenados = ordenarPorMenosRevisiones(quizas);
                    const sinInteresOrdenados = ordenarPorMenosRevisiones(sinInteres);
                    const noInteresadoOrdenados = ordenarPorMenosRevisiones(noInteresado);
        
                    //Función auxiliar para asignar revisores por grupo de interés
                    const asignarDelGrupo = (grupo) => {
                        for (const interes of grupo) {
                             //Solo asignar si aún hay espacio para revisiones
                            if (revisionesRestantes > 0) {
                                revisoresAsignados.push(interes.revisor);
                                contadorRevisiones[interes.revisor]++;
                                revisionesRestantes--;
                            } else {
                                break;
                            }
                        }                    
                    };
        
                    //Asigno revisores según la prioridad de interés
                    asignarDelGrupo(interesadosOrdenados);
                    if (revisionesRestantes > 0) asignarDelGrupo(quizasOrdenados);
                    if (revisionesRestantes > 0) asignarDelGrupo(sinInteresOrdenados);
                    if (revisionesRestantes > 0) asignarDelGrupo(noInteresadoOrdenados);
        
                    //Guardo la asignación de revisores para el artículo
                    sesion.guardarAsignacion(articulo, revisoresAsignados);
        
                    //Ingreso las revisiones de cada revisor asignado
                    /* revisoresAsignados.forEach(revisor => {
                        const revision = this.obtenerRevisionDelRevisor(articulo, revisor);
                        sesion.guardarRevision(articulo, revisor, revision);
                    });*/
                });
            } else {
                console.log('No se puede asignar revisores ya que la cantidad de revisiones por artículo necesarias supera a la cantidad de revisores de la sesion.');
            }            
        }    
    }

    obtenerIntereses(sesion,intereses,revisores){
        //Obtengo una lista de todos los IDs de los artículos de la sesion.
        const articulosIds = [...new Set(sesion.verArticulos().map(articulo => articulo._id))];
        
        //Creo una estructura de datos que agrupe intereses por revisor.
        const interesesPorRevisor = revisores.map(revisor => {
            //Busco los intereses existentes del revisor.
            const interesesExistentes = intereses.filter(interes => interes.revisor === revisor._nombreUsuario);
            
            //Creo una lista de artículos con su tipo de interés.
            const interesesCompleto = articulosIds.map(id => {
                const interes = interesesExistentes.find(interes => interes.articulo === id);
                return {
                articulo: id,
                revisor: revisor._nombreUsuario,
                tipoInteres: interes ? interes.tipoInteres : null // null si no existe interés registrado
                };
            });                
            return interesesCompleto;
        });
        // Aplano el array de arrays en un solo array.
        const interesesAplanados = interesesPorRevisor.flat();
        return interesesAplanados;
    }
}
module.exports = Chairs;