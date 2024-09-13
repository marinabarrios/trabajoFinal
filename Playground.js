const ComfyChair = require('./ComfyChair.js');
const PorcentajeDeAceptados = require('./PorcentajeDeAceptados.js');
const PuntajeMinimo = require('./PuntajeMinimo.js');
const empresa = new ComfyChair();

// ********************* CONFIGURACIÓN GENERAL ************************************** /
//  REGISTRO USUARIOS /
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
//const juanr = empresa.registrarUsuario('revisor','Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
const todosLosUsuarios = empresa.listUsuarios();
const todosLosChairs = empresa.listChairs();
const todosLosRevisores = empresa.listRevisores();
const todosLosAutores = empresa.listAutores();
//console.log('todosLosUsuarios',empresa.listUsuarios());
//console.log('todosLosChairs',empresa.listChairs());
//console.log('todosLosRevisores',empresa.listRevisores());
//console.log('todosLosAutores',empresa.listAutores());

// CREO CONFERENCIAS /
const conferenciaInformatica = empresa.crearConferencia('Conferencia Informática', '2024-10-28', '2024-10-31', 
                                                  todosLosChairs, todosLosRevisores, todosLosAutores);
const conferenciaRobotica = empresa.crearConferencia('Conferencia Robótica', '2024-08-28', '2024-08-31',
                                                 todosLosChairs, todosLosRevisores, todosLosAutores);
//console.log('DatosConferenciaInformatica',conferenciaInformatica);

// DEFINO ESTRATEGIA DE CORTE FIJO /
const estrategiaPorcentaja = new PorcentajeDeAceptados(0.3); //Acepta el 30% de los artículos

// DEFINO ESTRATEGIA DE PUNTAJE MÍNIMO /
const estrategiaPuntaje = new PuntajeMinimo(1); //Acepta artículos con puntaje promedio >= 1

// DEFINO LAS ESTRATEGIAS POR TIPO DE ARTICULO PARA CUANDO SE TRATA DE UNA WORKSHOP /

const estrategiasPorTipo = {
    poster: new PorcentajeDeAceptados(0.2), // Acepta el 20% de los poster
    regular: new PuntajeMinimo(0.5) // Puntaje mínimo de 0.5 para artículos regulares
};

// CREO LA SESION /
const sesionInteligencia =    conferenciaInformatica.crearSesion('Inteligencia Artificial', 'workshop',
                                                                 '2024-09-10', 'recepcion', estrategiaPorcentaja, estrategiasPorTipo);
const sesionInfraestructura = conferenciaInformatica.crearSesion('Infraestructura', 'regular',
                                                                 '2024-09-10', 'recepcion', estrategiaPuntaje);
const sesionSeguridad =       conferenciaInformatica.crearSesion('Seguridad Infórmatica', 'poster',
                                                                 '2024-09-10', 'recepcion', estrategiaPuntaje);
//console.log('todasLasSesiones',conferenciaInformatica.listSesiones());

// ****************************************************************************************** /


