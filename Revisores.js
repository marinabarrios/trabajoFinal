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
        //const articuloId = gestor.obtenerArticuloPorId(sesion._tema, articulo.id);
        //const objArticulo = this.desdeObjetoPlano(articulo);
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

    realizarEvaluacion(){

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