const ComfyChair = require('../ComfyChair.js');
const Conferencias = require('../Conferencias.js');

describe('ComfyChair', () => {
    let comfyChair;

    beforeEach(() => {
        // Creo una nueva instancia antes de cada test
        comfyChair = new ComfyChair();
    });

    test('Debe crear una conferencia correctamente', () => {
        const conferencia = comfyChair.crearConferencia('Conferencia Informática', '2025-05-10', '2025-05-15');

        expect(conferencia).toBeInstanceOf(Conferencias);
        expect(comfyChair.listConferencias()).toContain(conferencia);
        expect(conferencia.nombreConferencia()).toBe('Conferencia Informática');
    });

    test('Debe listar correctamente las conferencias creadas', () => {
        comfyChair.crearConferencia('Conferencia Informática', '2025-05-10', '2025-05-15');
        comfyChair.crearConferencia('Conferencia Robótica', '2025-06-01', '2025-06-05');

        const conferencias = comfyChair.listConferencias();
        expect(conferencias.length).toBe(2);
        expect(conferencias[0].nombreConferencia()).toBe('Conferencia Informática');
        expect(conferencias[1].nombreConferencia()).toBe('Conferencia Robótica');
    });
});