/*
// *****************************ETAPA DE RECEPCION ****************************************** /
//para ejecutar esta etapa, tener comentada las etapas posteriores
//y la fecha del deadline de la sesión de ser mayor o igual a la fecha actual

// UN AUTOR CREA UN ARTICULO PARA LA SESION INTELIGENCIA /
const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
                                                     'poster', null,//'The purpose of the study is to investigate the impact of Artificial Intelligence',
                                                     'https://ieeexplore.ieee.org/document/9430234',
                                                     [jose, matias], 'https://ieeexplore.ieee.org/document/9430234', matias, new Date()
                                                    );
const creativeIA = leo.crearArticulo(2, 'Creative AI in Software Project Management',
                                                     'poster', null,//'Software project management (SPM), which comprises planning, supervising, and keeping track of software projects, is a sophisticated art. However, the complexity and needs of modern software development projects are usually impossible for existing SPM methodologies to handle. The research paper investigates how business process reengineering (BPR) and the strategic application of artificial intelligence (AI) may enhance the effectiveness, quality, and competitiveness of software development processes. The development of artificial intelligence (AI) has the potential to transform project management practices by automating operations, enabling project analytics, and offering intelligent recommendations. This paper proposes a framework for managing agile projects, which are gaining popularity due to their speedy value delivery and minimal risk of project failure. Just a few examples of how AI might be incorporated into project management include automating administrative tasks, providing data-driven risk predictions, simplifying project planning, and producing actionable insights. Software development is one of several businesses that has benefited from the popularity of Scrum and other agile project management methodologies.',
                                                     'https://ieeexplore.ieee.org/document/10425234',
                                                     [leo], 'https://ieeexplore.ieee.org/document/10425234', leo, new Date()
                                                    );
const innovationManagement = mariana.crearArticulo(3, 'Artificial Intelligence in the Innovation Management Systems',
                                                     'poster', null,//'In this paper the management of innovation processes and projects is studied, which is the basis for analyzing of factors affecting the complexity of the management process.',
                                                     'https://ieeexplore.ieee.org/document/10479688',
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

// UN AUTOR CREA UN ARTICULO PARA LA SESION INFRAESTRUCTURA /
const articuloInfraestructura1 = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Infrastructure',
                                                    'regular', 'The purpose of the study is to investigate the impact of Artificial Infrastructure',
                                                    'https://ieeexplore.ieee.org/document/9430234',
                                                    [jose, matias], null, matias, new Date()
                                                    );
const articuloInfra2 = leo.crearArticulo(2, 'Creative AI in Software Project Management',
                                        'poster', null,
                                        'https://ieeexplore.ieee.org/document/10425234',
                                        [leo], 'https://ieeexplore.ieee.org/document/10425234', leo, new Date()
                                        );
const articuloInfraestructura2 = leo.crearArticulo(2, 'Creative AI in Project of Infrastructure',
                                                    'regular', 'Software project management (SPM), which comprises planning, supervising, and keeping track of software projects...',
                                                    'https://ieeexplore.ieee.org/document/10425234',
                                                    [leo], null, leo, new Date()
                                                    );
const articuloInfraestructura3 = mariana.crearArticulo(3, 'Artificial intelligence in innovation and infrastructure management systems',
                                                    'regular', 'In this paper the management of innovation processes and projects is studied, which is the basis for analyzing of factors affecting the complexity of the management process.',
                                                    'https://ieeexplore.ieee.org/document/10479688',
                                                    [mariana], null, mariana, new Date()
                                                    );
const articuloInfraestructura4 = mateo.crearArticulo(4, 'Evaluation of the inclusivity of the problem in infrastructure',
                                                    'regular', 'The escalating integration of Artificial Intelligence (AI) in various domains, especially Project Management (PM).',
                                                    'https://ieeexplore.ieee.org/document/10467463',
                                                    [mateo], null,
                                                    mateo, new Date()
                                                    );

// UN AUTOR CREA UN ARTICULO PARA LA SESION SEGURIDAD /
const articuloSeguridad1 = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Securance',
                                              'regular', null,
                                              'https://ieeexplore.ieee.org/document/9430234',
                                               [jose, matias], 'https://ieeexplore.ieee.org/document/9430234', matias, new Date()
                                              );
const articuloSeguridad2 = leo.crearArticulo(2, 'Creative AI in Project of Securance',
                                             'poster', null, 'https://ieeexplore.ieee.org/document/10425234',
                                             [leo], 'https://ieeexplore.ieee.org/document/10425234', leo, new Date()
                                            );
const articuloSeguridad3 = mariana.crearArticulo(3, 'Artificial Intelligence in Computer Security',
                                                 'poster', null, 'https://ieeexplore.ieee.org/document/10479688',
                                                 [mariana], 'https://ieeexplore.ieee.org/document/10479688', mariana, new Date()
                                                );
const articuloSeguridad4 = mateo.crearArticulo(4, 'Evaluation of the inclusivity of artificial intelligence software and Computer Security',
                                                'poster', null, 'https://ieeexplore.ieee.org/document/10467463',
                                                [mateo], 'https://ieeexplore.ieee.org/document/10467463', mateo, new Date()
                                               );

// EL AUTOR ENVIA EL ARTICULO A LA SESION INTELIGENCIA /
jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);//pasa la validacion
leo.enviarArticulo(sesionInteligencia, creativeIA);//pasa la validacion
mariana.enviarArticulo(sesionInteligencia, innovationManagement);//pasa la validacion
mateo.enviarArticulo(sesionInteligencia, inclusiveness);//pasa la validacion
matias.enviarArticulo(sesionInteligencia, evaluating);//pasa la validacion
julian.enviarArticulo(sesionInteligencia, escalating);//pasa la validacion
graciela.enviarArticulo(sesionInteligencia, integration);//pasa la validacion


// EL AUTOR ENVIA EL ARTICULO A LA SESION INFRAESTRUCTURA /
jose.enviarArticulo(sesionInfraestructura, articuloInfraestructura1);//pasa la validacion
leo.enviarArticulo(sesionInfraestructura, articuloInfra2);//no pasa la validacion
leo.enviarArticulo(sesionInfraestructura, articuloInfraestructura2);//pasa la validacion
mariana.enviarArticulo(sesionInfraestructura, articuloInfraestructura3);//pasa la validacion
mateo.enviarArticulo(sesionInfraestructura, articuloInfraestructura4);//pasa la validacion

// EL AUTOR ENVIA EL ARTICULO A LA SESION SEGURIDAD /
jose.enviarArticulo(sesionSeguridad, articuloSeguridad1);//no pasa la validacion
leo.enviarArticulo(sesionSeguridad, articuloSeguridad2);//pasa la validacion
mariana.enviarArticulo(sesionSeguridad, articuloSeguridad3);//pasa la validacion
mateo.enviarArticulo(sesionSeguridad, articuloSeguridad4);//pasa la validacion

// SE VERIFICA SI EL AUTOR TIENE NOTIFICACIONES DE RECHAZADO SOBRE SU ARTICULO /
const notificacionesMatias = matias.obtenerNotificaciones();
console.log('notificacionesMatias',notificacionesMatias);
const notificacionesLeo = leo.obtenerNotificaciones();
console.log('notificacionesLeo',notificacionesLeo);
const notificacionesMariana = mariana.obtenerNotificaciones();
console.log('notificacionesMariana',notificacionesMariana);
const notificacionesMateo = mateo.obtenerNotificaciones();
console.log('notificacionesMateo',notificacionesMateo);

// ****************************** FIN ETAPA RECEPCION *********************************** /

*/

