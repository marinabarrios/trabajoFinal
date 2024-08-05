/*const ComfyChair = require('./ComfyChair.js');*/

class Conferencias { 

    constructor(nombreConferencia, fechaInicio, fechaFin, organizadores = [], comite = [], autores = [], empresa) {
        this._nombreConferencia = nombreConferencia;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;
        this._organizadores = organizadores; //listado de usuarios organizadores de la conferencia
        this._comite = comite; //listado de usuarios revisores que conforman el comite
        this._autores = autores; //listado de usuarios que enviaron un articulo a la conferencia
        this._empresa = empresa; // Inicializamos empresa
    }

    nombreConferencia() {
        return this._nombreConferencia;
    }

    crearSesion(tema, tipoSesion, deadlineRecepcion) {

    }

    definirRoles(nombreConferencia) {
        // Verifico quienes son los usuarios q enviaron articulos, ya que ellos no podrán ser organizadores, ni parte del comite //
        // como no mencionaron como se asignan los chairs y comite, ni cuantos deben ser... lo defino yo //
        //tengo q verificar q no sean autores, si son dejarlos afuera y armar una nueva lista
        const todosLosUsuarios = this._empresa.listUsuarios();
        const organizadores = this.seleccionAleatoria(todosLosUsuarios, 2);
        // Los integrantes del comite no deben ser organizadores ni autores
        const comite = this.seleccionAleatoria(todosLosUsuarios, 2, organizadores);
        //Verificar si existe la Conferencia para definir los organizadores, el comite y agregar los autores //
        //const nuevaConferencia = new Conferencias (nombreConferencia,fechaInicio, fechaFin, organizadores.slice(), comite.slice());
        const todasLasConferencias = empresa.listConferencias(); 
        const conferenciaExistente = todasLasConferencias.find(conferencia => conferencia._nombreConferencia === nombreConferencia);
        if (conferenciaExistente) {
            conferenciaExistente._organizadores = organizadores;
            conferenciaExistente._comite = comite;
            const indiceConferencia = todasLasConferencias.indexOf(conferenciaExistente);
            todasLasConferencias[indiceConferencia] = conferenciaExistente;
            return todasLasConferencias[indiceConferencia];
            console.log('La conferencia existe. Se actualizan los roles.');
        } else {
            console.log('La conferencia no existe.');
        }
    }

    seleccionAleatoria(usuario, cantidad, excluidos = []) {
        if (cantidad > usuario.length - excluidos.length) {
            throw new Error('No se pueden seleccionar más elementos que los disponibles');
            //console.log('No se pueden seleccionar más elementos que los disponibles');
        }
        const copiaArray = [...usuario];
        const seleccionados = [];
        // Eliminamos los usuarios excluidos de la copia del array //
        excluidos.forEach(usuarioExcluido => {
            const indice = copiaArray.indexOf(usuarioExcluido);
            if (indice !== -1) {
            copiaArray.splice(indice, 1);
            }
        });

        // Resto del código es similar a la versión anterior
        while (seleccionados.length < cantidad) {
            const indiceAleatorio = Math.floor(Math.random() * copiaArray.length);
            const elementoAleatorio = copiaArray.splice(indiceAleatorio, 1)[0];
            seleccionados.push(elementoAleatorio);
        }

        return seleccionados;
        }
}
module.exports = Conferencias;