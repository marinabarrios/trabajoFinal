const fs = require('fs');
const path = require('path');

class GestorDeArticulos {
    constructor(rutaArchivo) {
        this.rutaArchivo = rutaArchivo || path.join(__dirname, 'articulos.json');

        // Eliminar el archivo si existe al inicio
        if (fs.existsSync(this.rutaArchivo)) {
            fs.unlinkSync(this.rutaArchivo);
            console.log('Archivo '+this.rutaArchivo+' eliminado.');
        } else {
            console.log('Archivo '+this.rutaArchivo+' no existe, nada que eliminar.');
        }
    }
    
    // Se convierte un artículo en un objeto simple que no contiene referencias circulares
    simplificarArticulo(articulo) {
        return {
            id: articulo._id,
            tituloArticulo: articulo._tituloArticulo,
            tipoArticulo: articulo._tipoArticulo,
            abstract: articulo._abstract,
            archivoAdjunto: articulo._archivoAdjunto,
            autoresArticulo: articulo._autoresArticulo.map(autores => autores._nombreUsuario), // Solo almacena nombres para evitar referencias circulares
            archivoFuentes: articulo._archivoFuentes,
            autorNotificacion: articulo._autorNotificacion._nombreUsuario, // Solo almacena el nombre
            fechaEntrega: articulo._fechaEntrega
        };
    }

    // Lee el archivo de artículos y devuelve los datos como un objeto
    leerArticulos() {
        if (!fs.existsSync(this.rutaArchivo)) {
            return [];
        }
        const data = fs.readFileSync(this.rutaArchivo, 'utf-8');
        return JSON.parse(data);
    }

    // Guarda los datos en el archivo
    guardarArticulos(articulos) {
        const datos = articulos.map(this.simplificarArticulo);
        const data = JSON.stringify(datos, null, 2);
        fs.writeFileSync(this.rutaArchivo, data, 'utf-8');
    }

    // Agrega un nuevo artículo
    agregarArticulo(articulo) {
        const articulos = this.leerArticulos();
        articulos.push(articulo);
        this.guardarArticulos(articulos);
    }

    // Recuperar un artículo por su ID
    obtenerArticuloPorId(id) {
        const articulos = this.leerArticulos();
        return articulos.find(articulo => articulo.id === id);
    }

    // Eliminar un artículo por su ID
    eliminarArticuloPorId(id) {
        let articulos = this.leerArticulos();
        const longitudInicial = articulos.length;
        articulos = articulos.filter(articulo => articulo.id !== id);
        
        if (articulos.length < longitudInicial) {
            this.guardarArticulos(articulos);
            return true; // Se eliminó el artículo
        } else {
            return false; // No se encontró el artículo
        }
    }
}

module.exports = GestorDeArticulos;