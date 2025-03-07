//voy a usar el patrón strategy
// la clase estrategia no se va a poder instanciar
//la clase porcentajeDeAceptados debe determinar el porcentaje de artículos aceptados
//la clase puntajeMinimo se aceptan todos aquellos artículos que tengan un puntaje >= al puntaje minimo.
//en la sesion voy a tener un método que me va a permitir cambiar  de estrategia: setEstrategia
//tb voy a tener en la sesion un método que me va a devolver el resultado definido por la clase de la estrategia.
//en articulo, donde ya tengo los puntajes voy a calcular el promedio

//en la sesion se debe definir un max de articulos, eso me olvide de pasarle a la sesion. 
//quizás el chair pueda definir la cantidad max de articulos a aceptar

const { autor, autor1, autor2, autor3, revisor, revisor1, revisor2, revisor3, revisor4, revisor5, revisor6,
    revisor7, revisor8, revisor9, revisor10, revisor11, revisor12 } = require("../__fixtures__/usuariosFixture");
const Usuario = require("../Usuario/Usuario");
const EstadoSeleccion = require("../EstadoSesion/EstadoSeleccion");
const PorcentajeDeAceptados = require("../Estrategia/PorcentajeDeAceptados");
const PuntajeMinimo = require("../Estrategia/PuntajeMinimo");
const _ = require("lodash");

