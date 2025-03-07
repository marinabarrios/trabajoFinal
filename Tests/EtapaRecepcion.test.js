const { sesionW, sesionR, sesionRfD, sesionP } = require("../__fixtures__/sesionesFixture");
const { autor } = require("../__fixtures__/usuariosFixture");
const { articuloPoster, articuloRegular, artPosterCon2AutoresNotif } = require("../__fixtures__/articulosFixture");
const Sesion = require('../Sesion/Sesion');
const EstadoSesion = require('../EstadoSesion/EstadoSesion');

describe('Sesiones', () => {

    test("La clase Sesión es abstracta, no se puede instanciar", () => {
        expect(() => new Sesion('Inteligencia Artificial', 'WORKSHOP', '2025-02-21')
              ).toThrow("No se puede instanciar una clase abstracta");
    });
    
    test("No se puede instanciar la clase EstadoSesion para setear el estado", () => {
        const estadoSesion = new EstadoSesion();
        expect(() => estadoSesion.setEstado()).toThrow("Método no implementado en la clase actual");
    });

    test("No se puede instanciar la clase EstadoSesion para agregar artículos a la sesión", () => {
        const estadoSesion = new EstadoSesion();
        expect(() => estadoSesion.agregarArticulo()).toThrow("Método no implementado en la clase actual");
    });

    test("No se puede instanciar la clase EstadoSesion para asignar estados", () => {
        const estadoSesion = new EstadoSesion();
        expect(() => estadoSesion.asignarEstado()).toThrow("Método no implementado en la clase actual");
    });
});

describe('Gestión de envío de artículos', () => {
    
    test('El artículo es aceptado si está dentro del deadline y envía el tipo correcto de artículo a la sesión', () => {
        //Envío un Artículo Regular a una Sesión Regular
        articulo = { ...articuloRegular };
        articulo.notificar = jest.fn(); // Simulo el método de notificación

        //Verifico que el estado de la sesión es RECEPCION antes de enviar el artículo
        expect(sesionR.estadoSesion().setEstado()).toBe('RECEPCION');

        autor.enviarArticulo(sesionR, articulo);
        expect(sesionR.listArticulos()).toContain(articulo);
        expect(articulo.notificar).toHaveBeenCalledWith('Su artículo fue aceptado');
    });

    test('El artículo es rechazado si está fuera del deadline', () => {
        //Envío un Artículo Regular a una Sesión Regular con un deadline expirado
        articulo = { ...articuloRegular };
        articulo.notificar = jest.fn();

        expect(sesionRfD.estadoSesion().setEstado()).toBe('RECEPCION');

        expect(() => autor.enviarArticulo(sesionRfD, articulo)).toThrow('El artículo fue rechazado por estar fuera del deadline');
        expect(articulo.notificar).toHaveBeenCalledWith('Su artículo fue enviado fuera de tiempo');
    });

    test('Un articulo regular es aceptado en una Sesión de Workshop', () => {
        //Envío un Artículo Regular a una Sesión Workshop
        articulo = { ...articuloRegular };
        articulo.notificar = jest.fn();

        expect(sesionW.estadoSesion().setEstado()).toBe('RECEPCION');

        autor.enviarArticulo(sesionW, articulo);

        expect(sesionW.listArticulos()).toContain(articulo);
        expect(articulo.notificar).toHaveBeenCalledWith('Su artículo fue aceptado');
    });

    test('Un articulo poster es aceptado en una Sesión de Workshop', () => {
        //Envío un Artículo Poster a una Sesión Workshop
        articulo = { ...articuloPoster };
        articulo.notificar = jest.fn();

        expect(sesionW.estadoSesion().setEstado()).toBe('RECEPCION');

        autor.enviarArticulo(sesionW, articulo);

        expect(sesionW.listArticulos()).toContain(articulo);
        expect(articulo.notificar).toHaveBeenCalledWith('Su artículo fue aceptado');
    });

    test('Un articulo poster no es aceptado en una Sesión de Regular', () => {
        //Envío un Artículo Poster a una Sesión Regular
        articulo = { ...articuloPoster };
        articulo.notificar = jest.fn();

        expect(sesionR.estadoSesion().setEstado()).toBe('RECEPCION');

        expect(() => autor.enviarArticulo(sesionR, articulo)).toThrow('El artículo es del tipo incorrecto para esta sesión');
        expect(articulo.notificar).toHaveBeenCalledWith('Su artículo fue rechazado porque no es del tipo permitido para esta sesión');
    });

    test('Un articulo regular no es aceptado en una Sesión de Poster', () => {
        //Envío un Artículo Regular a una Sesión Poster
        articulo = { ...articuloRegular };
        articulo.notificar = jest.fn();

        expect(sesionP.estadoSesion().setEstado()).toBe('RECEPCION');

        expect(() => autor.enviarArticulo(sesionP, articulo)).toThrow('El artículo es del tipo incorrecto para esta sesión');
        expect(articulo.notificar).toHaveBeenCalledWith('Su artículo fue rechazado porque no es del tipo permitido para esta sesión');
    });

    test('Todos los autores reciben la notificación si el artículo es aceptado', () => {
        //Envío un Artículo Poster a una Sesión Poster
        articulo = { ...artPosterCon2AutoresNotif };
        articulo.notificar = jest.fn();

        expect(sesionP.estadoSesion().setEstado()).toBe('RECEPCION');

        autor.enviarArticulo(sesionP, articulo);

        expect(sesionP.listArticulos()).toContain(articulo);
        expect(articulo.notificar).toHaveBeenCalledWith('Su artículo fue aceptado');
    });
});

describe('Notificación a los autores', () => {

    test('Los autores reciben la notificación cuando el artículo es aceptado', () => {
        //Envío un Artículo Poster a una Sesión Poster
        const articulo = Object.create(artPosterCon2AutoresNotif);//copia del articulo
        //console.log('Métodos del artículo:', Object.getOwnPropertyNames(Object.getPrototypeOf(articulo)));
        
        articulo._autorNotificacion.forEach(autor => {
            autor.recibeNotificacion = jest.fn();
          });

        expect(sesionP.estadoSesion().setEstado()).toBe('RECEPCION');

        autor.enviarArticulo(sesionP, articulo);

        //Verifico que cada autor recibió la notificación correcta
        articulo._autorNotificacion.forEach(autor => {
            expect(autor.recibeNotificacion).toHaveBeenCalledWith("Su artículo fue aceptado");
        });
    });
});

describe('Revisión', () => {
    
    test('No se puede procesar intereses en etapa de Recepción', () => {
        articulo = { ...articuloRegular };

        expect(sesionR.estadoSesion().setEstado()).toBe('RECEPCION');

        expect(() => sesionR.estadoSesion().procesarBidding(autor, articulo, "Interesado")).toThrow(
            "En esta estapa no se procesan los intereses"
          );
    });
});