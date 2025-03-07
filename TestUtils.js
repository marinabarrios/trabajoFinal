const _ = require("lodash");
const { autor, autor1, autor2, autor3, revisor, revisor1, revisor2, revisor3, revisor4, revisor5, revisor6,
    revisor7, revisor8, revisor9, revisor10, revisor11, revisor12 } = require("./__fixtures__/usuariosFixture");

function enviarArticulo(copiaSesion) {
    const articulos = [
        articulo1, articulo2, articulo3, articulo4, articulo5, articulo6, articulo7
    ] = [
        _.cloneDeep(require("./__fixtures__/articulosFixture").articuloRegular),
        _.cloneDeep(require("./__fixtures__/articulosFixture").articuloPoster),
        _.cloneDeep(require("./__fixtures__/articulosFixture").artPosterCon2AutoresNotif),
        _.cloneDeep(require("./__fixtures__/articulosFixture").articuloRegular1),
        _.cloneDeep(require("./__fixtures__/articulosFixture").articuloPoster1),
        _.cloneDeep(require("./__fixtures__/articulosFixture").articuloRegular2),
        _.cloneDeep(require("./__fixtures__/articulosFixture").articuloPoster2)
    ];

    // Los autores envían artículos a la sesión
    const autores = [autor, autor1, autor3, autor2, autor1, autor3, autor3];
    autores.forEach((autor, i) => autor.enviarArticulo(copiaSesion, articulos[i]));
}

function agregarRevisores(copiaSesion) {
    const nombresRevisores = [
        'Leonardo Rey', 'Carlos Lopez', 'Maria Gonzalez', 'Juana Gómez',
        'Mara Gonzalez', 'Juan Gómez', 'Raúl Arce', 'Oscar Martín',
        'Inés Martinez', 'Sonia Ruiz', 'Pedro Jimenez', 'Daniel Martinez',
        'Luis Iglesias'
    ];
    nombresRevisores.forEach(nombre => copiaSesion.agregarRevisores(nombre));
}

function expresarInteres(copiaSesion) {
    const interesesRevisores = [
        { revisor: revisor, articulo: articulo1, interes: "INTERESADO" },//Leonardo Rey
        { revisor: revisor1, articulo: articulo1, interes: "QUIZAS" },//Carlos Lopez
        { revisor: revisor2, articulo: articulo1, interes: "NO INTERESADO" },//Maria Gonzalez
        { revisor: revisor3, articulo: articulo1, interes: "QUIZAS" },//Juana Gómez

        { revisor: revisor4, articulo: articulo2, interes: "NO INTERESADO" },//Mara Gonzalez
        { revisor: revisor5, articulo: articulo2, interes: "QUIZAS" },//Juan Gómez
        { revisor: revisor6, articulo: articulo2, interes: "INTERESADO" },//Raúl Arce
        { revisor: revisor7, articulo: articulo2, interes: "QUIZAS" },//Oscar Martín

        { revisor: revisor, articulo: articulo3, interes: "INTERESADO" },//Leonardo Rey
        { revisor: revisor1, articulo: articulo3, interes: "QUIZAS" },//Carlos Lopez
        { revisor: revisor8, articulo: articulo3, interes: "NO INTERESADO" },//Inés Martinez
        { revisor: revisor9, articulo: articulo3, interes: "INTERESADO" },//Sonia Ruiz

        { revisor: revisor5, articulo: articulo4, interes: "QUIZAS" },//Juan Gómez
        { revisor: revisor6, articulo: articulo4, interes: "INTERESADO" },//Raúl Arce
        { revisor: revisor8, articulo: articulo4, interes: "NO INTERESADO" },//Inés Martinez
        { revisor: revisor9, articulo: articulo4, interes: "INTERESADO" },//Sonia Ruiz

        { revisor: revisor, articulo: articulo5, interes: "INTERESADO" },//Leonardo Rey
        { revisor: revisor6, articulo: articulo5, interes: "INTERESADO" },//Raúl Arce
        { revisor: revisor8, articulo: articulo5, interes: "NO INTERESADO" },//Inés Martinez
        { revisor: revisor9, articulo: articulo5, interes: "INTERESADO" },//Sonia Ruiz

        { revisor: revisor4, articulo: articulo6, interes: "NO INTERESADO" },//Mara Gonzalez
        { revisor: revisor6, articulo: articulo6, interes: "INTERESADO" },//Raúl Arce
        { revisor: revisor9, articulo: articulo6, interes: "INTERESADO" },//Sonia Ruiz
        { revisor: revisor10, articulo: articulo6, interes: "INTERESADO" },//Pedro Jimenez

        { revisor: revisor4, articulo: articulo7, interes: "NO INTERESADO" },//Mara Gonzalez
        { revisor: revisor6, articulo: articulo7, interes: "INTERESADO" },//Raúl Arce
        { revisor: revisor11, articulo: articulo7, interes: "INTERESADO" },//Daniel Martinez
        { revisor: revisor12, articulo: articulo7, interes: "INTERESADO" }//Luis Iglesias

    ];
    
    interesesRevisores.forEach(({ revisor, articulo, interes }) => {
        copiaSesion.estadoSesion().procesarBidding(revisor, articulo, interes);
    });    
}

