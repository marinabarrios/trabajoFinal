const { sesionP, sesionR, sesionW } = require("../__fixtures__/sesionesFixture");
const { autor, autor1, autor2, autor3, revisor, revisor1, revisor2, revisor3, revisor4, revisor5, revisor6,
        revisor7, revisor8, revisor9, revisor10, revisor11, revisor12 } = require("../__fixtures__/usuariosFixture");
const { articuloPoster, articuloRegular, artPosterCon2AutoresNotif } = require("../__fixtures__/articulosFixture");
const Usuario = require("../Usuario/Usuario");
const _ = require("lodash");

describe('Asignación de revisores', () => {

    let copiaSesion;
    let articulo1;
    let articulo2;

    beforeEach(() => {
        Usuario.usuariosRegistrados = [ autor, autor1, autor2, autor3,
                                        revisor, revisor1, revisor2, revisor3,
                                        revisor4, revisor5, revisor6,
                                        revisor7, revisor8, revisor9,
                                        revisor10, revisor11, revisor12 ];
        //Creo copia de la sesión para hacer las pruebas sobre la copia y no alterar la original
        copiaSesion = _.cloneDeep(require("../__fixtures__/sesionesFixture").sesionW);
        //Creo copias de los artículos
        articulo1 = _.cloneDeep(require("../__fixtures__/articulosFixture").articuloRegular);
        articulo2 = _.cloneDeep(require("../__fixtures__/articulosFixture").articuloPoster);
        //Los autores envían artículos a la sesion
        autor.enviarArticulo(copiaSesion, articulo1);
        autor1.enviarArticulo(copiaSesion, articulo2);
        //Cambio el estado a BIDDING
        copiaSesion.estadoSesion().asignarEstado();
        //Agrego revisores a la sesion
        copiaSesion.agregarRevisores('Leonardo Rey');
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
        copiaSesion.agregarRevisores('Luis Iglesias');
        //Revisores expresan su interés por el artículo regular
        copiaSesion.estadoSesion().procesarBidding(revisor, articulo1, "INTERESADO");//Leonardo Rey
        copiaSesion.estadoSesion().procesarBidding(revisor1, articulo1, "QUIZAS");//Carlos Lopez
        copiaSesion.estadoSesion().procesarBidding(revisor2, articulo1, "NO INTERESADO");//Maria Gonzalez
        copiaSesion.estadoSesion().procesarBidding(revisor3, articulo1, "QUIZAS");//Juana Gómez
        copiaSesion.estadoSesion().procesarBidding(revisor4, articulo1, "NO INTERESADO");//Mara Gonzalez
        copiaSesion.estadoSesion().procesarBidding(revisor5, articulo1, "QUIZAS");//Juan Gómez
        copiaSesion.estadoSesion().procesarBidding(revisor6, articulo1, "INTERESADO");//Raúl Arce
        copiaSesion.estadoSesion().procesarBidding(revisor7, articulo1, "QUIZAS");//Oscar Martín
        copiaSesion.estadoSesion().procesarBidding(revisor8, articulo1, "NO INTERESADO");//Inés Martinez
        copiaSesion.estadoSesion().procesarBidding(revisor9, articulo1, "INTERESADO");//Sonia Ruiz
        //Revisores expresan su interés por el artículo poster
        copiaSesion.estadoSesion().procesarBidding(revisor1, articulo2, "INTERESADO");//Carlos Lopez
        copiaSesion.estadoSesion().procesarBidding(revisor2, articulo2, "INTERESADO");//Maria Gonzalez
        copiaSesion.estadoSesion().procesarBidding(revisor5, articulo2, "QUIZAS");//Juan Gómez
        copiaSesion.estadoSesion().procesarBidding(revisor6, articulo2, "NO INTERESADO");//Raúl Arce
        copiaSesion.estadoSesion().procesarBidding(revisor7, articulo2, "NO INTERESADO");//Oscar Martín
        copiaSesion.estadoSesion().procesarBidding(revisor9, articulo2, "NO INTERESADO");//Sonia Ruiz
        copiaSesion.estadoSesion().procesarBidding(revisor10, articulo2, "QUIZAS");//Pedro Jimenez
        copiaSesion.estadoSesion().procesarBidding(revisor11, articulo2, "QUIZAS");//Daniel Martinez
        copiaSesion.estadoSesion().procesarBidding(revisor12, articulo2, "NO INTERESADO");//Luis Iglesias        
    });

    test('Se asignan revisores a los artículos según sus intereses', () => {
        //Cambio el estado a ASIGNACION
        copiaSesion.estadoSesion().asignarEstado();

        //Se asignan los revisores teniendo en cuenta el interés
        copiaSesion.estadoSesion().asignarRevisores();
        expect(articulo1.listRevisoresAsignados()).toContain(revisor);//Leonardo Rey
        expect(articulo1.listRevisoresAsignados()).toContain(revisor6);//Raúl Arce
        expect(articulo1.listRevisoresAsignados()).toContain(revisor9);//Sonia Ruiz

        expect(articulo2.listRevisoresAsignados()).toContain(revisor1);//Carlos Lopez
        expect(articulo2.listRevisoresAsignados()).toContain(revisor2);//Maria Gonzalez
        expect(articulo2.listRevisoresAsignados()).toContain(revisor5);//Juan Gómez
        
    });

    test('El proceso de asignación de revisores sólo se puede llevar acabo en el Estado de Asignacion', () => {
        expect(() => copiaSesion.estadoSesion().asignarRevisores()).
            toThrow('El proceso de asignación de artículos sólo se puede realizar durante el estado de asignación');
    });

    test("Cada artículo debe tener exactamente 3 revisores", () => {
        //Cambio el estado a ASIGNACION
        copiaSesion.estadoSesion().asignarEstado();

        copiaSesion.estadoSesion().asignarRevisores();

        copiaSesion._articulos.forEach((articulo) => {
            expect(articulo.listRevisoresAsignados()).toHaveLength(3);
        });
    });

    test("Se priorizan los revisores interesados y se asignan de forma equitativa", () => {
        //Cambio el estado a ASIGNACION
        copiaSesion.estadoSesion().asignarEstado();

        copiaSesion.estadoSesion().asignarRevisores();

        copiaSesion._articulos.forEach((articulo) => {
            const revisoresAsignados = articulo.listRevisoresAsignados();console.log('revisoresAsignados',revisoresAsignados);
            expect(revisoresAsignados.some((r) => r.interes === "INTERESADO")).toBeTruthy();
        });
    });

    test("Se distribuyen las revisiones de manera balanceada", () => {
        //Cambio el estado a ASIGNACION
        copiaSesion.estadoSesion().asignarEstado();

        copiaSesion.estadoSesion().asignarRevisores();

        const conteoRevisiones = {};
        copiaSesion._revisores.forEach(revisor => conteoRevisiones[revisor._nombreUsuario] = 0);

        copiaSesion._articulos.forEach(articulo => {
            articulo.listRevisoresAsignados().forEach(revisor => {
                conteoRevisiones[revisor._nombreUsuario]++;
            });
        });

        const valores = Object.values(conteoRevisiones);
        const maxRevisiones = Math.max(...valores);
        const minRevisiones = Math.min(...valores);

        expect(maxRevisiones - minRevisiones).toBeLessThanOrEqual(1);
    });

    test("Lanza un error si no hay suficientes revisores", () => {
        Usuario.usuariosRegistrados = [autor, autor1, revisor, revisor1];
        copiaSesion._revisores = [revisor, revisor1];
        copiaSesion.estadoSesion().asignarEstado();
        expect(() => copiaSesion.estadoSesion().asignarRevisores()).toThrow("No hay suficientes revisores para asignar a cada artículo.");
    });

    test("Lanza un error si no se pueden asignar 3 revisores a un artículo", () => {
        Usuario.usuariosRegistrados = [autor, autor1, revisor, revisor1, revisor2];
        copiaSesion._revisores = [revisor, revisor1, revisor2];
        copiaSesion.estadoSesion().asignarEstado();
        expect(() => copiaSesion.estadoSesion().asignarRevisores()).toThrow("No se pudo asignar suficientes revisores para el artículo");
    });

    test("Lanza un error si el total de revisiones no coincide con el número esperado", () => {
        // Reducir la cantidad de intereses para simular un error
        copiaSesion.estadoSesion().procesarBidding(revisor12, articulo2, "SIN INTERES");
        copiaSesion.estadoSesion().asignarEstado();
        expect(() => copiaSesion.estadoSesion().asignarRevisores()).toThrow("Se han asignado");
    });
});
