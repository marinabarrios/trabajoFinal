/** todos los tests para la etapa de bidding */
const ComfyChair = require('../ComfyChair.js');
const Conferencias = require('../Conferencias.js');
const Autores = require('../Autores.js');
const Sesiones = require('../Sesiones.js');

let empresa;
let conferencia;
let autores;
let sesion;

beforeEach( () => {
    empresa = new ComfyChair();
    conferencia = new Conferencias();
    autores = new Autores();
    sesion = new Sesiones();

    // Mocks de métodos
    empresa.registrarUsuario = jest.fn().mockImplementation((tipo, nombre, afiliacion, email, contrasenia) => {
        const usuario = {
            _nombreUsuario: nombre,
            tipo,
            afiliacion,
            email,
            contrasenia,
            intereses: [], 
            crearArticulo: jest.fn().mockReturnValue({
                _id: 1,
                _titulo: 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
                _tipo: 'regular',
                _resumen: 'The purpose of the study is to investigate the impact of Artificial Intelligence.',
                _url: 'https://ieeexplore.ieee.org/document/9430234',
                _autores: [{ nombre: 'José Gonzalez' }, { nombre: 'Matias Lei' }],
                _coautor: 'Matias Lei',
                _fechaCreacion: new Date()
            }),
            enviarArticulo: jest.fn(),

            // Mock de expresarInteres con lógica para agregar o modificar intereses
            expresarInteres: jest.fn(function(sesion, articulo, tipoInteres) {
                // Buscar si ya existe un interés para ese artículo
                const existente = this.intereses.find(interes => interes.articuloId === articulo._id);
                if (existente) {
                    // Si existe, actualizar el tipo de interés
                    existente.tipoInteres = tipoInteres;
                } else {
                    // Si no existe, agregar un nuevo interés
                    this.intereses.push({ articuloId: articulo._id, tipoInteres });
                }
            }),

            // Mock de mostrarIntereses para devolver los intereses actuales
            mostrarIntereses: jest.fn(function() {
                return this.intereses;
            })
        };

        return usuario;
    });

    empresa.listChairs = jest.fn().mockReturnValue([{ _nombreUsuario: 'Juan Rodriguez' }]);
    empresa.listRevisores = jest.fn().mockReturnValue([{ _nombreUsuario: 'Maria Gonzalez' }, { _nombreUsuario: 'Juana Gómez' }]);
    empresa.listAutores = jest.fn().mockReturnValue([{ _nombreUsuario: 'José Gonzalez' }, { _nombreUsuario: 'Matias Lei' }, { _nombreUsuario: 'Leonardo Rey' }]);

    empresa.crearConferencia = jest.fn().mockImplementation((nombreConferencia, fechaInicio, fechaFin, chairs, revisores, autores) => {
        return {
            _nombreConferencia: nombreConferencia,
            fechaInicio,
            fechaFin,
            _chairs: chairs,
            _revisores: revisores,
            _autores: autores,
            crearSesion: jest.fn((tema, tipoSesion, deadlineRecepcion, estadoSesion) => {
                return {
                    _tema: tema,
                    tipoSesion,
                    deadlineRecepcion,
                    _estadoSesion: estadoSesion,
                    verificarDeadlineRecepcion: jest.fn(function () {
                        // Implementación de la verificación del deadline
                        if (new Date() > new Date(this.deadlineRecepcion)) {
                            this._estadoSesion = 'bidding';
                        }
                    }),
                    recibirArticulo: jest.fn(),
                    verArticulos: jest.fn().mockReturnValue([{
                        _id: 1,
                        _titulo: 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
                        _tipo: 'regular'
                    }])
                };
            })
        };
    });
});        

