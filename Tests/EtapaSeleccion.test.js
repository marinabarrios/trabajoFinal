const ComfyChair = require('../ComfyChair.js');
/** todos los tests para la etapa de recepción */
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
    const articulos = jose.listArticulosCreados();

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
    juan.cambiarEstadoSesion(sesionInteligencia,'asignacion');
    expect(sesionInteligencia._estadoSesion).toContain('asignacion');
});

test("EL Chair asignó revisores y cada artículo debe tener asignado 3 revisores", () => {
    /**  REGISTRO USUARIOS */
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
    /** UN AUTOR CREA UN ARTICULO PARA LA SESION INTELIGENCIA */
    const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
                                                        'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence',
                                                        'https://ieeexplore.ieee.org/document/9430234',
                                                        [jose, matias], null, matias, new Date()
                                                        );
    const creativeIA = leo.crearArticulo(2, 'Creative AI in Software Project Management',
                                                        'regular', 'Software project management (SPM), which comprises planning, supervising, and keeping track of software projects, is a sophisticated art. However, the complexity and needs of modern software development projects are usually impossible for existing SPM methodologies to handle. The research paper investigates how business process reengineering (BPR) and the strategic application of artificial intelligence (AI) may enhance the effectiveness, quality, and competitiveness of software development processes. The development of artificial intelligence (AI) has the potential to transform project management practices by automating operations, enabling project analytics, and offering intelligent recommendations. This paper proposes a framework for managing agile projects, which are gaining popularity due to their speedy value delivery and minimal risk of project failure. Just a few examples of how AI might be incorporated into project management include automating administrative tasks, providing data-driven risk predictions, simplifying project planning, and producing actionable insights. Software development is one of several businesses that has benefited from the popularity of Scrum and other agile project management methodologies.',
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
    const creativeIA2 = leo.crearArticulo(2, 'Creative AI in Software Project Management',
                                                        'regular', 'Software project management (SPM), which comprises planning, supervising, and keeping track of software projects...',
                                                        'https://ieeexplore.ieee.org/document/10425234',
                                                        [leo], null, leo, new Date()
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
    /** EL AUTOR ENVIA EL ARTICULO A LA SESION INTELIGENCIA*/
    jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);//pasa la validacion
    leo.enviarArticulo(sesionInteligencia, creativeIA);//no pasa la validacion
    mariana.enviarArticulo(sesionInteligencia, innovationManagement);//pasa la validacion
    mateo.enviarArticulo(sesionInteligencia, inclusiveness);//pasa la validacion
    matias.enviarArticulo(sesionInteligencia, evaluating);//pasa la validacion
    julian.enviarArticulo(sesionInteligencia, escalating);//pasa la validacion
    graciela.enviarArticulo(sesionInteligencia, integration);//pasa la validacion
    leo.enviarArticulo(sesionInteligencia, creativeIA2);//vuelve a enviar el articulo y pasa la validacion
    /** VERIFICO EL ESTADO DE LA SESION */
    const estadoDeLaSesionInt = sesionInteligencia.verificarDeadlineRecepcion();
    /** BUSCO LOS ARTICULOS DE CADA SESIÓN EN LOS ARCHIVOS QUE SE GENERARON */
    const verTodosLosArticulosAprobadosSesionInteligencia = sesionInteligencia.verArticulos();
    /** UN REVISOR EXPRESA SU INTERES */
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
    /** EL CHAIR CAMBIA EL ESTADO DE LA SESION DE BIDDING A ASIGNACION */
    juan.cambiarEstadoSesion(sesionInteligencia,'asignacion');
    /** ASIGNAR REVISORES */
    const todosLosArticulos = juan.asignarRevisores(sesionInteligencia, todosLosInteresesSesionInteligencia, todosLosRevisores);
    const verAsignaciones = sesionInteligencia.verAsignaciones();
    verAsignaciones.forEach((asignacion) => {
        expect(asignacion.revisor.length).toBe(3);
    });
});