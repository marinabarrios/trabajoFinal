class EstadoSesion{
    constructor(sesion) {
        this._sesion = sesion;
    }

    setEstado(){
        throw new Error("Este metodo se utiliza en las subclases");
    }
}