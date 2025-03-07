//voy a usar el patrón strategy
// la clase estrategia no se va a poder instanciar
//la clase porcentajeDeAceptados debe determinar el porcentaje de artículos aceptados
//la clase puntajeMinimo se aceptan todos aquellos artículos que tengan un puntaje >= al puntaje minimo.
//en la sesion voy a tener un método que me va a permitir cambiar  de estrategia: setEstrategia
//tb voy a tener en la sesion un método que me va a devolver el resultado definido por la clase de la estrategia.
//en articulo, donde ya tengo los puntajes voy a calcular el promedio

//en la sesion se debe definir un max de articulos, eso me olvide de pasarle a la sesion. 
//quizás el chair pueda definir la cantidad max de articulos a aceptar
const { enviarArticulo, agregarRevisores, expresarInteres, asignarPuntuaciones } = require("../TestUtils");
const EstadoSeleccion = require("../EstadoSesion/EstadoSeleccion");
const Estrategia = require("../Estrategia/Estrategia");
const PorcentajeDeAceptados = require("../Estrategia/PorcentajeDeAceptados");
const PuntajeMinimo = require("../Estrategia/PuntajeMinimo");
const EstadoSesion = require('../EstadoSesion/EstadoSesion');
const { revisor} = require("../__fixtures__/usuariosFixture");
const _ = require("lodash");

