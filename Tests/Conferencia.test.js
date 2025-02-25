const Conferencia = require("../Conferencia");
const Sesion = require("../Sesion/Sesion");
const Usuario = require("../Usuario/Usuario");
const { usuarios } = require("../__fixtures__/usuariosFixture"); 
const { sesion1, sesion2 } = require("../__fixtures__/sesionesFixture");
const { conferencia1 } = require("../__fixtures__/conferenciasFixture"); 

describe("Conferencias", () => {
    let conferencia;

    beforeEach(() => {
        Usuario.usuariosRegistrados = [...usuarios];
        conferencia = new Conferencia(
            conferencia1.nombreConferencia,
            conferencia1.fechaInicio,
            conferencia1.fechaFin,
        );
    });

    test("Debe crear una conferencia correctamente", () => {
        expect(conferencia).toBeInstanceOf(Conferencia);
        expect(conferencia.nombreConferencia()).toBe('Conferencia Informática');
        expect(conferencia._fechaInicio).toBe('2025-05-10');
        expect(conferencia._fechaFin).toBe('2025-05-15');
        expect(conferencia.listSesiones()).toEqual([]); // No tiene sesiones al inicio
    });

    
    test("Debe asignar correctamente los organizadores y comité de revisores", () => {
        const organizadoresEsperados = ['Matias Lei', 'Laura Díaz']; // CHAIR
        const comiteEsperado = ['Leonardo Rey', 'Carlos Lopez']; // REVISORES

        expect(conferencia._organizadores.map(o => o.nombre)).toEqual(organizadoresEsperados);
        expect(conferencia._comite.map(c => c.nombre)).toEqual(comiteEsperado);
    });

    test("Debe listar correctamente organizadores y comité", () => {
        const listado = conferencia.listarOrganizadoresYComite();

        expect(listado).toEqual({
            organizadores: ['Matias Lei', 'Laura Díaz'],
            comite: ['Leonardo Rey', 'Carlos Lopez']
        });
    });
    

    test("Debe crear una sesión correctamente", () => {
        //const sesion = conferencia.crearSesion('Inteligencia Artificial', 'WORKSHOP', '2025-04-30');

        expect(sesion1).toBeInstanceOf(Sesion);
        expect(conferencia.listSesiones()).toContain(sesion1);
    });

    test("Debe listar correctamente las sesiones creadas", () => {
        //const sesion1 = conferencia.crearSesion('Inteligencia Artificial', 'WORKSHOP', '2025-04-30');
        //const sesion2 = conferencia.crearSesion('Infraestructura', 'REGULAR', "2025-05-01");

        const sesiones = conferencia.listSesiones();

        expect(sesiones.length).toBe(2);
        expect(sesiones[0]).toBe(sesion1);
        expect(sesiones[1]).toBe(sesion2);
    });
});