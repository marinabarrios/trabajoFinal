const Sesiones = require("./Sesiones");

class SesionWorkshop extends Sesiones{
    validarArticulo(articulo) {
        return articulo.tipoArticulo === "Workshop";
    }
    
    simplificarArticulo(articulo) {
        return {
            titulo: articulo.tituloArticulo,
            autores: articulo.autoresArticulo,
            resumen: articulo.abstract
        };
    }
}
module.exports = SesionWorkshop;