describe('Etapa Asignación', () => {
    let copiaSesion;
    let articulo1; let articulo2; let articulo3; let articulo4; let articulo5; let articulo6; let articulo7;
    beforeEach(() => {
        //Creo copia de la sesión para hacer las pruebas sobre la copia y no alterar la original
                copiaSesion = _.cloneDeep(require("../__fixtures__/sesionesFixture").sesionW);
                //Creo copias del artículo
                articulo1 = _.cloneDeep(require("../__fixtures__/articulosFixture").articuloRegular);
                articulo2 = _.cloneDeep(require("../__fixtures__/articulosFixture").articuloPoster);
                articulo3 = _.cloneDeep(require("../__fixtures__/articulosFixture").artPosterCon2AutoresNotif);
                articulo4 = _.cloneDeep(require("../__fixtures__/articulosFixture").articuloRegular1);
                articulo5 = _.cloneDeep(require("../__fixtures__/articulosFixture").articuloPoster1);
                articulo6 = _.cloneDeep(require("../__fixtures__/articulosFixture").articuloRegular2);
                articulo7 = _.cloneDeep(require("../__fixtures__/articulosFixture").articuloPoster2);
                //Los autores envían artículos a la sesion
                autor.enviarArticulo(copiaSesion, articulo1);
                autor1.enviarArticulo(copiaSesion, articulo2);
                autor3.enviarArticulo(copiaSesion, articulo3);
                autor2.enviarArticulo(copiaSesion, articulo4);
                autor1.enviarArticulo(copiaSesion, articulo5);
                autor3.enviarArticulo(copiaSesion, articulo6);
                autor3.enviarArticulo(copiaSesion, articulo7);
                //Cambio el estado a BIDDING
                copiaSesion.estadoSesion().asignarEstado();
                //Agrego revisores a la sesion
                /*copiaSesion.agregarRevisores('Leonardo Rey');
                copiaSesion.agregarRevisores('Carlos Lopez');
                copiaSesion.agregarRevisores('Maria Gonzalez');
                copiaSesion.agregarRevisores('Juana Gómez');
                copiaSesion.agregarRevisores('Mara Gonzalez');
                copiaSesion.agregarRevisores('Juan Gómez');
                copiaSesion.agregarRevisores('Raúl Arce');
                copiaSesion.agregarRevisores('Oscar Martín');
                copiaSesion.agregarRevisores('Inés Martinez');
                copiaSesion.agregarRevisores('Sonia Ruiz');
                copiaSesion.agregarRevisores('Pedro Jimenez');
                copiaSesion.agregarRevisores('Daniel Martinez');
                copiaSesion.agregarRevisores('Luis Iglesias');*/
                // Agregar revisores
                const nombresRevisores = [
                    'Leonardo Rey', 'Carlos Lopez', 'Maria Gonzalez', 'Juana Gómez',
                    'Mara Gonzalez', 'Juan Gómez', 'Raúl Arce', 'Oscar Martín',
                    'Inés Martinez', 'Sonia Ruiz', 'Pedro Jimenez', 'Daniel Martinez',
                    'Luis Iglesias'
                ];
                nombresRevisores.forEach(nombre => copiaSesion.agregarRevisores(nombre));
                //Revisores expresan su interés por el artículo1
                copiaSesion.estadoSesion().procesarBidding(revisor, articulo1, "INTERESADO");//Leonardo Rey
                copiaSesion.estadoSesion().procesarBidding(revisor1, articulo1, "QUIZAS");//Carlos Lopez
                copiaSesion.estadoSesion().procesarBidding(revisor2, articulo1, "NO INTERESADO");//Maria Gonzalez
                copiaSesion.estadoSesion().procesarBidding(revisor3, articulo1, "QUIZAS");//Juana Gómez
                //Revisores expresan su interés por el artículo2
                copiaSesion.estadoSesion().procesarBidding(revisor4, articulo2, "NO INTERESADO");//Mara Gonzalez
                copiaSesion.estadoSesion().procesarBidding(revisor5, articulo2, "QUIZAS");//Juan Gómez
                copiaSesion.estadoSesion().procesarBidding(revisor6, articulo2, "INTERESADO");//Raúl Arce
                copiaSesion.estadoSesion().procesarBidding(revisor7, articulo2, "QUIZAS");//Oscar Martín
                //Revisores expresan su interés por el artículo3
                copiaSesion.estadoSesion().procesarBidding(revisor, articulo3, "INTERESADO");//Leonardo Rey
                copiaSesion.estadoSesion().procesarBidding(revisor1, articulo3, "QUIZAS");//Carlos Lopez
                copiaSesion.estadoSesion().procesarBidding(revisor8, articulo3, "NO INTERESADO");//Inés Martinez
                copiaSesion.estadoSesion().procesarBidding(revisor9, articulo3, "INTERESADO");//Sonia Ruiz
                //Revisores expresan su interés por el artículo4
                copiaSesion.estadoSesion().procesarBidding(revisor5, articulo4, "QUIZAS");//Juan Gómez
                copiaSesion.estadoSesion().procesarBidding(revisor6, articulo4, "INTERESADO");//Raúl Arce
                copiaSesion.estadoSesion().procesarBidding(revisor8, articulo4, "NO INTERESADO");//Inés Martinez
                copiaSesion.estadoSesion().procesarBidding(revisor9, articulo4, "INTERESADO");//Sonia Ruiz
                //Revisores expresan su interés por el artículo5
                copiaSesion.estadoSesion().procesarBidding(revisor, articulo5, "INTERESADO");//Leonardo Rey
                copiaSesion.estadoSesion().procesarBidding(revisor6, articulo5, "INTERESADO");//Raúl Arce
                copiaSesion.estadoSesion().procesarBidding(revisor8, articulo5, "NO INTERESADO");//Inés Martinez
                copiaSesion.estadoSesion().procesarBidding(revisor9, articulo5, "INTERESADO");//Sonia Ruiz
                //Revisores expresan su interés por el artículo6
                copiaSesion.estadoSesion().procesarBidding(revisor4, articulo6, "NO INTERESADO");//Mara Gonzalez
                copiaSesion.estadoSesion().procesarBidding(revisor6, articulo6, "INTERESADO");//Raúl Arce
                copiaSesion.estadoSesion().procesarBidding(revisor9, articulo6, "INTERESADO");//Sonia Ruiz
                copiaSesion.estadoSesion().procesarBidding(revisor10, articulo6, "INTERESADO");//Pedro Jimenez
                //Revisores expresan su interés por el artículo7
                copiaSesion.estadoSesion().procesarBidding(revisor4, articulo7, "NO INTERESADO");//Mara Gonzalez
                copiaSesion.estadoSesion().procesarBidding(revisor6, articulo7, "INTERESADO");//Raúl Arce
                copiaSesion.estadoSesion().procesarBidding(revisor11, articulo7, "INTERESADO");//Daniel Martinez
                copiaSesion.estadoSesion().procesarBidding(revisor12, articulo7, "INTERESADO");//Luis Iglesias
                //Cambio el estado a ASIGNACION
                copiaSesion.estadoSesion().asignarEstado();
                //Se asignan los revisores teniendo en cuenta el interés
                copiaSesion.estadoSesion().asignarRevisores();      
                //Cambio el estado a REVISION
                copiaSesion.estadoSesion().asignarEstado();
                //console.log('asignacionesArticulos ', copiaSesion._articulos);//aqui tengo todos los artículo de la sesion
                const revisoresAsignados1 = articulo1.listRevisoresAsignados();
                const revisoresAsignados2 = articulo2.listRevisoresAsignados();
                const revisoresAsignados3 = articulo3.listRevisoresAsignados();
                const revisoresAsignados4 = articulo4.listRevisoresAsignados();
                const revisoresAsignados5 = articulo5.listRevisoresAsignados();
                const revisoresAsignados6 = articulo6.listRevisoresAsignados();
                const revisoresAsignados7 = articulo7.listRevisoresAsignados();

               /* const puntuaciones = [
                    { revisor: revisoresAsignados1, articulo: articulo1, puntaje: 8 },
                    { revisor: revisoresAsignados2, articulo: articulo1, puntaje: 7 },
                    { revisor: revisor2, articulo: articulo1, puntaje: 6 },
                    { revisor: revisor2, articulo: articulo1, puntaje: 6 },
                    { revisor: revisor2, articulo: articulo1, puntaje: 6 },
                ];*/
                
                //Los revisores asignados puntúan
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados1[0], articulo1, 2, "Buen artículo, pero puede mejorar.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados1[1], articulo1, -1, "La redacción es confusa.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados1[2], articulo1, 1, "Buen artículo.");
                
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados2[0], articulo2, 3, "Buen artículo, pero puede mejorar.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados2[1], articulo2, 1, "La redacción es confusa.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados2[2], articulo2, 1, "Buen artículo.");
                
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados3[0], articulo3, 3, "Buen artículo, pero puede mejorar.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados3[1], articulo3, 0, "La redacción es confusa.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados3[2], articulo3, 2, "Buen artículo.");
                
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados4[0], articulo4, 3, "Buen artículo, pero puede mejorar.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados4[1], articulo4, 2, "La redacción es confusa.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados4[2], articulo4, -3, "Buen artículo.");

                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados5[0], articulo5, 2, "Buen artículo, pero puede mejorar.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados5[1], articulo5, 0, "La redacción es confusa.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados5[2], articulo5, -1, "Buen artículo.");

                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados6[0], articulo6, 3, "Buen artículo, pero puede mejorar.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados6[1], articulo6, 1, "La redacción es confusa.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados6[2], articulo6, 1, "Buen artículo.");
                
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados7[0], articulo7, -2, "Buen artículo, pero puede mejorar.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados7[1], articulo7, -1, "La redacción es confusa.");
                copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados7[2], articulo7, 2, "Buen artículo.");
                
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
        //console.log('articulosSeleccionados ',articulosSeleccionados); //ver si esta seleccionando bien
        expect(articulosSeleccionados.length).toBe(4);
    });

    test('Debe aceptar artículos con puntaje mayor o igual al mínimo', () => {
        copiaSesion.setMaxDeArticulosAceptados(6);
        //Determino la estrategia de seleccion
        estrategiaPuntaje = new PuntajeMinimo(1); // Acepta artículos con puntaje >= 1
        copiaSesion.setEstrategia(estrategiaPuntaje);

        const articulosSeleccionados = copiaSesion.seleccionarArticulos();
        console.log('articulosSeleccionados ',articulosSeleccionados);//ver si es correcto
        expect(articulosSeleccionados).toContain(articulo2);
        expect(articulosSeleccionados).toContain(articulo3);
        expect(articulosSeleccionados).toContain(articulo6);
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
    //probar enviar un número max negativo throw new Error("El número máximo de artículos aceptados debe ser un número positivo.");
    //probar que el porcentaje esté entre 0 y 100 throw new Error("El porcentaje de aceptación debe estar entre 1 y 100.");
});
