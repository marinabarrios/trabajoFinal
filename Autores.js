const Articulos = require("./Articulos");
const Sesiones = require("./Sesiones");
const Usuarios = require("./Usuarios");

class Autores extends Usuarios{
    constructor (nombreUsuario, afiliacion, email, contrasenia){
        super(nombreUsuario, afiliacion, email, contrasenia);
        this._articulosCreados = []; //Lista de articulos enviados
        this._notificaciones = []; // Lista de notificaciones recibidas
    }

    nombreUsuario() {
        return this._nombreUsuario;
    }

    crearArticulo(id, tituloArticulo, tipoArticulo, abstract = null, archivoAdjunto, autoresArticulo, archivoFuentes = null, autorNotificacion, fechaEntrega){
        const nuevoArticulo = new Articulos (id, tituloArticulo, tipoArticulo, abstract, archivoAdjunto, autoresArticulo, archivoFuentes, autorNotificacion, fechaEntrega);
        this._articulosCreados.push(nuevoArticulo);
        return nuevoArticulo;
    }

    // Método para enviar artículos
    enviarArticulo(sesion, articulo) {        
        sesion.recibirArticulo(articulo);
        console.log('El archivo fue enviado');
    }

    listArticulosCreados(){
        return this._articulosCreados;
    }

    agregarNotificacion(mensaje) {
        this._notificaciones.push(mensaje);
    }

    obtenerNotificaciones() {
        return this._notificaciones;
    }

    modificarArticulo(){

    }
    /*enviarArticulo(articleData) {
        const articleManager = new ArticleManager();
        articleManager.addArticle(articleData);
    }*/

    /* MANEJO DE LOS ARTICULOS */
    /*// Uso del ArticleManager para recuperar y eliminar artículos
const articleManager = new ArticleManager();

// Recuperar un artículo
const articleId = 1;
const article = articleManager.getArticleById(articleId);
if (article) {
    console.log("Artículo encontrado:", article);
} else {
    console.log("Artículo no encontrado.");
}

// Eliminar un artículo
const deleted = articleManager.deleteArticleById(articleId);
if (deleted) {
    console.log(`Artículo con ID ${articleId} eliminado.`);
} else {
    console.log(`Artículo con ID ${articleId} no encontrado.`);
}*/
}
module.exports = Autores;