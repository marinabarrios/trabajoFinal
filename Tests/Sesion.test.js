const { sesionW, sesionR, sesionRfD, sesionP } = require("../__fixtures__/sesionesFixture");
const { autor } = require("../__fixtures__/usuariosFixture");
const { articuloPoster, articuloRegular, artPosterCon2AutoresNotif } = require("../__fixtures__/articulosFixture");

describe('Gestión de envío de artículos', () => {
    
    test('El artículo es aceptado si está dentro del deadline y envía el tipo correcto de artículo a la sesión', () => {
        //Envío un Artículo Regular a una Sesión Regular
        articulo = { ...articuloRegular };
        articulo.notificacion = jest.fn(); // Simulo el método de notificación
        autor.enviarArticulo(sesionR, articulo);
        expect(sesionR.listArticulos()).toContain(articulo);
        expect(articulo.notificacion).toHaveBeenCalledWith('Su artículo fue aceptado');
    });

    test('El artículo es rechazado si está fuera del deadline', () => {
        //Envío un Artículo Regular a una Sesión Regular con un deadline expirado
        articulo = { ...articuloRegular };
        articulo.notificacion = jest.fn();
        expect(() => autor.enviarArticulo(sesionRfD, articulo)).toThrow('El artículo fue rechazado por estar fuera del deadline');
        expect(articulo.notificacion).toHaveBeenCalledWith('Su artículo fue enviado fuera de tiempo');
    });

    test('Un articulo regular es aceptado en una Sesión de Workshop', () => {
        //Envío un Artículo Regular a una Sesión Workshop
        articulo = { ...articuloRegular };
        articulo.notificacion = jest.fn();
        autor.enviarArticulo(sesionW, articulo);

        expect(sesionW.listArticulos()).toContain(articulo);
        expect(articulo.notificacion).toHaveBeenCalledWith('Su artículo fue aceptado');
    });

    test('Un articulo poster es aceptado en una Sesión de Workshop', () => {
        //Envío un Artículo Poster a una Sesión Workshop
        articulo = { ...articuloPoster };
        articulo.notificacion = jest.fn();
        autor.enviarArticulo(sesionW, articulo);

        expect(sesionW.listArticulos()).toContain(articulo);
        expect(articulo.notificacion).toHaveBeenCalledWith('Su artículo fue aceptado');
    });

    test('Todos los autores reciben la notificación si el artículo es aceptado', () => {
        //Envío un Artículo Poster a una Sesión Poster
        articulo = { ...artPosterCon2AutoresNotif };
        articulo.notificacion = jest.fn();
        autor.enviarArticulo(sesionP, articulo);

        expect(sesionP.listArticulos()).toContain(articulo);
        expect(articulo.notificacion).toHaveBeenCalledWith('Su artículo fue aceptado');
        //agregar verificacion de q recibio
    });
    // verificar que no puedan enviar un articulo regular a una sesion poster y viceversa
    // verificar q workshop reciba poster y regular
});
describe('Notificación a los autores', () => {
    test('Los autores reciben la notificación cuando el artículo es aceptado', () => {
        //Envío un Artículo Poster a una Sesión Poster
        const articulo = Object.create(artPosterCon2AutoresNotif);//copia del articulo
        //console.log('Métodos del artículo:', Object.getOwnPropertyNames(Object.getPrototypeOf(articulo)));

        articulo._autorNotificacion.forEach(autor => {
            autor.recibe_notificacion = jest.fn();
          });

        autor.enviarArticulo(sesionP, articulo);

        //Verifico que cada autor recibió la notificación correcta
        articulo._autorNotificacion.forEach(autor => {
            expect(autor.recibe_notificacion).toHaveBeenCalledWith('Su artículo fue aceptado');
        });
    });
});