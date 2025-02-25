const Sesion = require("../Sesion/Sesion");
const Usuario = require("../Usuario/Usuario");
const { usuarios } = require("../__fixtures__/usuariosFixture"); 
const { sesion1, sesion2 } = require("../__fixtures__/sesionesFixture");
const { instanciaConf1 } = require("../__fixtures__/conferenciasFixture"); 

describe("Conferencias", () => {

    beforeEach(() => {
        Usuario.usuariosRegistrados = [...usuarios];
    });

    test("Debe crear una conferencia correctamente", () => {
        expect(instanciaConf1.nombreConferencia()).toBe('Conferencia Informática');
        expect(instanciaConf1._fechaInicio).toBe('2025-02-20');
        expect(instanciaConf1._fechaFin).toBe('2025-02-28');
    });

    
    test("Debe asignar correctamente los organizadores y comité de revisores", () => {
        const organizadoresEsperados = ['Matias Lei', 'Laura Díaz']; // CHAIR
        const comiteEsperado = ['Leonardo Rey', 'Carlos Lopez']; // REVISORES

        expect(instanciaConf1._organizadores.map(o => o.nombre)).toEqual(organizadoresEsperados);
        expect(instanciaConf1._comite.map(c => c.nombre)).toEqual(comiteEsperado);
    });

    test("Debe listar correctamente organizadores y comité", () => {
        const listado = instanciaConf1.listarOrganizadoresYComite();

        expect(listado).toEqual({
            organizadores: ['Matias Lei', 'Laura Díaz'],
            comite: ['Leonardo Rey', 'Carlos Lopez']
        });
    });
    

    test("Debe crear una sesión correctamente", () => {
        expect(sesion1).toBeInstanceOf(Sesion);
        expect(instanciaConf1.listSesiones()).toContain(sesion1);
    });

    test("Debe listar correctamente las sesiones creadas", () => {
        const sesiones = instanciaConf1.listSesiones();

        expect(sesiones.length).toBe(2);
        expect(sesiones[0]).toBe(sesion1);
        expect(sesiones[1]).toBe(sesion2);
    });
});