const EstadoSesion = require("./EstadoSesion");
const EstadoRevision = require("./EstadoRevision");
//En la asignacion se define a que revisores se le va a asignar el artículo
class EstadoAsignacion extends EstadoSesion {
    constructor(sesion) {
        super(sesion);
    }

    setEstado(){
        return 'ASIGNACION';
    }

    asignarEstado() {
        this._session.estadoSesion(new EstadoRevision(this._session));
    }

    agregarArticulo(articulo, fechaActual){
        throw new Error('En esta estapa ya no se aceptan artículos');
    }

    procesarBidding(revisor, articulo, tipoDeInteres){
        throw new Error('En esta estapa no se procesan los intereses');
    }

    asignarRevisores() {
        //Verifico si la sesión está en el estado correcto
        if (!(this._sesion.estadoSesion() instanceof EstadoAsignacion)) {
            throw new Error(
                "El proceso de asignación de artículos sólo se puede realizar durante el estado de asignación"
            );
        }
    
        const maxRevisionesPorArticulo = 3;
        const articulos = this._sesion._articulos;
        const revisores = this._sesion._revisores;
        const interesesCompleto = this.obtenerIntereses();

        // Verifico que la cantidad de revisores sea suficiente
        if (revisores.length < maxRevisionesPorArticulo) {
            throw new Error("No hay suficientes revisores para asignar a cada artículo.");
        }

        const asignaciones = {};
        const contadorRevisiones = {};

        // Inicializo el contador de revisiones para cada revisor
        revisores.forEach(revisor => {
            contadorRevisiones[revisor._nombreUsuario] = 0;
        });

        //Clasifico los intereses por artículo
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
    
            if (tipoInteres === 'INTERESADO') asignaciones[articulo].interesados.push(interes);
            else if (tipoInteres === 'QUIZAS') asignaciones[articulo].quizas.push(interes);
            else if (tipoInteres === 'NO INTERESADO') asignaciones[articulo].noInteresado.push(interes);
            else asignaciones[articulo].sinInteres.push(interes);            
        });
    
        articulos.forEach(articulo => {
            const { interesados, quizas, sinInteres, noInteresado } = asignaciones[articulo];
            const revisoresAsignados = new Set();
            let revisionesRestantes = maxRevisionesPorArticulo;

            // Función auxiliar para ordenar revisores dentro de cada grupo
            const ordenarPorMenosRevisiones = (grupo) => {
                return grupo.sort((a, b) => contadorRevisiones[a.revisor] - contadorRevisiones[b.revisor]);
            };

            // Ordeno cada grupo por el número de revisiones asignadas
            const interesadosOrdenados = ordenarPorMenosRevisiones(interesados);
            const quizasOrdenados = ordenarPorMenosRevisiones(quizas);
            const sinInteresOrdenados = ordenarPorMenosRevisiones(sinInteres);
            const noInteresadoOrdenados = ordenarPorMenosRevisiones(noInteresado);
            
             // Función auxiliar para asignar revisores por grupo de interés
            const asignarDelGrupo = (grupo) => {
                for (const interes of grupo) {
                    if (revisionesRestantes > 0) {
                        const revisor = revisores.find(r => r._nombreUsuario === interes.revisor);
                        revisoresAsignados.add(revisor);
                        contadorRevisiones[interes.revisor]++;
                        revisionesRestantes--;
                    } else {
                        break;
                    }
                }
            };
            //DEBERÍA ORDENARLO ANTES, AHORA NO ESTÁ ASIGNANDO CORRECTAMENTE
            // Asigno revisores según la prioridad de interés
            asignarDelGrupo(interesadosOrdenados);
            if (revisionesRestantes > 0) asignarDelGrupo(quizasOrdenados);
            if (revisionesRestantes > 0) asignarDelGrupo(sinInteresOrdenados);
            if (revisionesRestantes > 0) asignarDelGrupo(noInteresadoOrdenados);
            
            // Verifico si se asignaron suficientes revisores
            if (revisoresAsignados.size !== maxRevisionesPorArticulo) {
                throw new Error(`No se pudo asignar suficientes revisores para el artículo ${articulo._tituloArticulo}`);
            }

            this._sesion.guardarAsignacion(articulo, Array.from(revisoresAsignados));
        });
    }

    obtenerIntereses() {
        const articulos = this._sesion._articulos;
        const revisores = this._sesion._revisores;
        const intereses = [];

        articulos.forEach(articulo => {
            revisores.forEach(revisor => {
                const tipoInteres = articulo.listInteresRevisores().get(revisor);
                intereses.push({
                    articulo: articulo,
                    revisor: revisor._nombreUsuario,
                    tipoInteres: tipoInteres ? tipoInteres : null
                });
            });
        });

        return intereses;
    }
    

    /*  una vez finalizado el proceso de bidding, los artículos se 
asignan a los revisores. Cada revisor emite una revisión con una recomendación que es 
una calificación entre -3 y +3 (incluyendo el 0). Durante esta instancia, no se aceptan 
más artículos.

La asignación se realiza de la siguiente manera: para cada artículo, se buscan revisores que no 
hayan llegado al límite de revisiones. De éstos se asignan primero los que se marcaron 
“interesado”, si no se llega a 3, se buscan entre los “quizás”. Si aún no se llegó a los 3, se 
busca entre los que no indicaron interés alguno, y si no hay se recurre finalmente a los “no 
interesado”. Luego de la asignación, los revisores ingresan sus revisiones para cada artículo. 
Una revisión tiene un texto y un puntaje que va de -3 a 3 incluyendo el 0. Los artículos no 
deben admitir más de 3 revisiones. */
}
module.exports = EstadoAsignacion;