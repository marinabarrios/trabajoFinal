const fs = require('fs');
const path = require('path');

class GestorDeArticulos {
    constructor(rutaBase) {
        this.rutaBase = rutaBase || __dirname;
    }

    // Lee el archivo de artículos y devuelve los datos como un objeto
    leerArticulos(nombreSesion) {
        const rutaArchivo = path.join(this.rutaBase, `${nombreSesion}.json`);
        if (!fs.existsSync(rutaArchivo)) {
            return []; // Si el archivo no existe, devuelve un array vacío
        }
        
        const data = fs.readFileSync(rutaArchivo, 'utf-8');
        return JSON.parse(data);
    }

    // Guarda los datos en el archivo
    guardarArticulos(nombreSesion, articulos) {
        const rutaArchivo = path.join(this.rutaBase, `${nombreSesion}.json`);
        const data = JSON.stringify(articulos, null, 2);
        fs.writeFileSync(rutaArchivo, data, 'utf-8');
    }

    // Agrega un nuevo artículo
    agregarArticulo(nombreSesion, articulo) {
        const articulos = this.leerArticulos(nombreSesion);        
        // Verifica si ya existe un artículo con el mismo id
        const existeArticulo = articulos.some(a => a.id === articulo.id);
        
        if (existeArticulo) {
            console.log('El artículo con ID '+ articulo.id +' ya existe y no se agregará.');
            return false;
        }

        articulos.push(articulo);
        this.guardarArticulos(nombreSesion, articulos);
        return true;
    }

    // Recuperar un artículo por su ID
    obtenerArticuloPorId(nombreSesion, id) {
        const articulos = this.leerArticulos(nombreSesion);
        return articulos.find(articulo => articulo.id === id);
    }

    // Eliminar un artículo por su ID
    eliminarArticuloPorId(nombreSesion, id) {
        let articulos = this.leerArticulos(nombreSesion);
        const longitudInicial = articulos.length;
        articulos = articulos.filter(articulo => articulo.id !== id);
        
        if (articulos.length < longitudInicial) {
            this.guardarArticulos(nombreSesion, articulos);
            return true; // Se eliminó el artículo
        } else {
            return false; // No se encontró el artículo
        }
    }
}

module.exports = GestorDeArticulos;