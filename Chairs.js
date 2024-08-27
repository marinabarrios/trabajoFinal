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

    asignarRevisores(empresa, sesion){
        if ( sesion._estadoSesion === 'asignacion'){
            const maxRevisionesPorArticulo = 3;
            //Traigo todos los articulos grabados en el archivo de la sesión//
            const todosLosArticulos = sesion.verArticulos();
            const todosLosRevisores = empresa.listRevisores();
            const todosLosIntereses = articulo.mostrarRevisorInteres();

            const revisionesAsignadas = new Map();
            todosLosRevisores.forEach(revisor => revisionesAsignadas.set(revisor, 0));

            todosLosArticulos.forEach(articulo => {
                const interesados = [];
                const quizas = [];
                const sinInteres = [];
                const noInteresado = [];
                // Convierte el artículo plano en una instancia de Articulos
                const articuloo = this.fromPlainObject(articulo);
                console.log('alrticulosss',articuloo);
                const todosLosIntereses = articuloo.mostrarRevisorInteres();
                console.log('interesessss',todosLosIntereses);
            // Clasificar revisores según su interés
            intereses.forEach(({ revisor, interes }) => {
                if (interes === 'interesado') interesados.push(revisor);
                else if (interes === 'quizas') quizas.push(revisor);
                else if (interes === 'noInteresado') noInteresado.push(revisor);
                else sinInteres.push(revisor);
            });
    
            // Ordenar los revisores por número de revisiones asignadas (menos revisiones primero)
            interesados.sort((a, b) => revisionesAsignadas.get(a) - revisionesAsignadas.get(b));
            quizas.sort((a, b) => revisionesAsignadas.get(a) - revisionesAsignadas.get(b));
            sinInteres.sort((a, b) => revisionesAsignadas.get(a) - revisionesAsignadas.get(b));
            noInteresado.sort((a, b) => revisionesAsignadas.get(a) - revisionesAsignadas.get(b));
    
            // Asignar revisores al artículo en el orden de prioridad
            const revisoresAsignados = [];
            const listasDeInteres = [interesados, quizas, sinInteres, noInteresado];
    
            for (let lista of listasDeInteres) {
                for (let revisor of lista) {
                    if (revisoresAsignados.length < maxRevisionesPorArticulo && revisionesAsignadas.get(revisor) < maxRevisionesPorArticulo) {
                        revisoresAsignados.push(revisor);
                        revisionesAsignadas.set(revisor, revisionesAsignadas.get(revisor) + 1);
                    }
                }
                if (revisoresAsignados.length >= maxRevisionesPorArticulo) break;
            }
    
            // Si no se logró asignar 3 revisores, lanzar un error o manejarlo según la lógica necesaria
            if (revisoresAsignados.length < maxRevisionesPorArticulo) {
                throw new Error(`No se pudo asignar suficientes revisores para el artículo con ID ${articulo._id}`);
            }
    
            // Finalmente, asigna los revisores al artículo
            articulo.asignarRevisores(revisoresAsignados);
        });
        } else {
            console.log('No se puede asignar. El estado de la Sesión es: '+sesion._estadoSesion);
        }
    }

    static desdeObjetoPlano(obj) {
        return new Articulos(
            obj._id,
            obj._tituloArticulo,
            obj._tipoArticulo,
            obj._abstract,
            obj._archivoAdjunto,
            obj._autoresArticulo.map(autor => new Usuarios(_nombreUsuario)), 
            obj._archivoFuentes,
            new Usuarios(obj._autorNotificacion), 
            new Date(obj._fechaEntrega),
            obj.estadoArticulo
        );
    }
}
module.exports = Chairs;