// ********************************** BIDDING *************************************************** /
// para ejecutar esta etapa, comentar la etapa de recepción 
// y modificar el deadline de la sesión, debe ser anterior anterior a la fecha actual

// VERIFICO EL ESTADO DE LA SESION /
const estadoDeLaSesionInt = sesionInteligencia.verificarDeadlineRecepcion();
const estadoDeLaSesionInf = sesionInfraestructura.verificarDeadlineRecepcion();
const estadoDeLaSesionSeg = sesionSeguridad.verificarDeadlineRecepcion();
//console.log('sesionInteligencia',sesionInteligencia);
// BUSCO LOS ARTICULOS DE CADA SESIÓN EN LOS ARCHIVOS QUE SE GENERARON /
const verTodosLosArticulosAprobadosSesionInteligencia = sesionInteligencia.verArticulos();
console.log('verTodosLosArticulosAprobadosSesionInteligencia',verTodosLosArticulosAprobadosSesionInteligencia);
const verTodosLosArticulosAprobadosSesionInfraestructura = sesionInfraestructura.verArticulos();
//console.log('verTodosLosArticulosAprobadosSesionInfraestructura',verTodosLosArticulosAprobadosSesionInfraestructura);
const verTodosLosArticulosAprobadosSesionSeguridad = sesionSeguridad.verArticulos();
//console.log('verTodosLosArticulosAprobadosSesionSeguridad',verTodosLosArticulosAprobadosSesionSeguridad);

// UN REVISOR EXPRESA SU INTERES /
maria.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
maria.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 3), 'no interesado');
maria.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'quizas');
maria.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 1), 'interesado');
maria.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 2), 'no interesado');
maria.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 4), 'quizas');
maria.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 2), 'interesado');
maria.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 3), 'no interesado');
maria.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 4), 'quizas');

juana.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 2), 'no interesado');
juana.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 5), 'no interesado');
juana.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6), 'quizas');
juana.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 1), 'no interesado');
juana.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 2), 'interesado');
juana.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 4), 'quizas');
juana.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 2), 'quizas');
juana.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 3), 'no interesado');
juana.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 4), 'quizas');

mara.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'quizas');
mara.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'interesado');
mara.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6), 'no interesado');
mara.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 7), 'quizas');
mara.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 1), 'quizas');
mara.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 2), 'interesado');
mara.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 4), 'quizas');
mara.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 3), 'no interesado');
mara.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 4), 'quizas');

juanG.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
juanG.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'quizas');
juanG.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6), 'interesado');
juanG.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 7), 'no interesado');
juanG.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 1), 'quizas');
juanG.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 2), 'interesado');
juanG.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 3), 'no interesado');
juanG.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 4), 'quizas');

