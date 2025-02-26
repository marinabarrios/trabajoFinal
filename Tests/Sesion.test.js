const { sesion1, sesion3 } = require("../__fixtures__/sesionesFixture");
const { autor } = require("../__fixtures__/usuariosFixture");
const { articuloRegular, artPosterCon2AutoresNotif } = require("../__fixtures__/articulosFixture");

describe('Gestión de envío de artículos', () => {

    test('El artículo es aceptado si está dentro del deadline', () => {
        articulo = { ...articuloRegular };
        articulo.notification = jest.fn(); // Simulo el método de notificación
        autor.enviarArticulo(sesion3, articulo);
        expect(sesion3.listArticulos()).toContain(articulo);
        expect(articulo.notification).toHaveBeenCalledWith(articulo.autorNotificacion, 'Su artículo fue aceptado');
    });

    test('El artículo es rechazado si está fuera del deadline', () => {
        articulo = { ...articuloRegular };
        articulo.notification = jest.fn();
        expect(() => autor.enviarArticulo(sesion1, articulo)).toThrow('El artículo fue rechazado');
        expect(articulo.notification).toHaveBeenCalledWith(articulo.autorNotificacion, 'Su artículo fue enviado fuera de tiempo');
    });

    test('Todos los autores reciben la notificación si el artículo es aceptado', () => {
        articulo = { ...artPosterCon2AutoresNotif };
        articulo.notification = jest.fn();
        autor.enviarArticulo(sesion3, articulo);

        expect(sesion3.listArticulos()).toContain(articulo);
        expect(articulo.notification).toHaveBeenCalledWith(articulo.autorNotificacion[0], 'Su artículo fue aceptado');
        expect(articulo.notification).toHaveBeenCalledWith(articulo.autorNotificacion[1], 'Su artículo fue aceptado');
    });
});