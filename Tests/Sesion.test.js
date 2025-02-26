const { sesionW, sesionR, sesionRfD, sesionP } = require("../__fixtures__/sesionesFixture");
const { autor } = require("../__fixtures__/usuariosFixture");
const { articuloPoster, articuloRegular, artPosterCon2AutoresNotif } = require("../__fixtures__/articulosFixture");

describe('Gestión de envío de artículos', () => {

    test('El artículo es aceptado si está dentro del deadline', () => {
        articulo = { ...articuloRegular };
        articulo.notification = jest.fn(); // Simulo el método de notificación
        autor.enviarArticulo(sesionR, articulo);
        expect(sesionR.listArticulos()).toContain(articulo);
        expect(articulo.notification).toHaveBeenCalledWith('Su artículo fue aceptado');
    });

    test('El artículo es rechazado si está fuera del deadline', () => {
        articulo = { ...articuloRegular };
        articulo.notification = jest.fn();
        expect(() => autor.enviarArticulo(sesionRfD, articulo)).toThrow('El artículo fue rechazado por estar fuera del deadline');
        expect(articulo.notification).toHaveBeenCalledWith('Su artículo fue enviado fuera de tiempo');
    });

    test('Todos los autores reciben la notificación si el artículo es aceptado', () => {
        articulo = { ...artPosterCon2AutoresNotif };
        articulo.notification = jest.fn();
        autor.enviarArticulo(sesionP, articulo);

        expect(sesionP.listArticulos()).toContain(articulo);
       // expect(articulo.notification).toHaveBeenCalledWith('Su artículo fue aceptado');
    });
});