const Autores = require("../Usuarios/Autores");
const ArticuloRegular = require("../Articulo/ArticuloRegular");
const ArticuloPoster = require("../Articulo/ArticuloPoster");

describe("Pruebas Artículos Regulares", () => {
    let autor1, autor2;
  
    beforeEach(() => {
      autor1 = new Autores('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
      autor2 = new Autores('Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    });

    test("Crear un nuevo artículo regular con sus autores", () => {
        const articulo = new ArticuloRegular(
          "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
          "https://ieeexplore.ieee.org/document/9430234", [autor1, autor2],
          "Abstract del artículo 1", autor2
        );
    
        expect(articulo._tituloArticulo).toBe("An investigation into the Impact of Artificial Intelligence on the Future of Project Management");
        expect(articulo._archivoAdjunto).toBe("https://ieeexplore.ieee.org/document/9430234");
        expect(articulo._abstract).toBe("Abstract del artículo 1");
        expect(articulo._autoresArticulo.length).toBe(2);
        expect(articulo._tipoArticulo).toBe('REGULAR');
        expect(articulo._autoresArticulo[0]._nombreUsuario).toBe('Juan Rodriguez');
        expect(articulo._autoresArticulo[1]._nombreUsuario).toBe('Matias Lei');
        expect(articulo._autorNotificacion._nombreUsuario).toBe('Matias Lei');
    });
    test('No se le puede asignar a un artículo regular un tipo de artículo poster', () => {
      const articulo = new ArticuloRegular(
        "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
        "https://ieeexplore.ieee.org/document/9430234", [autor1, autor2],
        "https://ieeexplore.ieee.org/document/9430234", autor2
      );
      expect(() => articulo.agregarTipoArticulo("POSTER"))
          .toThrow("El artículo ya tiene un tipo asignado: REGULAR");
    });
    test("No se puede crear un artículo regular sin título", () => {
      expect(() => new ArticuloRegular(
                    null,
                    "https://ieeexplore.ieee.org/document/9430234", [autor1, autor2],
                    "Abstract del artículo 1", autor2
                  )    
      ).toThrow("Rechazado: El título del artículo no puede estar vacío");
    });
    test("No se puede crear un artículo regular sin autores", () => {
      expect(() => new ArticuloRegular(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "https://ieeexplore.ieee.org/document/9430234", [],
                    "Abstract del artículo 1", autor2
                  )    
      ).toThrow("Rechazado: Debe tener definido al menos un autor");
    });
    test("No se puede crear un artículo regular sin un archivo adjunto válido", () => {
      expect(() => new ArticuloRegular(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "ArtificialIntelligence.pdf", [autor1, autor2],
                    "Abstract del artículo 1", autor2
                  )    
      ).toThrow("Rechazado: El archivo adjunto debe ser una URL válida");
    });
    test("No se puede crear un artículo regular con abstract nulo", () => {
      expect(() => new ArticuloRegular(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "https://ieeexplore.ieee.org/document/9430234", [autor1, autor2],
                    null, autor2
                  )    
      ).toThrow("Rechazado: El abstract no puede estar vacío");
    });
    test("No se puede crear un artículo regular sin abstract", () => {
      expect(() => new ArticuloRegular(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "https://ieeexplore.ieee.org/document/9430234", [autor1, autor2],
                    "", autor2
                  )    
      ).toThrow("Rechazado: El abstract no puede estar vacío");
    });
    test("No se puede crear un artículo regular donde el abstract tenga más de 300 palabras", () => {
      const abstractLargo = "palabra ".repeat(301);
      expect(() => new ArticuloRegular(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "https://ieeexplore.ieee.org/document/9430234", [autor1, autor2],
                    abstractLargo, autor2
                  )    
      ).toThrow("Rechazado: El resúmen no puede tener más de 300 palabras");
    });
  });

describe("Pruebas Artículos Poster", () => {
    let autor1, autor2;
  
    beforeEach(() => {
      autor1 = new Autores('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
      autor2 = new Autores('Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    });

    test("Crear un nuevo artículo poster con sus autores", () => {
      const articulo = new ArticuloPoster(
        "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
        "https://ieeexplore.ieee.org/document/9430234", [autor1, autor2],
        "https://ieeexplore.ieee.org/document/9430234", autor2
      );
  
      expect(articulo._tituloArticulo).toBe("An investigation into the Impact of Artificial Intelligence on the Future of Project Management");
      expect(articulo._archivoAdjunto).toBe("https://ieeexplore.ieee.org/document/9430234");
      expect(articulo._archivoFuentes).toBe("https://ieeexplore.ieee.org/document/9430234");
      expect(articulo._autoresArticulo.length).toBe(2);
      expect(articulo._tipoArticulo).toBe('POSTER');
      expect(articulo._autoresArticulo[0]._nombreUsuario).toBe('Juan Rodriguez');
      expect(articulo._autoresArticulo[1]._nombreUsuario).toBe('Matias Lei');
      expect(articulo._autorNotificacion._nombreUsuario).toBe('Matias Lei');
    });
    test('No se le puede asignar a un artículo poster un tipo de artículo regular', () => {
      const articulo = new ArticuloPoster(
        "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
        "https://ieeexplore.ieee.org/document/9430234", [autor1, autor2],
        "https://ieeexplore.ieee.org/document/9430234", autor2
      );
      expect(() => articulo.agregarTipoArticulo("REGULAR"))
          .toThrow("El artículo ya tiene un tipo asignado: POSTER");
    });
    test("No se puede crear un artículo poster sin título", () => {
      expect(() => new ArticuloPoster(
                     null,
                    "https://ieeexplore.ieee.org/document/9430234", [autor1, autor2],
                    "https://ieeexplore.ieee.org/document/9430234", autor2
                  )    
      ).toThrow("Rechazado: El título del artículo no puede estar vacío");
    });
    test("No se puede crear un artículo poster sin autores", () => {
      expect(() => new ArticuloPoster(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "https://ieeexplore.ieee.org/document/9430234", [],
                    "https://ieeexplore.ieee.org/document/9430234", autor2
                  )    
      ).toThrow("Rechazado: Debe tener definido al menos un autor");
    });
    test("No se puede crear un artículo poster sin un archivo adjunto válido", () => {
      expect(() => new ArticuloPoster(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "ArtificialIntelligence.pdf", [autor1, autor2],
                    "https://ieeexplore.ieee.org/document/9430234", autor2
                  )    
      ).toThrow("Rechazado: El archivo adjunto debe ser una URL válida");
    });
    test("No se puede crear un artículo poster sin un archivo adjunto válido", () => {
      expect(() => new ArticuloPoster(
                    "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
                    "https://ieeexplore.ieee.org/document/9430234", [autor1, autor2],
                    "ArtificialIntelligence.pdf", autor2
                  )    
      ).toThrow("Rechazado: El archivo fuente debe ser una URL válida");
    });
});

