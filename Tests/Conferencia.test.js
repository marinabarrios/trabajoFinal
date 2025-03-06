const Sesion = require("../Sesion/Sesion");
const Usuario = require("../Usuario/Usuario");
const { usuarios } = require("../__fixtures__/usuariosFixture"); 
const { sesionWfD, sesionRfD } = require("../__fixtures__/sesionesFixture");
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
        const comiteEsperado = ['Leonardo Rey', 'Carlos Lopez', 'Maria Gonzalez',
                                'Juana Gómez', 'Mara Gonzalez', 'Juan Gómez',
                                'Raúl Arce','Oscar Martín','Inés Martinez',
                                'Sonia Ruiz','Pedro Jimenez','Daniel Martinez', 'Luis Iglesias']; // REVISORES

        expect(instanciaConf1._organizadores.map(o => o.nombre)).toEqual(organizadoresEsperados);
        expect(instanciaConf1._comite.map(c => c.nombre)).toEqual(comiteEsperado);
    });

    test("Debe listar correctamente organizadores y comité", () => {
        const listado = instanciaConf1.listarOrganizadoresYComite();

        expect(listado).toEqual({
            organizadores: ['Matias Lei', 'Laura Díaz'],
            comite: ['Leonardo Rey', 'Carlos Lopez', 'Maria Gonzalez',
                     'Juana Gómez', 'Mara Gonzalez', 'Juan Gómez',
                     'Raúl Arce','Oscar Martín','Inés Martinez',
                     'Sonia Ruiz','Pedro Jimenez','Daniel Martinez', 'Luis Iglesias']
        });
    });
    

    test("Debe crear una sesión correctamente", () => {
        expect(sesionWfD).toBeInstanceOf(Sesion);
        expect(instanciaConf1.listSesiones()).toContain(sesionWfD);
    });

    test("Debe listar correctamente las sesiones creadas", () => {
        const sesiones = instanciaConf1.listSesiones();

        expect(sesiones.length).toBe(2);
        expect(sesiones[0]).toBe(sesionWfD);
        expect(sesiones[1]).toBe(sesionRfD);
    });
});