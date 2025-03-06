const { sesionW } = require("../__fixtures__/sesionesFixture");
const { autor, autor1, autor2, autor3, revisor, revisor1, revisor2, revisor3, revisor4, revisor5, revisor6,
    revisor7, revisor8, revisor9, revisor10, revisor11, revisor12 } = require("../__fixtures__/usuariosFixture");
const { articuloRegular } = require("../__fixtures__/articulosFixture");
const _ = require("lodash");

describe('Etapa Revisión', () => {

    let copiaSesion;
    let articulo1;
    beforeEach(() => {
        //Creo copia de la sesión para hacer las pruebas sobre la copia y no alterar la original
        copiaSesion = _.cloneDeep(require("../__fixtures__/sesionesFixture").sesionW);        
        //Creo copias del artículo
        articulo1 = _.cloneDeep(require("../__fixtures__/articulosFixture").articuloRegular);
        //Los autores envían artículos a la sesion
        autor.enviarArticulo(copiaSesion, articulo1);
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
        //Cambio el estado a ASIGNACION
        copiaSesion.estadoSesion().asignarEstado();
        //Se asignan los revisores teniendo en cuenta el interés
        copiaSesion.estadoSesion().asignarRevisores();        
        //Cambio el estado a REVISION
        copiaSesion.estadoSesion().asignarEstado();
    });

    test('Los revisores asignados pueden puntuar un artículo', () => {
        expect(copiaSesion.estadoSesion().setEstado()).toBe('REVISION');
        
        const revisoresAsignados = articulo1.listRevisoresAsignados();

        //Los revisores asignados puntúan
        copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados[0], articulo1, 2, "Buen artículo, pero puede mejorar.");
        copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados[1], articulo1, -1, "La redacción es confusa.");
        copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados[2], articulo1, 1, "Buen artículo.");

        //Verifico que las puntuaciones se registraron correctamente
        expect(copiaSesion.estadoSesion()._puntuaciones.get(articulo1)).toEqual([
            { revisor: revisoresAsignados[0], puntaje: 2, comentario: "Buen artículo, pero puede mejorar." },
            { revisor: revisoresAsignados[1], puntaje: -1, comentario: "La redacción es confusa." },
            { revisor: revisoresAsignados[2], puntaje: 1, comentario: "Buen artículo." }
        ]);        
    });
    
    test('Un revisor no asignado no debería poder puntuar', () => {
        expect(() => copiaSesion.estadoSesion().puntuarArticulo(revisor12, articulo1, 3, "Excelente trabajo"))
            .toThrow("El revisor no está asignado a este artículo");
    });

    test('Un puntaje fuera del rango debería generar error', () => {
        const revisoresAsignados = articulo1.listRevisoresAsignados();

        expect(() => copiaSesion.estadoSesion().puntuarArticulo(revisoresAsignados[0], articulo1, 5, "Increíble"))
            .toThrow("El puntaje debe estar entre -3 y 3");
    });
});


//comentario nuevo