raul.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 3), 'interesado');
raul.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'quizas');
raul.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 2), 'quizas');
raul.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 5), 'no interesado');
raul.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 1), 'quizas');
raul.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 4), 'interesado');
raul.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 2), 'no interesado');
raul.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 4), 'quizas');

oscar.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
oscar.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 2), 'quizas');
oscar.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 5), 'no interesado');
oscar.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6), 'quizas');
oscar.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 1), 'interesado');
oscar.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 4), 'quizas');
oscar.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 2), 'interesado');
oscar.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 4), 'quizas');

ines.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
ines.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 3), 'no interesado');
ines.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'quizas');
ines.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 5), 'interesado');
ines.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 7), 'no interesado');
ines.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 4), 'quizas');

sonia.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 3), 'interesado');
sonia.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'quizas');
sonia.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6), 'quizas');
sonia.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 1), 'interesado');
sonia.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 2), 'no interesado');

pedro.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'interesado');
pedro.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 2), 'no interesado');
pedro.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 4), 'interesado');
pedro.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 2), 'quizas');
pedro.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 4), 'no interesado');

daniel.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'quizas');
daniel.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4), 'quizas');
daniel.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 1), 'no interesado');
daniel.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 4), 'quizas');
daniel.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 2), 'interesado');
daniel.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 4), 'quizas');

luis.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 2), 'no interesado');
luis.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 7), 'interesado');
luis.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 1), 'quizas');
luis.expresarInteres(sesionInfraestructura, verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 4), 'quizas');
luis.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 2), 'quizas');
luis.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 3), 'interesado');
luis.expresarInteres(sesionSeguridad, verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 4), 'quizas');

// PUEDO CONOCER LOS INTERESES DE CADA REVISOR /
//const mostrarIntereses = maria.mostrarIntereses();
//console.log('mostrarInteresesDelRevisor',mostrarIntereses[0].tipoInteres);

// CAMBIO EL INTERES DE UN REVISOR /
//maria.expresarInteres(sesionInteligencia, verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1), 'quizas');
//const mostrarIntereses1 = maria.mostrarIntereses();

// VERIFICO LOS INTERESES DE CADA REVISOR A CADA ARTICULO /
const mostrarRevisorIntereses1 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 1).mostrarRevisorInteres();
const mostrarRevisorIntereses2 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 2).mostrarRevisorInteres();
const mostrarRevisorIntereses3 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 3).mostrarRevisorInteres();
const mostrarRevisorIntereses4 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 4).mostrarRevisorInteres();
const mostrarRevisorIntereses5 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 5).mostrarRevisorInteres();
const mostrarRevisorIntereses6 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 6).mostrarRevisorInteres();
const mostrarRevisorIntereses7 = verTodosLosArticulosAprobadosSesionInteligencia.find(articulo => articulo._id === 7).mostrarRevisorInteres();
const todosLosInteresesSesionInteligencia = mostrarRevisorIntereses1.concat(mostrarRevisorIntereses2, mostrarRevisorIntereses3, mostrarRevisorIntereses4, mostrarRevisorIntereses5, mostrarRevisorIntereses6, mostrarRevisorIntereses7);
console.log('todosLosInteresesSesionInteligencia',todosLosInteresesSesionInteligencia);
const mostrarRevisorIntereses8 = verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 1).mostrarRevisorInteres();
const mostrarRevisorIntereses9 = verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 2).mostrarRevisorInteres();
const mostrarRevisorIntereses10 = verTodosLosArticulosAprobadosSesionInfraestructura.find(articulo => articulo._id === 4).mostrarRevisorInteres();
const todosLosInteresesSesionInfraestructura = mostrarRevisorIntereses8.concat(mostrarRevisorIntereses9, mostrarRevisorIntereses10);
console.log('todosLosInteresesSesionInfraestructura',todosLosInteresesSesionInfraestructura);
const mostrarRevisorIntereses11 = verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 2).mostrarRevisorInteres();
const mostrarRevisorIntereses12 = verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 3).mostrarRevisorInteres();
const mostrarRevisorIntereses13 = verTodosLosArticulosAprobadosSesionSeguridad.find(articulo => articulo._id === 4).mostrarRevisorInteres();
const todosLosInteresesSesionSeguridad = mostrarRevisorIntereses11.concat(mostrarRevisorIntereses12, mostrarRevisorIntereses13);
console.log('todosLosInteresesSesionSeguridad',todosLosInteresesSesionSeguridad);