test("La fecha actual es superior al deadline, la Sesión pasa al estado de Bidding", () => {
    const jose = empresa.registrarUsuario('autor','José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
    const matias = empresa.registrarUsuario('autor','Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    const leo = empresa.registrarUsuario('autor','Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');
    const maria = empresa.registrarUsuario('revisor','Maria Gonzalez', 'UNNE', 'maria_gonzalez@gmail.com', '123456');
    const juana = empresa.registrarUsuario('revisor','Juana Gómez', 'UNLP', 'juana_gomez@gmail.com', '123456');
    const todosLosChairs = empresa.listChairs();
    const todosLosRevisores = empresa.listRevisores();
    const todosLosAutores = empresa.listAutores();
    const conferenciaInformatica = empresa.crearConferencia('Conferencia Informática', '2024-12-28', '2024-12-31',
                                                            todosLosChairs, todosLosRevisores,todosLosAutores);
    const sesionInteligencia = conferenciaInformatica.crearSesion('Inteligencia Artificial', 'regular',
                                                                  '2024-09-11', 'recepcion');
    /*const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
    'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence.',
    'https://ieeexplore.ieee.org/document/9430234',[jose, matias], null, matias, new Date()
    );
    jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);*/
    sesionInteligencia.verificarDeadlineRecepcion();
    expect(sesionInteligencia._estadoSesion).toBe('bidding');
});

test("Un revisor expresa su interés por un artículo", () => {
    const jose = empresa.registrarUsuario('autor','José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
    const matias = empresa.registrarUsuario('autor','Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    const leo = empresa.registrarUsuario('autor','Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');
    const maria = empresa.registrarUsuario('revisor','Maria Gonzalez', 'UNNE', 'maria_gonzalez@gmail.com', '123456');
    const juana = empresa.registrarUsuario('revisor','Juana Gómez', 'UNLP', 'juana_gomez@gmail.com', '123456');
    const todosLosChairs = empresa.listChairs();
    const todosLosRevisores = empresa.listRevisores();
    const todosLosAutores = empresa.listAutores();
    const conferenciaInformatica = empresa.crearConferencia('Conferencia Informática', '2024-07-28', '2024-07-31',
                                                            todosLosChairs, todosLosRevisores,todosLosAutores);
    const sesionInteligencia = conferenciaInformatica.crearSesion('Inteligencia Artificial', 'regular',
                                                                  '2024-08-15', 'recepcion');
    const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
    'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence.',
    'https://ieeexplore.ieee.org/document/9430234',[jose, matias], null, matias, new Date()
    );
    jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);
    const verTodosLosArticulosAprobadosSesionInteligencia = sesionInteligencia.verArticulos();
    maria.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
    const mostrarIntereses = maria.mostrarIntereses();
    expect(mostrarIntereses[0].tipoInteres).toBe('interesado');
});

test("Un revisor cambia su interés", () => {
    const jose = empresa.registrarUsuario('autor','José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
    const matias = empresa.registrarUsuario('autor','Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    const leo = empresa.registrarUsuario('autor','Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');
    const maria = empresa.registrarUsuario('revisor','Maria Gonzalez', 'UNNE', 'maria_gonzalez@gmail.com', '123456');
    const juana = empresa.registrarUsuario('revisor','Juana Gómez', 'UNLP', 'juana_gomez@gmail.com', '123456');
    const todosLosChairs = empresa.listChairs();
    const todosLosRevisores = empresa.listRevisores();
    const todosLosAutores = empresa.listAutores();
    const conferenciaInformatica = empresa.crearConferencia('Conferencia Informática', '2024-07-28', '2024-07-31',
                                                            todosLosChairs, todosLosRevisores,todosLosAutores);
    const sesionInteligencia = conferenciaInformatica.crearSesion('Inteligencia Artificial', 'regular',
                                                                  '2024-08-15', 'recepcion');
    const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
    'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence.',
    'https://ieeexplore.ieee.org/document/9430234',[jose, matias], null, matias, new Date()
    );
    jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);
    const verTodosLosArticulosAprobadosSesionInteligencia = sesionInteligencia.verArticulos();
    maria.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
    maria.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'quizas');
    const mostrarIntereses = maria.mostrarIntereses();
    expect(mostrarIntereses[0].tipoInteres).toEqual('quizas');
});
