const Usuarios = require("./Usuarios");
const Articulos = require("./Articulos");

class Revisores extends Usuarios{
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        super(nombreUsuario, afiliacion, email, contrasenia);
        this._intereses = [];
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }

    expresarInteres(sesion, articulo, tipoInteres){

        if(sesion._estadoSesion === 'bidding') {
            if (!articulo) {
                //throw new Error("El artículo no existe.");
                console.log("El artículo no existe.");
            }
    
            if (tipoInteres !== 'interesado' && tipoInteres !== 'no interesado' && tipoInteres !== 'quizas') {
                throw new Error("El tipo de interés debe ser 'interesado' o 'no interesado' o 'quizás'.");
            }
    
            //Verifico si ya existe un interés para el artículo
            const interesExistente = this._intereses.find(interes => interes.articulo === articulo._id);
            if (interesExistente) {
                interesExistente.tipoInteres = tipoInteres;
            } else {
                this._intereses.push({ revisor: this._nombreUsuario, articulo: articulo._id, tipoInteres: tipoInteres });
            }
    
            articulo.agregarInteres(this, tipoInteres, sesion._tema);
        } else {
            console.log(`No puede expresar su interés ya que la Sesión se encuentra en el estado de: ${sesion._estadoSesion}.`);
        }      
    }

    verArticulosAsignados(sesion) {
        const asignaciones = sesion._asignaciones.filter(asignacion =>
          asignacion.revisor.includes(this._nombreUsuario)
        );
    
        return asignaciones.map(asignacion => ({
          articulo: asignacion.articulo,
          sesion: asignacion.sesion,
          revisores: asignacion.revisor
        }));
    }
    
    realizarEvaluacion(sesion, articuloId, comentario, puntaje) {
        //Verifico si el puntaje está en el rango permitido
        if (puntaje < -3 || puntaje > 3) {
            return console.log(`El puntaje ${puntaje} no es válido. Debe estar entre -3 y 3.`);
        }
        const asignacion = this.encontrarAsignacionConFor(sesion, articuloId, this._nombreUsuario);
        
        if (!asignacion || asignacion.length === 0) {
            return console.log(`No se encontró el artículo ${articuloId} asignado al revisor ${this._nombreUsuario}.`);           
        }

        //Agrego la evaluación para todas las asignaciones encontradas
        asignacion.forEach(asignacion => {
            sesion.agregarEvaluacion(asignacion.articulo, this._nombreUsuario, comentario, puntaje);
        });
    }

    encontrarAsignacionConFor(sesion, articuloId, nombreRevisor) {
        let asignacionesEncontradas = [];
    
        //Normalizo el nombre del revisor
        const nombreRevisorNormalizado = nombreRevisor.trim().toLowerCase();
        
        //Verifico si 'sesion._asignaciones' es un arreglo
        if (!Array.isArray(sesion._asignaciones)) {
            return console.log('Error: La sesión no contiene una lista de asignaciones válida.');
        }
    
        for (let i = 0; i < sesion._asignaciones.length; i++) {
            const asignacion = sesion._asignaciones[i];
            
            //Normalizo todos los nombres de revisores en la asignación
            const revisoresNormalizados = asignacion.revisor.map(revisor => revisor.trim().toLowerCase());

            //Si encuentro una asignación que coincida, la almaceno en la variable
            if (asignacion.articulo.toString().trim() === articuloId.toString().trim() && revisoresNormalizados.includes(nombreRevisorNormalizado)) {
                asignacionesEncontradas.push(asignacion);
            }
        }
    
        return asignacionesEncontradas;
    }    

    mostrarIntereses(){
        return this._intereses;
    }

    desdeObjetoPlano(obj) {
        return new Articulos(
            obj._id,
            obj._tituloArticulo,
            obj._tipoArticulo,
            obj._abstract,
            obj._archivoAdjunto,
            obj._autoresArticulo,
            obj._archivoFuentes,
            obj._autorNotificacion, 
            new Date(obj._fechaEntrega),
            obj.estadoArticulo
        );
    }
}
module.exports = Revisores;