// ********************************* FIN ETAPA BIDDING **************************************** * /

// ****************************** ETAPA DE ASIGNACIÓN ****************************************** * /
//para ejecutar esta etapa mantener comentada etapas posteriores a esta y la etapa de recepción

// ** EL CHAIR CAMBIA EL ESTADO DE LA SESION DE BIDDING A ASIGNACION * /
juan.cambiarEstadoSesion(sesionInteligencia,'asignacion');
juan.cambiarEstadoSesion(sesionInfraestructura,'asignacion');
juan.cambiarEstadoSesion(sesionSeguridad,'asignacion');
//console.log('sesionInteligencia',sesionInteligencia);

// EL CHAIR ASIGNA REVISORES /
juan.asignarRevisores(sesionInteligencia, todosLosInteresesSesionInteligencia, todosLosRevisores);
const verAsignaciones = sesionInteligencia.verAsignaciones();
console.log('verAsignaciones',verAsignaciones);

// EL REVISOR VERIFICA SI TIENE ASIGNACIONES /
const asignacionesMaria = maria.verArticulosAsignados(sesionInteligencia);
//console.log('asignacionesMaria',asignacionesMaria);
const asignacionesJuana = juana.verArticulosAsignados(sesionInteligencia);
//console.log('asignacionesJuana',asignacionesJuana);
const asignacionesMara = mara.verArticulosAsignados(sesionInteligencia);
//console.log('asignacionesMara',asignacionesMara);
const asignacionesJuanG = juanG.verArticulosAsignados(sesionInteligencia);
//console.log('asignacionesJuanG',asignacionesJuanG);
const asignacionesRaul = raul.verArticulosAsignados(sesionInteligencia);
//console.log('asignacionesRaul',asignacionesRaul);
const asignacionesOscar = oscar.verArticulosAsignados(sesionInteligencia);
//console.log('asignacionesOscar',asignacionesOscar);
const asignacionesInes = ines.verArticulosAsignados(sesionInteligencia);
//console.log('asignacionesInes',asignacionesInes);
const asignacionesSonia = sonia.verArticulosAsignados(sesionInteligencia);
//console.log('asignacionesSonia',asignacionesSonia);
const asignacionesPedro = pedro.verArticulosAsignados(sesionInteligencia);
//console.log('asignacionesPedro',asignacionesPedro);
const asignacionesDaniel = daniel.verArticulosAsignados(sesionInteligencia);
//console.log('asignacionesDaniel',asignacionesDaniel);
const asignacionesLuis = luis.verArticulosAsignados(sesionInteligencia);
//console.log('asignacionesLuis',asignacionesLuis);

// ************* EL REVISOR CALIFICA UN ARTICULO ************** /
// para ejecutar esta parte del código se debe verificar que articulo se le asignó a cada revisor /
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

// EL REVISOR CALIFICA UN ARTICULO QUE NO LE ASIGNARON /
// luis.realizarEvaluacion(sesionInteligencia,2,'Artículo incoherente',-3);

// *********************************************************************************************** /

// ****************** SELECCIÓN **************** /
//para ejecutar esta etapa, sólo tener comentado la etapa de recepción

// ** EL CHAIR CAMBIA EL ESTADO DE LA SESION DE ASIGNACION A SELECCIÓN * /
juan.cambiarEstadoSesion(sesionInteligencia,'seleccion');
juan.cambiarEstadoSesion(sesionInfraestructura,'seleccion');
juan.cambiarEstadoSesion(sesionSeguridad,'seleccion');

const evaluacionesSesionInteligencia = sesionInteligencia.mostrarEvaluaciones();
//console.log('evaluacionesSesionInteligencia',evaluacionesSesionInteligencia);
const estrategiaCorteFijo = sesionInteligencia.ejecutarEvaluacion(evaluacionesSesionInteligencia);
console.log('estrategiaCorteFijo',JSON.stringify(estrategiaCorteFijo, null, 2));
sesionInteligencia.cambiarEstrategia(estrategiaPuntaje);
const estrategiaPuntajeMinimo = sesionInteligencia.ejecutarEvaluacion(evaluacionesSesionInteligencia);
console.log('estrategiaPuntajeMinimo',JSON.stringify(estrategiaPuntajeMinimo, null, 2));

/** ver como se puede hacer:
 * 
 * completar el test
 */
empresa;