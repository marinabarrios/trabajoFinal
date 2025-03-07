class Estrategia {
    seleccionar(sesion) {
        throw new Error("Debe implementar el método en una subclase concreta.");
    }
}

module.exports = Estrategia;