function asignarPuntuaciones(copiaSesion) {
    const revisoresAsignados1 = copiaSesion._articulos[0].listRevisoresAsignados();
    const revisoresAsignados2 = copiaSesion._articulos[1].listRevisoresAsignados();
    const revisoresAsignados3 = copiaSesion._articulos[2].listRevisoresAsignados();
    const revisoresAsignados4 = copiaSesion._articulos[3].listRevisoresAsignados();
    const revisoresAsignados5 = copiaSesion._articulos[4].listRevisoresAsignados();
    const revisoresAsignados6 = copiaSesion._articulos[5].listRevisoresAsignados();
    const revisoresAsignados7 = copiaSesion._articulos[6].listRevisoresAsignados();

    const puntuaciones = [
        { revisor: revisoresAsignados1[0], articulo: copiaSesion._articulos[0], puntaje: 2, comentario: "Buen artículo" },
        { revisor: revisoresAsignados1[1], articulo: copiaSesion._articulos[0], puntaje: -1, comentario: "Mala redacción" },
        { revisor: revisoresAsignados1[2], articulo: copiaSesion._articulos[0], puntaje: 1, comentario: "Buen artículo" },

        { revisor: revisoresAsignados2[0], articulo: copiaSesion._articulos[1], puntaje: 3, comentario: "Buen artículo, pero puede mejorar" },
        { revisor: revisoresAsignados2[1], articulo: copiaSesion._articulos[1], puntaje: 1, comentario: "La redacción es confusa" },
        { revisor: revisoresAsignados2[2], articulo: copiaSesion._articulos[1], puntaje: 1, comentario: "Buen artículo" },

        { revisor: revisoresAsignados3[0], articulo: copiaSesion._articulos[2], puntaje: 3, comentario: "Buen artículo, pero puede mejorar" },
        { revisor: revisoresAsignados3[1], articulo: copiaSesion._articulos[2], puntaje: 0, comentario: "La redacción es confusa" },
        { revisor: revisoresAsignados3[2], articulo: copiaSesion._articulos[2], puntaje: 2, comentario: "Buen artículo" },

        { revisor: revisoresAsignados4[0], articulo: copiaSesion._articulos[3], puntaje: 3, comentario: "Buen artículo, pero puede mejorar" },
        { revisor: revisoresAsignados4[1], articulo: copiaSesion._articulos[3], puntaje: 2, comentario: "La redacción es confusa" },
        { revisor: revisoresAsignados4[2], articulo: copiaSesion._articulos[3], puntaje: -3, comentario: "Mala redacción" },

        { revisor: revisoresAsignados5[0], articulo: copiaSesion._articulos[4], puntaje: 2, comentario: "Buen artículo, pero puede mejorar" },
        { revisor: revisoresAsignados5[1], articulo: copiaSesion._articulos[4], puntaje: 0, comentario: "La redacción es confusa" },
        { revisor: revisoresAsignados5[2], articulo: copiaSesion._articulos[4], puntaje: 1, comentario: "Buen artículo" },

        { revisor: revisoresAsignados6[0], articulo: copiaSesion._articulos[5], puntaje: 3, comentario: "Buen artículo, pero puede mejorar" },
        { revisor: revisoresAsignados6[1], articulo: copiaSesion._articulos[5], puntaje: 1, comentario: "La redacción es confusa" },
        { revisor: revisoresAsignados6[2], articulo: copiaSesion._articulos[5], puntaje: 1, comentario: "Buen artículo" },

        { revisor: revisoresAsignados7[0], articulo: copiaSesion._articulos[6], puntaje: -2, comentario: "Mala redacción" },
        { revisor: revisoresAsignados7[1], articulo: copiaSesion._articulos[6], puntaje: -1, comentario: "La redacción es confusa" },
        { revisor: revisoresAsignados7[2], articulo: copiaSesion._articulos[6], puntaje: 2, comentario: "Buen artículo" },
    ];
    
    puntuaciones.forEach(({ revisor, articulo, puntaje, comentario }) => {
        copiaSesion.estadoSesion().puntuarArticulo(revisor, articulo, puntaje, comentario);
    });
}
module.exports = {enviarArticulo, agregarRevisores, expresarInteres, asignarPuntuaciones};