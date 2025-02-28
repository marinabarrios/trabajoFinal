const EstadoSesion = require("./EstadoSesion");
const EstadoAsignacion = require("./EstadoAsignacion");

class EstadoBidding extends EstadoSesion {
    constructor(sesion) {
        super(sesion);
        this._sesion = sesion; 
    }

    setEstado(){
        return 'BIDDING';
    }

    asignarEstado() {
        this._session.estadoSesion(new EstadoAsignacion(this._session));
    }

    agregarArticulo(articulo, fechaActual){
        throw new Error('Durante esta instancia, ya no se aceptan más articulos');
    }

    /* los artículos en revisión pasan por un proceso de bidding. En este punto, los 
revisores expresan si están o no interesados en revisarlo. Además de “interesado”/”no 
interesado” existe también un “quizás”. El proceso completo de bidding y asignación de 
artículos será explicado aparte. Durante esta instancia, no se aceptan más artículos. 

Durante el proceso de paper bidding mencionado anteriormente se reciben “bids” que expresan 
el interés de los revisores. Éstos no tienen la obligación de expresar interés, pero en ese caso 
se les asignan los artículos aleatoriamente, o según la necesidad de los chairs. Los revisores 
pueden cambiar de opinión respecto a un bid, es decir, pueden pasar de “interesado” a “quizás” 
o cualquier otro tipo de interés para un mismo paper. Al cerrarse el proceso de bidding, se 
asignan los revisores a los artículos, y siempre debe haber 3 revisores por artículo. Esto implica 
que se necesita un número total de revisiones igual al triple del número de artículos - ej. si se 
enviaron 10 artículos, se necesitan 30 revisiones. Esto impacta en el número de revisiones que 
se le pide a cada revisor: siguiendo con el ejemplo, si hay 10 artículos (30 revisiones) y 5 
revisores, cada uno deberá revisar 6 artículos (5 revisores * 6 = 30 revisiones). Si el número no 
es redondo, puede ser que algunos revisores reciban más artículos que otros. Siguiendo con el 
ejemplo, si en lugar de 5 revisores hubiera 7, 5 de ellos revisarán 4 artículos (20 revisiones) y 2 
de ellos 5 (10 revisiones).*/
}
module.exports = EstadoBidding;