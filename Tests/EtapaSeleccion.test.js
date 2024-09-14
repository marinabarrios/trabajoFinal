/** todos los tests para la Etapa de Selección */
const ComfyChair = require('../ComfyChair.js');
const PorcentajeDeAceptados = require('../PorcentajeDeAceptados.js');
const PuntajeMinimo = require('../PuntajeMinimo.js');

let empresa;
let juan; let jose; let matias; let leo; let mariana; let mateo;
let julian; let graciela; let maria; let juana; let mara; let juanG;
let raul; let oscar; let ines; let sonia; let pedro; let daniel; let luis;
let todosLosChairs; let todosLosRevisores; let todosLosAutores;
let conferenciaInformatica; let estrategiaPorcentaja;
let estrategiaPuntaje; let estrategiasPorTipo;

beforeEach( () => {
    empresa = new ComfyChair();

    //Registro de usuarios
    juan = empresa.registrarUsuario('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
    jose = empresa.registrarUsuario('autor','José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
    matias = empresa.registrarUsuario('autor','Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
    leo = empresa.registrarUsuario('autor','Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');
    mariana = empresa.registrarUsuario('autor','Mariana Lei', 'UNAM', 'mariana_lei@gmail.com', '123456');
    mateo = empresa.registrarUsuario('autor','Mateo Rey', 'UNAM', 'mateo_rey@gmail.com', '123456');
    julian = empresa.registrarUsuario('autor','Julian Cotto', 'UBA', 'julian_cotto@gmail.com', '123456');
    graciela = empresa.registrarUsuario('autor','Graciela Meza', 'UBA', 'graciela_meza@gmail.com', '123456');
    maria = empresa.registrarUsuario('revisor','Maria Gonzalez', 'UNNE', 'maria_gonzalez@gmail.com', '123456');
    juana = empresa.registrarUsuario('revisor','Juana Gómez', 'UNLP', 'juana_gomez@gmail.com', '123456');
    mara = empresa.registrarUsuario('revisor','Mara Gonzalez', 'UNNE', 'mara_gonzalez@gmail.com', '123456');
    juanG = empresa.registrarUsuario('revisor','Juan Gómez', 'UNLP', 'juan_gomez@gmail.com', '123456');
    raul = empresa.registrarUsuario('revisor','Raúl Arce', 'UNNE', 'raul_arce@gmail.com', '123456');
    oscar = empresa.registrarUsuario('revisor','Oscar Martín', 'UNLP', 'oscar_martin@gmail.com', '123456');
    ines = empresa.registrarUsuario('revisor','Inés Martinez', 'UNNE', 'ines_martinez@gmail.com', '123456');
    sonia = empresa.registrarUsuario('revisor','Sonia Ruiz', 'UNLP', 'sonia_ruiz@gmail.com', '123456');
    pedro = empresa.registrarUsuario('revisor','Pedro Jimenez', 'UNLP', 'pedro_jimenez@gmail.com', '123456');
    daniel = empresa.registrarUsuario('revisor','Daniel Martinez', 'UNNE', 'daniel_martinez@gmail.com', '123456');
    luis = empresa.registrarUsuario('revisor','Luis Iglesias', 'UNLP', 'luis_iglesias@gmail.com', '123456');
    todosLosChairs = empresa.listChairs();
    todosLosRevisores = empresa.listRevisores();
    todosLosAutores = empresa.listAutores();

    //Creación de la Conferencia
    conferenciaInformatica = empresa.crearConferencia('Conferencia Informática', '2024-12-28', '2024-12-31',
                                   todosLosChairs, todosLosRevisores,todosLosAutores);
    //defino valores para la estrategia de corte fijo/
    estrategiaPorcentaja = new PorcentajeDeAceptados(0.3); //Acepta el 30% de los artículos

    //defino valores para la estrategia de puntaje mínimo /
    estrategiaPuntaje = new PuntajeMinimo(1); //Acepta artículos con puntaje promedio >= 1

    //defino valores por tipo de articulo para cuando se trata de un workshop
    estrategiasPorTipo = {
        poster: new PorcentajeDeAceptados(0.2), // Acepta el 20% de los poster
        regular: new PuntajeMinimo(0.5) // Puntaje mínimo de 0.5 para artículos regulares
    };
});

test('Se realiza la Selección de los archivos utilizando la Estrategia de Corte Fijo', () => {
    //creo la sesión    
    const sesionInteligencia = conferenciaInformatica.crearSesion('Inteligencia Artificial', 'workshop',
                                                                  '2024-09-12', 'recepcion', estrategiaPorcentaja, 
                                                                  estrategiasPorTipo);
    
    const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
        'poster', null, 'https://ieeexplore.ieee.org/document/9430234',
        [jose, matias], 'https://ieeexplore.ieee.org/document/9430234', matias, new Date()
        );
    const creativeIA = leo.crearArticulo(2, 'Creative AI in Software Project Management',
        'poster', null, 'https://ieeexplore.ieee.org/document/10425234',
        [leo], 'https://ieeexplore.ieee.org/document/10425234', leo, new Date()
        );
    const innovationManagement = mariana.crearArticulo(3, 'Artificial Intelligence in the Innovation Management Systems',
        'poster', null, 'https://ieeexplore.ieee.org/document/10479688',
        [mariana], 'https://ieeexplore.ieee.org/document/10479688', mariana, new Date()
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
    //los autores envian los articulos
    jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);
    leo.enviarArticulo(sesionInteligencia, creativeIA);
    mariana.enviarArticulo(sesionInteligencia, innovationManagement);
    mateo.enviarArticulo(sesionInteligencia, inclusiveness);
    matias.enviarArticulo(sesionInteligencia, evaluating);
    julian.enviarArticulo(sesionInteligencia, escalating);
    graciela.enviarArticulo(sesionInteligencia, integration);

    const estadoDeLaSesionInt = sesionInteligencia.verificarDeadlineRecepcion();
    const verTodosLosArticulosAprobadosSesionInteligencia = sesionInteligencia.verArticulos();

    //los revisores expresan su interes
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
    //junto todos los intereses en una variable
    const mostrarRevisorIntereses1 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1).mostrarRevisorInteres();
    const mostrarRevisorIntereses2 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 2).mostrarRevisorInteres();
    const mostrarRevisorIntereses3 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 3).mostrarRevisorInteres();
    const mostrarRevisorIntereses4 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4).mostrarRevisorInteres();
    const mostrarRevisorIntereses5 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 5).mostrarRevisorInteres();
    const mostrarRevisorIntereses6 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6).mostrarRevisorInteres();
    const mostrarRevisorIntereses7 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 7).mostrarRevisorInteres();
    const todosLosInteresesSesionInteligencia = mostrarRevisorIntereses1.concat(mostrarRevisorIntereses2, mostrarRevisorIntereses3, mostrarRevisorIntereses4, mostrarRevisorIntereses5, mostrarRevisorIntereses6, mostrarRevisorIntereses7);
    //el chair cambia el estado de la sesión
    juan.cambiarEstadoSesion(sesionInteligencia,'asignacion');
    juan.asignarRevisores(sesionInteligencia, todosLosInteresesSesionInteligencia, todosLosRevisores);
    const verAsignaciones = sesionInteligencia.verAsignaciones();
    //los revisores evalúan los articulos
    maria.realizarEvaluacion(sesionInteligencia,1,'Excelente artículo',3);
    maria.realizarEvaluacion(sesionInteligencia,7,'Artículo incoherente',-3);
    juana.realizarEvaluacion(sesionInteligencia,3,'Buen artículo',1);
    juana.realizarEvaluacion(sesionInteligencia,6,'Buen artículo',2);
    mara.realizarEvaluacion(sesionInteligencia,2,'Artículo incoherente',-2);
    mara.realizarEvaluacion(sesionInteligencia,4,'Artículo básico',0);
    mara.realizarEvaluacion(sesionInteligencia,7,'Artículo incoherente',-3);
    juanG.realizarEvaluacion(sesionInteligencia,1,'Excelente artículo',3);
    juanG.realizarEvaluacion(sesionInteligencia,6,'Artículo incoherente',-3);
    raul.realizarEvaluacion(sesionInteligencia,2,'Buen artículo',1);
    raul.realizarEvaluacion(sesionInteligencia,3,'Buen artículo',2);
    oscar.realizarEvaluacion(sesionInteligencia,1,'Artículo incoherente',-2);
    oscar.realizarEvaluacion(sesionInteligencia,2,'Artículo básico',0);
    ines.realizarEvaluacion(sesionInteligencia,4,'Artículo incoherente',-3);
    ines.realizarEvaluacion(sesionInteligencia,5,'Buen artículo',1);
    sonia.realizarEvaluacion(sesionInteligencia,3,'Buen artículo',2);
    sonia.realizarEvaluacion(sesionInteligencia,6,'Artículo incoherente',-2);
    pedro.realizarEvaluacion(sesionInteligencia,5,'Artículo básico',0);
    daniel.realizarEvaluacion(sesionInteligencia,4,'Artículo incoherente',-3);
    luis.realizarEvaluacion(sesionInteligencia,5,'Excelente artículo',3);
    luis.realizarEvaluacion(sesionInteligencia,7,'Artículo incoherente',4);

    juan.cambiarEstadoSesion(sesionInteligencia, 'seleccion');
    const evaluacionesSesionInteligencia = sesionInteligencia.mostrarEvaluaciones();
    const estrategiaCorteFijo = sesionInteligencia.ejecutarEvaluacion(evaluacionesSesionInteligencia);

    console.log('estrategiaCorteFijo', JSON.stringify(estrategiaCorteFijo, null, 2));
    expect(estrategiaCorteFijo.regular.articulosAceptados.length).toBe(2);
    expect(estrategiaCorteFijo.poster.articulosAceptados.length).toBe(1);
});
test('Se cambia la Estrategia de Corte Fijo por Puntaje Mínimo', () => {
    //creo la sesión    
    const sesionInteligencia = conferenciaInformatica.crearSesion('Inteligencia Artificial', 'workshop',
                                                                  '2024-09-12', 'recepcion', estrategiaPorcentaja, 
                                                                  estrategiasPorTipo);
    
    const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
        'poster', null, 'https://ieeexplore.ieee.org/document/9430234',
        [jose, matias], 'https://ieeexplore.ieee.org/document/9430234', matias, new Date()
        );
    const creativeIA = leo.crearArticulo(2, 'Creative AI in Software Project Management',
        'poster', null, 'https://ieeexplore.ieee.org/document/10425234',
        [leo], 'https://ieeexplore.ieee.org/document/10425234', leo, new Date()
        );
    const innovationManagement = mariana.crearArticulo(3, 'Artificial Intelligence in the Innovation Management Systems',
        'poster', null, 'https://ieeexplore.ieee.org/document/10479688',
        [mariana], 'https://ieeexplore.ieee.org/document/10479688', mariana, new Date()
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
    //los autores envian los articulos
    jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);
    leo.enviarArticulo(sesionInteligencia, creativeIA);
    mariana.enviarArticulo(sesionInteligencia, innovationManagement);
    mateo.enviarArticulo(sesionInteligencia, inclusiveness);
    matias.enviarArticulo(sesionInteligencia, evaluating);
    julian.enviarArticulo(sesionInteligencia, escalating);
    graciela.enviarArticulo(sesionInteligencia, integration);

    const estadoDeLaSesionInt = sesionInteligencia.verificarDeadlineRecepcion();
    const verTodosLosArticulosAprobadosSesionInteligencia = sesionInteligencia.verArticulos();

    //los revisores expresan su interes
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
    //junto todos los intereses en una variable
    const mostrarRevisorIntereses1 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1).mostrarRevisorInteres();
    const mostrarRevisorIntereses2 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 2).mostrarRevisorInteres();
    const mostrarRevisorIntereses3 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 3).mostrarRevisorInteres();
    const mostrarRevisorIntereses4 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4).mostrarRevisorInteres();
    const mostrarRevisorIntereses5 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 5).mostrarRevisorInteres();
    const mostrarRevisorIntereses6 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6).mostrarRevisorInteres();
    const mostrarRevisorIntereses7 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 7).mostrarRevisorInteres();
    const todosLosInteresesSesionInteligencia = mostrarRevisorIntereses1.concat(mostrarRevisorIntereses2, mostrarRevisorIntereses3, mostrarRevisorIntereses4, mostrarRevisorIntereses5, mostrarRevisorIntereses6, mostrarRevisorIntereses7);
    //el chair cambia el estado de la sesión
    juan.cambiarEstadoSesion(sesionInteligencia,'asignacion');
    juan.asignarRevisores(sesionInteligencia, todosLosInteresesSesionInteligencia, todosLosRevisores);
    const verAsignaciones = sesionInteligencia.verAsignaciones();
    //los revisores evalúan los articulos
    maria.realizarEvaluacion(sesionInteligencia,1,'Excelente artículo',3);
    maria.realizarEvaluacion(sesionInteligencia,7,'Artículo incoherente',-3);
    juana.realizarEvaluacion(sesionInteligencia,3,'Buen artículo',1);
    juana.realizarEvaluacion(sesionInteligencia,6,'Buen artículo',2);
    mara.realizarEvaluacion(sesionInteligencia,2,'Artículo incoherente',-2);
    mara.realizarEvaluacion(sesionInteligencia,4,'Artículo básico',0);
    mara.realizarEvaluacion(sesionInteligencia,7,'Artículo incoherente',-3);
    juanG.realizarEvaluacion(sesionInteligencia,1,'Excelente artículo',3);
    juanG.realizarEvaluacion(sesionInteligencia,6,'Artículo incoherente',-3);
    raul.realizarEvaluacion(sesionInteligencia,2,'Buen artículo',1);
    raul.realizarEvaluacion(sesionInteligencia,3,'Buen artículo',2);
    oscar.realizarEvaluacion(sesionInteligencia,1,'Artículo incoherente',-2);
    oscar.realizarEvaluacion(sesionInteligencia,2,'Artículo básico',0);
    ines.realizarEvaluacion(sesionInteligencia,4,'Artículo incoherente',-3);
    ines.realizarEvaluacion(sesionInteligencia,5,'Buen artículo',1);
    sonia.realizarEvaluacion(sesionInteligencia,3,'Buen artículo',2);
    sonia.realizarEvaluacion(sesionInteligencia,6,'Artículo incoherente',-2);
    pedro.realizarEvaluacion(sesionInteligencia,5,'Artículo básico',0);
    daniel.realizarEvaluacion(sesionInteligencia,4,'Artículo incoherente',-3);
    luis.realizarEvaluacion(sesionInteligencia,5,'Excelente artículo',3);
    luis.realizarEvaluacion(sesionInteligencia,7,'Artículo incoherente',4);

    juan.cambiarEstadoSesion(sesionInteligencia, 'seleccion');
    const evaluacionesSesionInteligencia = sesionInteligencia.mostrarEvaluaciones();
    const estrategiaCorteFijo = sesionInteligencia.ejecutarEvaluacion(evaluacionesSesionInteligencia);

    console.log('estrategiaCorteFijo', JSON.stringify(estrategiaCorteFijo, null, 2));
    expect(estrategiaCorteFijo.regular.articulosAceptados.length).toBe(2);
    expect(estrategiaCorteFijo.poster.articulosAceptados.length).toBe(1);

    sesionInteligencia.cambiarEstrategia(estrategiaPuntaje);
    const estrategiaPuntajeMinimo = sesionInteligencia.ejecutarEvaluacion(evaluacionesSesionInteligencia);
    console.log('estrategiaPuntajeMinimo',JSON.stringify(estrategiaPuntajeMinimo, null, 2));
    expect(estrategiaPuntajeMinimo.regular.articulosAceptados.length).not.toBe(estrategiaCorteFijo.regular.articulosAceptados.length);
    expect(estrategiaPuntajeMinimo.poster.articulosAceptados.length).not.toBe(estrategiaCorteFijo.poster.articulosAceptados.length);
});
