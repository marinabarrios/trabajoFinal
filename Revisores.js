const Usuarios = require("./Usuarios");
const GestorDeArticulos = require("./GestorDeArticulos");

class Revisores extends Usuarios{
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        super(nombreUsuario, afiliacion, email, contrasenia);
        this._intereses = [];
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }

    expresarInteres(articulo, tipoInteres){
        const gestor = new GestorDeArticulos(); console.log('ARTICULO',articulo);
        const articuloId = gestor.obtenerArticuloPorId(articulo._id);

        if (!articuloId) {
            throw new Error("El artículo no existe.");
        }

        if (tipoInteres !== 'interesado' && tipoInteres !== 'no interesado' && tipoInteres !== 'quizas') {
            throw new Error("El tipo de interés debe ser 'interesado' o 'no interesado' o 'quizás'.");
        }

        this._intereses.push({ articulo, tipoInteres });
        articulo.agregarInteres(this, tipoInteres);
    }

    modificarInteres(){

    }

    realizarEvaluacion(){

    }

    mostrarIntereses(){
        return this._intereses;
    }
}
module.exports = Revisores;