describe('Etapa Selección', () => {
    let copiaSesion;

    beforeEach(() => {
        //Creo copia de la sesión para hacer las pruebas sobre la copia y no alterar la original
        copiaSesion = _.cloneDeep(require("../__fixtures__/sesionesFixture").sesionW);
        //En estado RECEPCION los autores envían artículos
        enviarArticulo(copiaSesion);
        //Cambio el estado a BIDDING
        copiaSesion.estadoSesion().asignarEstado();
        //Se agregan revisores a la sesion
        agregarRevisores(copiaSesion);
        //Revisores expresan su interés
        expresarInteres(copiaSesion);                
        //Cambio el estado a ASIGNACION
        copiaSesion.estadoSesion().asignarEstado();
        //Se asignan los revisores teniendo en cuenta el interés
        copiaSesion.estadoSesion().asignarRevisores();      
        //Cambio el estado a REVISION
        copiaSesion.estadoSesion().asignarEstado();
        asignarPuntuaciones(copiaSesion);
        //Cambio el estado a SELECCION                
        copiaSesion.modificarEstadoSesion(new EstadoSeleccion(copiaSesion));
    });

    test('No se puede recibir artículos si la sesión está en Etapa de Selección', () => {
        expect(copiaSesion.estadoSesion().setEstado()).toBe('SELECCION');
        expect(() => copiaSesion.estadoSesion().agregarArticulo(articulo1, '2025-03-10'))
            .toThrow('En esta estapa ya no se aceptan artículos');
    });

    test('No se puede procesar los intereses si la sesión está en Etapa de Selección', () => {
        expect(copiaSesion.estadoSesion().setEstado()).toBe('SELECCION');
        expect(() => copiaSesion.estadoSesion().procesarBidding(revisor, articulo1, 'INTERESADO'))
            .toThrow('En esta estapa no se procesan los intereses');
    });

    test('Se debe definir el máximo de artículos que puede aceptar la sesión', () => {
        expect(copiaSesion.estadoSesion().setEstado()).toBe('SELECCION');
        copiaSesion.setMaxDeArticulosAceptados(3)
        expect(copiaSesion._maxArticulosAceptados).not.toBeNull()
    });

    test('Se define correctamente la estrategia Porcentaje de aceptados para de la sesión', () => {
        estrategiaPorcentaje = new PorcentajeDeAceptados(50); // Acepta el 50% de los artículos
        copiaSesion.setEstrategia(estrategiaPorcentaje);
        expect(copiaSesion._estrategia).not.toBeNull()
    });

    test('Se define correctamente la estrategia Puntaje mínimo para de la sesión', () => {
        estrategiaPuntaje = new PuntajeMinimo(1); // Acepta artículos con puntaje >= 1
        copiaSesion.setEstrategia(estrategiaPuntaje);
        expect(copiaSesion._estrategia).not.toBeNull()
    });

    test('Se inicia el proceso de selección de artículos', () => {
        copiaSesion.setMaxDeArticulosAceptados(3);
        estrategiaPorcentaje = new PorcentajeDeAceptados(50); // Acepta el 50% de los artículos
        copiaSesion.setEstrategia(estrategiaPorcentaje);

        copiaSesion.seleccionarArticulos = jest.fn();

        copiaSesion.estadoSesion().seleccionandoArticulos();
        expect(copiaSesion.seleccionarArticulos).toHaveBeenCalled();
    });

    test('Se define un porcentaje de artículos que la sesión debe aceptar', () => {
        copiaSesion.setMaxDeArticulosAceptados(6);
        //Determino la estrategia de seleccion
        estrategiaPorcentaje = new PorcentajeDeAceptados(50); // Acepta el 50% de los artículos
        copiaSesion.setEstrategia(estrategiaPorcentaje);

        const articulosSeleccionados = copiaSesion.seleccionarArticulos();

        //Son 7 los artículos enviados a la sesión
        expect(articulosSeleccionados.length).toBe(4);//el 50% es 3.5 redondea para arriba
    });

    test('El máximo de articulo aceptados es menor a la cantidad que debería aceptar por el porcentaje asignado', () => {
        copiaSesion.setMaxDeArticulosAceptados(3);
        //Determino la estrategia de seleccion
        estrategiaPorcentaje = new PorcentajeDeAceptados(50);
        copiaSesion.setEstrategia(estrategiaPorcentaje);

        const articulosSeleccionados = copiaSesion.seleccionarArticulos();
        
        //Son 7 los artículos enviados a la sesión y sólo quedan 3 por el máximo de artículos que acepta
        expect(articulosSeleccionados.length).toBe(3);
    });

    test('Debe aceptar artículos con puntaje mayor o igual al mínimo', () => {
        copiaSesion.setMaxDeArticulosAceptados(6);
        //Determino la estrategia de seleccion
        estrategiaPuntaje = new PuntajeMinimo(1); // Acepta artículos con puntaje >= 1
        copiaSesion.setEstrategia(estrategiaPuntaje);

        const articulosSeleccionados = copiaSesion.seleccionarArticulos();
        
        expect(articulosSeleccionados).toContain(articulo2);
        expect(articulosSeleccionados).toContain(articulo3);
        expect(articulosSeleccionados).toContain(articulo6);
        expect(articulosSeleccionados.length).toBe(4);
        expect(articulosSeleccionados).not.toContain(articulo1);
    });

    test('El máximo de articulo aceptados es menor a la cantidad que debería aceptar por el puntaje mínimo asignado', () => {
        copiaSesion.setMaxDeArticulosAceptados(2);
        //Determino la estrategia de seleccion
        estrategiaPuntaje = new PuntajeMinimo(1);
        copiaSesion.setEstrategia(estrategiaPuntaje);

        const articulosSeleccionados = copiaSesion.seleccionarArticulos();
        
        expect(articulosSeleccionados).toContain(articulo2);
        expect(articulosSeleccionados).toContain(articulo3);
        expect(articulosSeleccionados.length).toBe(2);
        expect(articulosSeleccionados).not.toContain(articulo1);
    });

    test('Debe permitir cambiar de estrategia y afectar la selección', () => {
        copiaSesion.setMaxDeArticulosAceptados(3);
        //Determino la estrategia de seleccion
        estrategiaPuntaje = new PuntajeMinimo(1); // Acepta artículos con puntaje >= 1
        copiaSesion.setEstrategia(estrategiaPuntaje);

        const articulosSeleccionados = copiaSesion.seleccionarArticulos();
        expect(articulosSeleccionados.length).toBe(3);

        //Cambio la estrategia de seleccion
        estrategiaPorcentaje = new PorcentajeDeAceptados(50); // Acepta el 50% de los artículos
        copiaSesion.setEstrategia(estrategiaPorcentaje);

        resultado = copiaSesion.seleccionarArticulos();
        expect(resultado.length).toBe(3);
    });

    test('La clase Estrategia no se puede instanciar directamente', () => {
        estrategia = new Estrategia(1);
        expect(() => estrategia.seleccionar()).toThrow("Debe implementar el método en una subclase concreta.");
    });

    test("No se puede instanciar la clase EstadoSesion para seleccionar artículos", () => {
        const estadoSesion = new EstadoSesion();
        expect(() => estadoSesion.seleccionandoArticulos()).toThrow("Método no implementado en la clase actual");
    });
});
