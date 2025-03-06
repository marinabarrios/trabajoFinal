const { articuloRegular, articuloPoster } = require("../__fixtures__/articulosFixture");
const { autor, autor1 } = require("../__fixtures__/usuariosFixture");
const ArticuloRegular = require("../Articulo/ArticuloRegular");
const ArticuloPoster = require("../Articulo/ArticuloPoster");

describe("Pruebas Artículos Regulares", () => {

    test("Crear un nuevo artículo regular con sus autores", () => {
        expect(articuloRegular._tituloArticulo).toBe("Artículo Regular 1");
        expect(articuloRegular._archivoAdjunto).toBe("https://ieeexplore.ieee.org/document/9430234");
        expect(articuloRegular._abstract).toBe("Abstract del artículo 1");
        expect(articuloRegular._autoresArticulo.length).toBe(2);
        expect(articuloRegular._tipoArticulo).toBe('REGULAR');
        expect(articuloRegular._autoresArticulo[0]._nombreUsuario).toBe('Juan Rodriguez');
        expect(articuloRegular._autoresArticulo[1]._nombreUsuario).toBe('Sofia Perez');
        expect(articuloRegular._autorNotificacion[0]._nombreUsuario).toBe('Sofia Perez');
    });

    test('No se le puede asignar a un artículo regular un tipo de artículo poster', () => {
      expect(() => articuloRegular.agregarTipoArticulo("POSTER"))
          .toThrow("El artículo ya tiene un tipo asignado: REGULAR");
    });

    test("No se puede crear un artículo regular sin título", () => {
      expect(() => new ArticuloRegular(
                    null,
                    "https://ieeexplore.ieee.org/document/9430234", [autor, autor1],
                    "Abstract del artículo 1", [autor1]
            )).toThrow("Rechazado: El título del artículo no puede estar vacío");
    });

    test("No se puede crear un artículo regular sin autores", () => {
      expect(() => new ArticuloRegular(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "https://ieeexplore.ieee.org/document/9430234", [],
                    "Abstract del artículo 1", [autor1]
            )).toThrow("Rechazado: Debe tener definido al menos un autor");
    });

    test("No se puede crear un artículo regular sin un archivo adjunto válido", () => {
      expect(() => new ArticuloRegular(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "SIN URL VALIDA", [autor, autor1],
                    "Abstract del artículo 1", [autor1]
            )).toThrow("Rechazado: El archivo adjunto debe ser una URL válida");
    });

    test("No se puede crear un artículo regular con abstract nulo", () => {
      expect(() => new ArticuloRegular(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "https://ieeexplore.ieee.org/document/9430234", [autor, autor1],
                    null, [autor1]
            )).toThrow("Rechazado: El abstract no puede estar vacío");
    });

    test("No se puede crear un artículo regular sin abstract", () => {
      expect(() => new ArticuloRegular(
                  "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                  "https://ieeexplore.ieee.org/document/9430234", [autor, autor1],
                  "", [autor1]
            )).toThrow("Rechazado: El abstract no puede estar vacío");
    });

    test("No se puede crear un artículo regular donde el abstract tenga más de 300 palabras", () => {
      const abstractLargo = "palabra ".repeat(301);
      expect(() => new ArticuloRegular(
                  "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                  "https://ieeexplore.ieee.org/document/9430234", [autor, autor1],
                  abstractLargo, [autor1]
            )).toThrow("Rechazado: El resúmen no puede tener más de 300 palabras");
    });
  });

describe("Pruebas Artículos Poster", () => {

    test("Crear un nuevo artículo poster con sus autores", () => {
      expect(articuloPoster._tituloArticulo).toBe("Artículo Poster 1");
      expect(articuloPoster._archivoAdjunto).toBe("https://ieeexplore.ieee.org/document/9430234");
      expect(articuloPoster._archivoFuentes).toBe("https://ieeexplore.ieee.org/document/9430234");
      expect(articuloPoster._autoresArticulo.length).toBe(2);
      expect(articuloPoster._tipoArticulo).toBe('POSTER');
      expect(articuloPoster._autoresArticulo[0]._nombreUsuario).toBe('Sofia Perez');
      expect(articuloPoster._autoresArticulo[1]._nombreUsuario).toBe('José Gonzalez');
      expect(articuloPoster._autorNotificacion[0]._nombreUsuario).toBe('José Gonzalez');
    });

    test('No se le puede asignar a un artículo poster un tipo de artículo regular', () => {
      expect(() => articuloPoster.agregarTipoArticulo("REGULAR"))
          .toThrow("El artículo ya tiene un tipo asignado: POSTER");
    });

    test("No se puede crear un artículo poster sin título", () => {
      expect(() => new ArticuloPoster(
                     null,
                    "https://ieeexplore.ieee.org/document/9430234", [autor, autor1],
                    "https://ieeexplore.ieee.org/document/9430234", [autor1]
                  )    
      ).toThrow("Rechazado: El título del artículo no puede estar vacío");
    });

    test("No se puede crear un artículo poster sin autores", () => {
      expect(() => new ArticuloPoster(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "https://ieeexplore.ieee.org/document/9430234", [],
                    "https://ieeexplore.ieee.org/document/9430234", [autor1]
                  )    
      ).toThrow("Rechazado: Debe tener definido al menos un autor");
    });

    test("No se puede crear un artículo poster sin un archivo adjunto válido", () => {
      expect(() => new ArticuloPoster(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "ArtificialIntelligence.pdf", [autor, autor1],
                    "https://ieeexplore.ieee.org/document/9430234", [autor1]
                  )    
      ).toThrow("Rechazado: El archivo adjunto debe ser una URL válida");
    });

    test("No se puede crear un artículo poster sin un archivo adjunto válido", () => {
      expect(() => new ArticuloPoster(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "https://ieeexplore.ieee.org/document/9430234", [autor, autor1],
                    "ArtificialIntelligence.pdf", [autor1]
                  )    
      ).toThrow("Rechazado: El archivo fuente debe ser una URL válida");
    });
});

