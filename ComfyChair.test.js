const ComfyChair = require('./ComfyChair.js');

let empresa;

beforeEach( () => {
    empresa = new ComfyChair();    
});

test("Se registró al usuario correctamente", () => {
    empresa.registrarUsuario('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    expect(empresa.listUsuarios()[0]['_nombreUsuario']).toEqual('Juan Rodriguez');  
});

test("Cantidad de usuarios registrados", () => {
    empresa.registrarUsuario('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    empresa.registrarUsuario('autor','José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
    empresa.registrarUsuario('autor','Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    const usuarios = empresa.listUsuarios();
    expect(usuarios.length).toBe(3);
});

test("No se puede registrar dos veces el mismo usuario", () => {
    const juan = empresa.registrarUsuario('autor','Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    const juanr = empresa.registrarUsuario('autor','Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    expect(juan).toEqual(juanr);
});

test("Se crea una Conferencia", () => {
    const juan = empresa.registrarUsuario('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    const jose = empresa.registrarUsuario('autor','José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
    const matias = empresa.registrarUsuario('autor','Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    const leo = empresa.registrarUsuario('autor','Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');
    const maria = empresa.registrarUsuario('revisor','Maria Gonzalez', 'UNNE', 'maria_gonzalez@gmail.com', '123456');
    const juana = empresa.registrarUsuario('revisor','Juana Gómez', 'UNLP', 'juana_gomez@gmail.com', '123456');
    const todosLosChairs = empresa.listChairs();
    const todosLosRevisores = empresa.listRevisores();
    const todosLosAutores = empresa.listAutores();
    const nuevaConferencia = empresa.crearConferencia('Conferencia Informática', '2024-07-28', '2024-07-31',
                                                      todosLosChairs, todosLosRevisores,todosLosAutores);
    expect(nuevaConferencia._nombreConferencia).toBe('Conferencia Informática');
});

test("Se crea una Sesión", () => {
    const juan = empresa.registrarUsuario('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
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
    const sesiones = conferenciaInformatica.listSesiones();
    expect(sesiones).toContain(sesionInteligencia);
});

test("Un autor creó un artículo", () => {
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
    'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence on the future of Project Management. This study provides detailed conceptual information about Artificial Intelligence and different perspectives. Artificial Intelligence is defined as the new technical discipline, which would develop an application system, a technological method in order to simulate the expansion and extension of human intelligence.',
    'https://ieeexplore.ieee.org/document/9430234',[jose, matias], null, matias, new Date()
    );
    const articulos = jose.listArticulosCreados();
    expect(articulos).toContain(futureOfProjectManagement);
});

test("La sesión recibe un artículo Regular creado", () => {
    const jose = empresa.registrarUsuario('autor','José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
    const matias = empresa.registrarUsuario('autor','Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    const leo = empresa.registrarUsuario('autor','Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');
    const maria = empresa.registrarUsuario('revisor','Maria Gonzalez', 'UNNE', 'maria_gonzalez@gmail.com', '123456');
    const juana = empresa.registrarUsuario('revisor','Juana Gómez', 'UNLP', 'juana_gomez@gmail.com', '123456');
    const todosLosChairs = empresa.listChairs();
    const todosLosRevisores = empresa.listRevisores();
    const todosLosAutores = empresa.listAutores();
    const conferenciaInformatica = empresa.crearConferencia('Conferencia Informática', '2024-10-28', '2024-10-31',
                                                            todosLosChairs, todosLosRevisores,todosLosAutores);
    const sesionInteligencia = conferenciaInformatica.crearSesion('Inteligencia Artificial', 'regular',
                                                                  '2024-08-28', 'recepcion');
    const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
    'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence.',
    'https://ieeexplore.ieee.org/document/9430234',[jose, matias], null, matias, new Date()
    );
    jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);
    const articulos = sesionInteligencia.obtenerArticulos();

    expect(articulos).toContain(futureOfProjectManagement);
});

test("La sesión sólo admite artículos regulares, por eso no recibe un Poster", () => {
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
    const sesionInteligencia = conferenciaInformatica.crearSesion('Inteligencia Artificial', 'poster',
                                                                  '2024-08-18', 'recepcion');
    const futureOfProjectManagement = leo.crearArticulo(2, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
    'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence.',
    'https://ieeexplore.ieee.org/document/9430234',[leo], null, leo, new Date()
    );
    leo.enviarArticulo(sesionInteligencia, futureOfProjectManagement);
    const mensaje = leo.obtenerNotificaciones();
    expect(mensaje).not.toHaveLength(0); 
});

test("La sesión rechaza el artículo y envía un mensaje al autor que recibe las notificaciones", () => {
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
                                                                  '2024-08-18', 'recepcion');
    const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
    'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence on the future of Project Management. This study provides detailed conceptual information about Artificial Intelligence and different perspectives. Artificial Intelligence is defined as the new technical discipline, which would develop an application system, a technological method in order to simulate the expansion and extension of human intelligence.',
    'https://ieeexplore.ieee.org/document/9430234',[jose, matias], null, matias, new Date()
    );
    jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);
    const mensaje = matias.obtenerNotificaciones();
    expect(mensaje).not.toHaveLength(0); 
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
    const conferenciaInformatica = empresa.crearConferencia('Conferencia Informática', '2024-07-28', '2024-07-31',
                                                            todosLosChairs, todosLosRevisores,todosLosAutores);
    const sesionInteligencia = conferenciaInformatica.crearSesion('Inteligencia Artificial', 'regular',
                                                                  '2024-08-15', 'recepcion');
    const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
    'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence.',
    'https://ieeexplore.ieee.org/document/9430234',[jose, matias], null, matias, new Date()
    );
    jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);
    expect(sesionInteligencia._estadoSesion).toBe('bidding');
});