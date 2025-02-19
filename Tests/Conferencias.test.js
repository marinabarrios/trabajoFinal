const Conferencias = require("../Conferencias");
const Sesiones = require("../Sesiones/Sesiones");
const Usuarios = require("../Usuarios/Usuarios");

describe("Conferencias", () => {
    let conferencia;

    beforeEach(() => {
       Usuarios.usuariosRegistrados = [
            { _nombreUsuario: 'Juan Rodriguez', _afiliacion: 'UNLP', _email: 'juan_rodriguez@gmail.com', _contrasenia: '123456', _roles: 'AUTOR'},
            { _nombreUsuario: 'José Gonzalez', _afiliacion: 'UNNE', _email: 'jose_gonzalez@gmail.com', _contrasenia: '123456', _roles: 'CHAIR'},
            { _nombreUsuario: 'Matias Lei', _afiliacion: 'UNAM', _email: 'matias_lei@gmail.com', _contrasenia: '123456', _roles: 'REVISOR'},
            { _nombreUsuario: 'Leonardo Rey', _afiliacion: 'UNAM', _email: 'leonardo_rey@gmail.com', _contrasenia: '123456', _roles: 'AUTOR'},
            { _nombreUsuario: 'Mateo Rey', _afiliacion: 'UNAM', _email: 'mateo_rey@gmail.com', _contrasenia: '123456', _roles: 'REVISOR'}
        ];

        conferencia = new Conferencias('Conferencia Informática', '2025-05-10', '2025-05-15');
    });

    test("Debe crear una conferencia correctamente", () => {
        expect(conferencia).toBeInstanceOf(Conferencias);
        expect(conferencia.nombreConferencia()).toBe('Conferencia Informática');
        expect(conferencia._fechaInicio).toBe('2025-05-10');
        expect(conferencia._fechaFin).toBe('2025-05-15');
        expect(conferencia.listSesiones()).toEqual([]); // No tiene sesiones al inicio
    });

    
    test("Debe asignar correctamente los organizadores y comité de revisores", () => {
        const organizadoresEsperados = ['José Gonzalez']; // CHAIR
        const comiteEsperado = ['Matias Lei', 'Mateo Rey']; // REVISORES

        expect(conferencia._organizadores.map(o => o.nombre)).toEqual(organizadoresEsperados);
        expect(conferencia._comite.map(c => c.nombre)).toEqual(comiteEsperado);
    });

    test("Debe listar correctamente organizadores y comité", () => {
        const listado = conferencia.listarOrganizadoresYComite();

        expect(listado).toEqual({
            organizadores: ['José Gonzalez'],
            comite: ['Matias Lei', 'Mateo Rey']
        });
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