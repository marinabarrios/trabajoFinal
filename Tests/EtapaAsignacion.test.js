/** todos los tests para la etapa de asignacion */
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
                if (!articulo) {
                    throw new Error('El artículo proporcionado no es válido.');
                }
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
            }),

            // Mock de cambiarEstadoSesion con lógica para cambiar el estado de una sesión
            cambiarEstadoSesion: jest.fn(function(sesion, nuevoEstado) {
                if (sesion && nuevoEstado) {
                    sesion._estadoSesion = nuevoEstado;
                }
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

test("EL Chair cambia al estado de Asignación", () => {
    const juan = empresa.registrarUsuario('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
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
                                                                  '2024-08-15', 'recepcion');
    const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
    'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence.',
    'https://ieeexplore.ieee.org/document/9430234',[jose, matias], null, matias, new Date()
    );
    jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);
    const verTodosLosArticulosAprobadosSesionInteligencia = sesionInteligencia.verArticulos();
    maria.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
    juan.cambiarEstadoSesion(sesionInteligencia,'asignacion');
    expect(sesionInteligencia._estadoSesion).toContain('asignacion');
});

test("EL Chair asignó revisores y cada artículo debe tener asignado 3 revisores", () => {

    const juan = empresa.registrarUsuario('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    const jose = empresa.registrarUsuario('autor','José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
    const matias = empresa.registrarUsuario('autor','Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    const leo = empresa.registrarUsuario('autor','Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');
    const mariana = empresa.registrarUsuario('autor','Mariana Lei', 'UNAM', 'mariana_lei@gmail.com', '123456');
    const mateo = empresa.registrarUsuario('autor','Mateo Rey', 'UNAM', 'mateo_rey@gmail.com', '123456');
    const julian = empresa.registrarUsuario('autor','Julian Cotto', 'UBA', 'julian_cotto@gmail.com', '123456');
    const graciela = empresa.registrarUsuario('autor','Graciela Meza', 'UBA', 'graciela_meza@gmail.com', '123456');
    const maria = empresa.registrarUsuario('revisor','Maria Gonzalez', 'UNNE', 'maria_gonzalez@gmail.com', '123456');
    const juana = empresa.registrarUsuario('revisor','Juana Gómez', 'UNLP', 'juana_gomez@gmail.com', '123456');
    const mara = empresa.registrarUsuario('revisor','Mara Gonzalez', 'UNNE', 'mara_gonzalez@gmail.com', '123456');
    const juanG = empresa.registrarUsuario('revisor','Juan Gómez', 'UNLP', 'juan_gomez@gmail.com', '123456');
    const raul = empresa.registrarUsuario('revisor','Raúl Arce', 'UNNE', 'raul_arce@gmail.com', '123456');
    const oscar = empresa.registrarUsuario('revisor','Oscar Martín', 'UNLP', 'oscar_martin@gmail.com', '123456');
    const ines = empresa.registrarUsuario('revisor','Inés Martinez', 'UNNE', 'ines_martinez@gmail.com', '123456');
    const sonia = empresa.registrarUsuario('revisor','Sonia Ruiz', 'UNLP', 'sonia_ruiz@gmail.com', '123456');
    const pedro = empresa.registrarUsuario('revisor','Pedro Jimenez', 'UNLP', 'pedro_jimenez@gmail.com', '123456');
    const daniel = empresa.registrarUsuario('revisor','Daniel Martinez', 'UNNE', 'daniel_martinez@gmail.com', '123456');
    const luis = empresa.registrarUsuario('revisor','Luis Iglesias', 'UNLP', 'luis_iglesias@gmail.com', '123456');
    const todosLosChairs = empresa.listChairs();
    const todosLosRevisores = empresa.listRevisores();
    const todosLosAutores = empresa.listAutores();
    const conferenciaInformatica = empresa.crearConferencia('Conferencia Informática', '2024-07-28', '2024-07-31',
                                                            todosLosChairs, todosLosRevisores,todosLosAutores);
    const sesionInteligencia = conferenciaInformatica.crearSesion('Inteligencia Artificial', 'regular',
                                                                  '2024-08-15', 'recepcion');

    const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
                                                        'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence',
                                                        'https://ieeexplore.ieee.org/document/9430234',
                                                        [jose, matias], null, matias, new Date()
                                                        );
    const creativeIA = leo.crearArticulo(2, 'Creative AI in Software Project Management',
                                                        'regular', 'Software project management (SPM), which comprises planning, supervising, and keeping track of software projects...',
                                                        'https://ieeexplore.ieee.org/document/10425234',
                                                        [leo], null, leo, new Date()
                                                        );
    const innovationManagement = mariana.crearArticulo(3, 'Artificial Intelligence in the Innovation Management Systems',
                                                        'regular', 'In this paper the management of innovation processes and projects is studied, which is the basis for analyzing of factors affecting the complexity of the management process.',
                                                        'https://ieeexplore.ieee.org/document/10479688',
                                                        [mariana], null, mariana, new Date()
                                                        );
    const inclusiveness = mateo.crearArticulo(4, 'Evaluating the Inclusiveness of Artificial Intelligence Software',
                                            'regular', 'The escalating integration of Artificial Intelligence (AI) in various domains, especially Project Management (PM).',
                                            'https://ieeexplore.ieee.org/document/10467463',
                                            [mateo], null, mateo, new Date()
                                            );
    const evaluating = matias.crearArticulo(5, 'Evaluating the Artificial Intelligence Software',
                                            'regular', 'The escalating integration of Artificial Intelligence (AI) in various domains, especially Project Management (PM).',
                                            'https://ieeexplore.ieee.org/document/10467463',
                                            [matias], null, matias, new Date()
                                            );
    const escalating = julian.crearArticulo(6, 'Escalating the Artificial Intelligence Software',
                                            'regular', 'The escalating integration of Artificial Intelligence (AI) in various domains, especially Project Management (PM).',
                                            'https://ieeexplore.ieee.org/document/10467463',
                                            [julian], null, julian, new Date()
                                            );
    const integration = graciela.crearArticulo(7, 'Integration the Artificial Intelligence Software',
                                            'regular', 'The escalating integration of Artificial Intelligence (AI) in various domains, especially Project Management (PM).',
                                            'https://ieeexplore.ieee.org/document/10467463',
                                            [graciela], null, graciela, new Date()
                                            );

    jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);
    leo.enviarArticulo(sesionInteligencia, creativeIA);
    mariana.enviarArticulo(sesionInteligencia, innovationManagement);
    mateo.enviarArticulo(sesionInteligencia, inclusiveness);
    matias.enviarArticulo(sesionInteligencia, evaluating);
    julian.enviarArticulo(sesionInteligencia, escalating);
    graciela.enviarArticulo(sesionInteligencia, integration);

    const verTodosLosArticulosAprobadosSesionInteligencia = sesionInteligencia.verArticulos();

    maria.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
    maria.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 3), 'no interesado');
    maria.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'quizas');
    juana.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 2), 'no interesado');
    juana.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 5), 'no interesado');
    juana.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6), 'quizas');
    mara.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'quizas');
    mara.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'interesado');
    mara.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6), 'no interesado');
    mara.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 7), 'quizas');
    juanG.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
    juanG.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'quizas');
    juanG.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6), 'interesado');
    juanG.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 7), 'no interesado');
    raul.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 3), 'interesado');
    raul.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'quizas');
    raul.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 2), 'quizas');
    raul.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 5), 'no interesado');
    oscar.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
    oscar.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 2), 'quizas');
    oscar.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 5), 'no interesado');
    oscar.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6), 'quizas');
    ines.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
    ines.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 3), 'no interesado');
    ines.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'quizas');
    ines.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 5), 'interesado');
    ines.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 7), 'no interesado');
    sonia.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 3), 'interesado');
    sonia.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'quizas');
    sonia.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6), 'quizas');
    pedro.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
    daniel.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'quizas');
    daniel.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'quizas');
    luis.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 2), 'no interesado');
    luis.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 7), 'interesado');
    const todosLosInteresesSesionInteligencia = mostrarRevisorIntereses1.concat(mostrarRevisorIntereses2, mostrarRevisorIntereses3, mostrarRevisorIntereses4, mostrarRevisorIntereses5, mostrarRevisorIntereses6, mostrarRevisorIntereses7);

    juan.cambiarEstadoSesion(sesionInteligencia,'asignacion');

    const todosLosArticulos = juan.asignarRevisores(sesionInteligencia, todosLosInteresesSesionInteligencia, todosLosRevisores);
    const verAsignaciones = sesionInteligencia.verAsignaciones();
    verAsignaciones.forEach((asignacion) => {
        expect(asignacion.revisor.length).toBe(3);
    });
});