const Articulos = require("./Articulos/Articulos");
const ArticulosPoster = require("./Articulos/ArticulosPoster");
const ArticulosRegular = require("./Articulos/ArticulosRegular");

describe("ArticuloRegular", () => {
    let autor1, autor2;
  
    beforeEach(() => {
      autor1 = new Autores('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
      autor2 = new Autores('Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    });

    test("Crear un nuevo artículo regular con sus autores", () => {
        const articulo = new ArticulosRegular(
          "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
          "https://ieeexplore.ieee.org/document/9430234",
          "Resumen del artículo 1",
          [autor1, autor2],
          autor2
        );
    
        expect(articulo.titulo).toBe("An investigation into the Impact of Artificial Intelligence on the Future of Project Management");
        expect(articulo.urlArchivoAdjunto).toBe("http://archivo1.com");
        expect(articulo.abstract).toBe("Resumen del artículo 1");
        expect(articulo.autores.length).toBe(2);
        expect(articulo.autores[0].nombreCompleto).toBe("Ana Gómez");
        expect(articulo.autores[1].nombreCompleto).toBe("Luis Fernández");
        expect(articulo.autorEncargado.nombreCompleto).toBe("Luis Fernández");
      });
});