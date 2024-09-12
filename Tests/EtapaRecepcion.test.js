/** todos los tests para la creación de conferencia, sesión, usuario y etapa de recepción */
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

    empresa.registrarUsuario = jest.fn();
    empresa.listUsuarios = jest.fn();
    empresa.listChairs = jest.fn();
    empresa.listRevisores = jest.fn();
    empresa.listAutores = jest.fn();
    empresa.crearConferencia = jest.fn();
    conferencia.crearSesion = jest.fn();
    autores.crearArticulo = jest.fn();
    autores.listArticulosCreados = jest.fn();
    autores.enviarArticulo = jest.fn();
    sesion.recibirArticulo = jest.fn();
    autores.obtenerNotificaciones = jest.fn();
});

test("Se registró al usuario correctamente", () => {
    empresa.listUsuarios.mockReturnValue([
        { _nombreUsuario: 'Juan Rodriguez' }
    ]);
    empresa.registrarUsuario('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');

    expect(empresa.registrarUsuario).toHaveBeenCalledWith('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
});

test("Cantidad de usuarios registrados", () => {
    empresa.listUsuarios.mockReturnValue([
        { _nombreUsuario: 'Juan Rodriguez' },
        { _nombreUsuario: 'José Gonzalez' },
        { _nombreUsuario: 'Matias Lei' }
    ]);
    empresa.registrarUsuario('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    empresa.registrarUsuario('autor','José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
    empresa.registrarUsuario('autor','Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');

    expect(empresa.registrarUsuario).toHaveBeenCalledTimes(3);
    expect(empresa.listUsuarios().length).toBe(3);
});

test("No se puede registrar dos veces el mismo usuario", () => {
    empresa.listUsuarios.mockReturnValue([
        { _nombreUsuario: 'Juan Rodriguez' },
        { _nombreUsuario: 'Juan Rodriguez' }
    ]);
    //simulo comportamiento de excepción
    empresa.registrarUsuario.mockImplementation((tipo, nombre, afiliacion, email, contrasenia) => {
        const usuarios = empresa.listUsuarios();
        const usuarioExistente = usuarios.find(u => u._nombreUsuario === nombre);
      
        if (usuarioExistente) {
          throw new Error('Usuario ya registrado');
        } else {
          const nuevoUsuario = { _nombreUsuario: nombre, tipo, afiliacion, email, contrasenia};
          usuarios.push(nuevoUsuario);
          return nuevoUsuario;
        }
    });

    expect(() => {
        empresa.registrarUsuario('autor', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    }).toThrow('Usuario ya registrado');
});

test("Se crea una Conferencia", () => {
    empresa.registrarUsuario.mockImplementation((tipo, nombre, afiliacion, email, contrasenia) =>{
        const nuevoUsuario = { _nombreUsuario: nombre, tipo, afiliacion, email, contrasenia};
        return nuevoUsuario;
    });
    empresa.listChairs.mockReturnValue([
        { _nombreUsuario: 'Juan Rodriguez'}
    ]);
    empresa.listAutores.mockReturnValue([
        { _nombreUsuario: 'José Gonzalez' },
        { _nombreUsuario: 'Matias Lei' },
        { _nombreUsuario: 'Leonardo Rey' }
    ]);
    empresa.listRevisores.mockReturnValue([
        { _nombreUsuario: 'Maria Gonzalez' },
        { _nombreUsuario: 'Juana Gómez' }
    ]);
    empresa.crearConferencia.mockImplementation((nombreConferencia, fechaInicio, fechaFin, chairs, revisores, autores) => {
        return {
            _nombreConferencia: nombreConferencia, 
            fechaInicio, 
            fechaFin, 
            _chairs: chairs, 
            _revisores: revisores, 
            _autores: autores};
    });
    empresa.registrarUsuario('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    empresa.registrarUsuario('autor','José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
    empresa.registrarUsuario('autor','Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    empresa.registrarUsuario('autor','Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');
    empresa.registrarUsuario('revisor','Maria Gonzalez', 'UNNE', 'maria_gonzalez@gmail.com', '123456');
    empresa.registrarUsuario('revisor','Juana Gómez', 'UNLP', 'juana_gomez@gmail.com', '123456');
    const todosLosChairs = empresa.listChairs();
    const todosLosRevisores = empresa.listRevisores();
    const todosLosAutores = empresa.listAutores();
    const nuevaConferencia = empresa.crearConferencia('Conferencia Informática', '2024-12-28', '2024-12-31',
                                                      todosLosChairs, todosLosRevisores,todosLosAutores);
    expect(nuevaConferencia._nombreConferencia).toBe('Conferencia Informática');
    expect(nuevaConferencia._chairs).toEqual(todosLosChairs);
    expect(nuevaConferencia._revisores).toEqual(todosLosRevisores);
    expect(nuevaConferencia._autores).toEqual(todosLosAutores);
});

test("Se crea una Sesión", () => {
    empresa.registrarUsuario.mockImplementation((tipo, nombre, afiliacion, email, contrasenia) =>{
        const nuevoUsuario = { _nombreUsuario: nombre, tipo, afiliacion, email, contrasenia};
        return nuevoUsuario;
    });
    empresa.listChairs.mockReturnValue([
        { _nombreUsuario: 'Juan Rodriguez'}
    ]);
    empresa.listAutores.mockReturnValue([
        { _nombreUsuario: 'José Gonzalez' },
        { _nombreUsuario: 'Matias Lei' },
        { _nombreUsuario: 'Leonardo Rey' }
    ]);
    empresa.listRevisores.mockReturnValue([
        { _nombreUsuario: 'Maria Gonzalez' },
        { _nombreUsuario: 'Juana Gómez' }
    ]);
    empresa.crearConferencia.mockImplementation((nombreConferencia, fechaInicio, fechaFin, chairs, revisores, autores) => {
        return {
            _nombreConferencia: nombreConferencia,
            fechaInicio,
            fechaFin,
            _chairs: chairs,
            _revisores: revisores,
            _autores: autores,
            crearSesion: jest.fn((tema, tipoSesion, deadlineRecepcion, estadoSesion, tipoDeEvaluacion) => {
                return {
                    _tema: tema,
                    tipoSesion,
                    deadlineRecepcion,
                    estadoSesion,
                    tipoDeEvaluacion
                };
            }),
            listSesiones: jest.fn(() => {
                return [{
                    _tema: 'Inteligencia Artificial',
                    tipoSesion: 'regular',
                    deadlineRecepcion: '2024-08-15',
                    estadoSesion: 'recepcion'
                }];
            })
        };
    });
    const todosLosChairs = empresa.listChairs();
    const todosLosRevisores = empresa.listRevisores();
    const todosLosAutores = empresa.listAutores();
    const conferenciaInformatica = empresa.crearConferencia('Conferencia Informática', '2024-07-28', '2024-07-31',
                                                            todosLosChairs, todosLosRevisores,todosLosAutores);
    const sesionInteligencia = conferenciaInformatica.crearSesion('Inteligencia Artificial', 'regular',
                                                                  '2024-08-15', 'recepcion');
    expect(sesionInteligencia._tema).toBe('Inteligencia Artificial');
});

test("Un autor creó un artículo", () => {
    empresa.registrarUsuario.mockImplementation((tipo, nombre, afiliacion, email, contrasenia) =>{
        const nuevoUsuario = { _nombreUsuario: nombre, tipo, afiliacion, email, contrasenia, crearArticulo: jest.fn(), listArticulosCreados: jest.fn()};
        return nuevoUsuario;
    });
    empresa.listChairs.mockReturnValue([ { _nombreUsuario: 'Juan Rodriguez'} ]);
    empresa.listAutores.mockReturnValue([ { _nombreUsuario: 'José Gonzalez' }, { _nombreUsuario: 'Matias Lei' }, { _nombreUsuario: 'Leonardo Rey' }]);
    empresa.listRevisores.mockReturnValue([ { _nombreUsuario: 'Maria Gonzalez' },{ _nombreUsuario: 'Juana Gómez' } ]);
    empresa.crearConferencia.mockImplementation((nombreConferencia, fechaInicio, fechaFin, chairs, revisores, autores) => {
        return {
            _nombreConferencia: nombreConferencia,
            fechaInicio,
            fechaFin,
            _chairs: chairs,
            _revisores: revisores,
            _autores: autores,
            crearSesion: jest.fn((tema, tipoSesion, deadlineRecepcion, estadoSesion, tipoDeEvaluacion) => {
                return {
                    _tema: tema,
                    tipoSesion,
                    deadlineRecepcion,
                    estadoSesion,
                    tipoDeEvaluacion
                };
            }),
            listSesiones: jest.fn(() => {
                return [{
                    _tema: 'Inteligencia Artificial',
                    tipoSesion: 'regular',
                    deadlineRecepcion: '2024-09-15',
                    estadoSesion: 'recepcion'
                }];
            })
        };
    });
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
                                                                  '2024-09-15', 'recepcion');
    const futureOfProjectManagement = {
        _id: 1,
        _titulo: 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
        _tipo: 'regular',
        _resumen: 'The purpose of the study is to investigate the impact of Artificial Intelligence on the future of Project Management. This study provides detailed conceptual information about Artificial Intelligence and different perspectives. Artificial Intelligence is defined as the new technical discipline, which would develop an application system, a technological method in order to simulate the expansion and extension of human intelligence.',
        _url: 'https://ieeexplore.ieee.org/document/9430234',
        _autores: [jose, matias],
        _coautor: matias,
        _fechaCreacion: new Date()
    };
    jose.crearArticulo.mockReturnValue(futureOfProjectManagement);

    jose.listArticulosCreados.mockReturnValue([futureOfProjectManagement]);

    const articuloCreado = jose.crearArticulo(
        1, 
        'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
        'regular', 
        'The purpose of the study is to investigate the impact of Artificial Intelligence on the future of Project Management. This study provides detailed conceptual information about Artificial Intelligence and different perspectives. Artificial Intelligence is defined as the new technical discipline, which would develop an application system, a technological method in order to simulate the expansion and extension of human intelligence.',
        'https://ieeexplore.ieee.org/document/9430234', 
        [jose, matias], 
        null, 
        matias, 
        new Date()
    );

    const articulos = jose.listArticulosCreados();
    expect(articulos).toEqual(expect.arrayContaining([futureOfProjectManagement]));
});

test("La sesión rechaza el artículo y envía un mensaje al autor que recibe las notificaciones", () => {
    empresa.registrarUsuario.mockImplementation((tipo, nombre, afiliacion, email, contrasenia) =>{
        const nuevoUsuario = { _nombreUsuario: nombre, tipo, afiliacion, email, contrasenia, 
                            crearArticulo: jest.fn(), listArticulosCreados: jest.fn(), enviarArticulo: jest.fn(),
                            obtenerNotificaciones: jest.fn().mockReturnValue(['Artículo rechazado'])};
        return nuevoUsuario;
    });
    empresa.listChairs.mockReturnValue([ { _nombreUsuario: 'Juan Rodriguez'} ]);
    empresa.listAutores.mockReturnValue([ { _nombreUsuario: 'José Gonzalez' }, { _nombreUsuario: 'Matias Lei' }, { _nombreUsuario: 'Leonardo Rey' }]);
    empresa.listRevisores.mockReturnValue([ { _nombreUsuario: 'Maria Gonzalez' },{ _nombreUsuario: 'Juana Gómez' } ]);
    empresa.crearConferencia.mockImplementation((nombreConferencia, fechaInicio, fechaFin, chairs, revisores, autores) => {
        return {
            _nombreConferencia: nombreConferencia,
            fechaInicio,
            fechaFin,
            _chairs: chairs,
            _revisores: revisores,
            _autores: autores,
            crearSesion: jest.fn((tema, tipoSesion, deadlineRecepcion, estadoSesion, tipoDeEvaluacion) => {
                return {
                    _tema: tema,
                    tipoSesion,
                    deadlineRecepcion,
                    estadoSesion,
                    tipoDeEvaluacion,
                    recibirArticulo: jest.fn(),
                };
            }),
            listSesiones: jest.fn(() => {
                return [{
                    _tema: 'Inteligencia Artificial',
                    tipoSesion: 'regular',
                    deadlineRecepcion: '2024-09-15',
                    estadoSesion: 'recepcion'
                }];
            })
        };
    });
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
                                                                  '2024-09-15', 'recepcion');
    const futureOfProjectManagement = {
        _id: 1,
        _titulo: 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
        _tipo: 'regular',
        _resumen: 'The purpose of the study is to investigate the impact of Artificial Intelligence on the future of Project Management. This study provides detailed conceptual information about Artificial Intelligence and different perspectives. Artificial Intelligence is defined as the new technical discipline, which would develop an application system, a technological method in order to simulate the expansion and extension of human intelligence.',
        _url: 'https://ieeexplore.ieee.org/document/9430234',
        _autores: [jose, matias],
        _coautor: matias,
        _fechaCreacion: new Date()
    };
    jose.crearArticulo.mockReturnValue(futureOfProjectManagement);

    jose.listArticulosCreados.mockReturnValue([futureOfProjectManagement]);

    const articuloCreado = jose.crearArticulo(
        1,
        'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
        'regular',
        'The purpose of the study is to investigate the impact of Artificial Intelligence on the future of Project Management. This study provides detailed conceptual information about Artificial Intelligence and different perspectives. Artificial Intelligence is defined as the new technical discipline, which would develop an application system, a technological method in order to simulate the expansion and extension of human intelligence.',
        'https://ieeexplore.ieee.org/document/9430234',
        [jose, matias],
        null,
        matias,
        new Date()
    );

    jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);
    sesionInteligencia.recibirArticulo(futureOfProjectManagement);
    const mensaje = matias.obtenerNotificaciones();
    expect(mensaje).not.toHaveLength(0);
});