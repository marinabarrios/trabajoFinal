const Usuarios = require("./Usuarios");
const Articulos = require("./Articulos");
const GestorDeArticulos = require("./GestorDeArticulos");

class Revisores extends Usuarios{
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        super(nombreUsuario, afiliacion, email, contrasenia);
        this._intereses = [];
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }

    expresarInteres(sesion, articulo, tipoInteres){
        const gestor = new GestorDeArticulos();

        if(sesion._estadoSesion === 'bidding') {
            if (!articulo) {
                //throw new Error("El artículo no existe.");
                console.log("El artículo no existe.");
            }
    
            if (tipoInteres !== 'interesado' && tipoInteres !== 'no interesado' && tipoInteres !== 'quizas') {
                throw new Error("El tipo de interés debe ser 'interesado' o 'no interesado' o 'quizás'.");
            }
    
            // Verificar si ya existe un interés para el artículo
            const interesExistente = this._intereses.find(interes => interes.articulo === articulo._id);
            if (interesExistente) {
                // Si ya existe un interés, modificarlo
                interesExistente.tipoInteres = tipoInteres;
            } else {
                // Si no existe, agregar el nuevo interés
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
  // Normaliza el nombre del usuario del revisor
  const nombreRevisorNormalizado = this._nombreUsuario.trim().toLowerCase();

  // Busca en las asignaciones de la sesión el artículo específico para este revisor
  const asignacion = sesion._asignaciones.find(asignacion =>
    asignacion.articulo === articuloId &&
    asignacion.revisor.some(revisor => revisor.trim().toLowerCase() === nombreRevisorNormalizado)
  );

  if (!asignacion) {
    console.log(`No se encontró el artículo ${articuloId} asignado al revisor ${this._nombreUsuario}.`);
    return;
  }

  // Agrega la evaluación en la sesión
  sesion.agregarEvaluacion(articuloId, this._nombreUsuario, comentario, puntaje);
  console.log(`Revisión enviada por ${this._nombreUsuario} para el artículo ${articuloId}.`);
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