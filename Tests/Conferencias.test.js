const Conferencias = require("../Conferencias");
const Sesiones = require("../Sesiones/Sesiones");

describe("Conferencias", () => {
    let conferencia;

    beforeEach(() => {
        conferencia = new Conferencias('Conferencia Informática', '2025-05-10', '2025-05-15');
    });

    test("Debe crear una conferencia correctamente", () => {
        expect(conferencia).toBeInstanceOf(Conferencias);
        expect(conferencia.nombreConferencia()).toBe('Conferencia Informática');
        expect(conferencia._fechaInicio).toBe('2025-05-10');
        expect(conferencia._fechaFin).toBe('2025-05-15');
        expect(conferencia.listSesiones()).toEqual([]); // No tiene sesiones al inicio
    });

    test("Debe crear una sesión correctamente", () => {
        const sesion = conferencia.crearSesion('Inteligencia Artificial', 'WORKSHOP', '2025-04-30');

        expect(sesion).toBeInstanceOf(Sesiones);
        expect(conferencia.listSesiones()).toContain(sesion);
    });

    test("Debe listar correctamente las sesiones creadas", () => {
        const sesion1 = conferencia.crearSesion('Inteligencia Artificial', 'WORKSHOP', '2025-04-30');
        const sesion2 = conferencia.crearSesion('Infraestructura', 'REGULAR', "2025-05-01");

        const sesiones = conferencia.listSesiones();

        expect(sesiones.length).toBe(2);
        expect(sesiones[0]).toBe(sesion1);
        expect(sesiones[1]).toBe(sesion2);
    });
});