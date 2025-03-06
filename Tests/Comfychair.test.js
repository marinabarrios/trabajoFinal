const ComfyChair = require('../ComfyChair');
const Conferencia = require('../Conferencia');
const { conferencias } = require('../__fixtures__/conferenciasFixture');

describe('ComfyChair', () => {
    let comfyChair;

    beforeEach(() => {
        // Creo una nueva instancia antes de cada test
        comfyChair = new ComfyChair();
    });

    test('Debe crear una conferencia correctamente', () => {
        const confDatos = conferencias[0];
        const conferencia = comfyChair.crearConferencia(confDatos.nombreConferencia, confDatos.fechaInicio, confDatos.fechaFin);

        expect(conferencia).toBeInstanceOf(Conferencia);
        expect(comfyChair.listConferencias()).toContain(conferencia);
        expect(conferencia.nombreConferencia()).toBe('Conferencia Informática');
    });

    test('Debe listar correctamente las conferencias creadas', () => {
        conferencias.forEach(conf => comfyChair.crearConferencia(conf.nombreConferencia, conf.fechaInicio, conf.fechaFin));
        const conferencias_ = comfyChair.listConferencias();
        expect(conferencias_.length).toBe(2);
        expect(conferencias_[0].nombreConferencia()).toBe('Conferencia Informática');
        expect(conferencias_[1].nombreConferencia()).toBe('Conferencia Robótica');
    });
});