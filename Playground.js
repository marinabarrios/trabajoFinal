const ComfyChair = require('./ComfyChair.js');
const empresa = new ComfyChair();
/**  REGISTRO USUARIOS */
const juan = empresa.registrarUsuario('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
const jose = empresa.registrarUsuario('autor','José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
const matias = empresa.registrarUsuario('autor','Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
const leo = empresa.registrarUsuario('autor','Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');
const mariana = empresa.registrarUsuario('autor','Mariana Lei', 'UNAM', 'mariana_lei@gmail.com', '123456');
const mateo = empresa.registrarUsuario('autor','Mateo Rey', 'UNAM', 'mateo_rey@gmail.com', '123456');
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

/** CREO CONFERENCIAS */
const conferenciaInformatica = empresa.crearConferencia('Conferencia Informática', '2024-10-28', '2024-10-31', 
                                                  todosLosChairs, todosLosRevisores, todosLosAutores);
const conferenciaRobotica = empresa.crearConferencia('Conferencia Robótica', '2024-08-28', '2024-08-31',
                                                 todosLosChairs, todosLosRevisores, todosLosAutores);

//console.log('DatosConferenciaInformatica',conferenciaInformatica);

/** CREO LA SESION */
const sesionInteligencia = conferenciaInformatica.crearSesion('Inteligencia Artificial', 'regular',
                                                              '2024-08-28', 'recepcion');
const sesionInfraestructura = conferenciaInformatica.crearSesion('Infraestructura', 'workshop',
                                                                 '2024-08-28', 'recepcion');
const sesionSeguridad = conferenciaInformatica.crearSesion('Seguridad Infórmatica', 'poster',
                                                           '2024-08-28', 'recepcion');
//console.log('todasLasSesiones',conferenciaInformatica.listSesiones());

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
//console.log('listArticulosCreados',jose.listArticulosCreados());

/** UN AUTOR CREA UN ARTICULO PARA LA SESION INFRAESTRUCTURA */
const articuloInfraestructura1 = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Infrastructure',
                                                    'regular', 'The purpose of the study is to investigate the impact of Artificial Infrastructure',
                                                    'https://ieeexplore.ieee.org/document/9430234',
                                                    [jose, matias], null, matias, new Date()
                                                    );
const articuloInfraestructura2 = leo.crearArticulo(2, 'Creative AI in Project of Infrastructure',
                                                    'poster', null, 'https://ieeexplore.ieee.org/document/10425234',
                                                    [leo], 'https://ieeexplore.ieee.org/document/10425234',
                                                    leo, new Date()
                                                    );
const articuloInfraestructura3 = mariana.crearArticulo(3, 'Artificial intelligence in innovation and infrastructure management systems',
                                                    'poster', null, 'https://ieeexplore.ieee.org/document/10479688',
                                                    [mariana], null, mariana, new Date()
                                                    );
const articuloInfraestructura4 = mateo.crearArticulo(4, 'Evaluation of the inclusivity of the problem in infrastructure',
                                                    'poster', null, 'https://ieeexplore.ieee.org/document/10467463',
                                                    [mateo], 'https://ieeexplore.ieee.org/document/10467463',
                                                    mateo, new Date()
                                                    );
/** UN AUTOR CREA UN ARTICULO PARA LA SESION SEGURIDAD */
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
/** EL AUTOR ENVIA EL ARTICULO A LA SESION INTELIGENCIA*/
jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);//pasa la validacion
leo.enviarArticulo(sesionInteligencia, creativeIA);//no pasa la validacion
mariana.enviarArticulo(sesionInteligencia, innovationManagement);//pasa la validacion
mateo.enviarArticulo(sesionInteligencia, inclusiveness);//pasa la validacion
/** EL AUTOR ENVIA EL ARTICULO A LA SESION INFRAESTRUCTURA*/
jose.enviarArticulo(sesionInfraestructura, articuloInfraestructura1);//pasa la validacion
leo.enviarArticulo(sesionInfraestructura, articuloInfraestructura2);//pasa la validacion
mariana.enviarArticulo(sesionInfraestructura, articuloInfraestructura3);//no pasa la validacion
mateo.enviarArticulo(sesionInfraestructura, articuloInfraestructura4);//pasa la validacion
/** EL AUTOR ENVIA EL ARTICULO A LA SESION SEGURIDAD*/
jose.enviarArticulo(sesionSeguridad, articuloSeguridad1);//no pasa la validacion
leo.enviarArticulo(sesionSeguridad, articuloSeguridad2);//pasa la validacion
mariana.enviarArticulo(sesionSeguridad, articuloSeguridad3);//pasa la validacion
mateo.enviarArticulo(sesionSeguridad, articuloSeguridad4);//pasa la validacion

/** SE VERIFICA SI EL AUTOR TIENE NOTIFICACIONES DE RECHAZADO SOBRE SU ARTICULO */
const notificacionesMatias = matias.obtenerNotificaciones();
//console.log('notificacionesMatias',notificacionesMatias);
const notificacionesLeo = leo.obtenerNotificaciones();
//console.log('notificacionesLeo',notificacionesLeo);
const notificacionesMariana = mariana.obtenerNotificaciones();
//console.log('notificacionesMariana',notificacionesMariana);
const notificacionesMateo = mateo.obtenerNotificaciones();
//console.log('notificacionesMateo',notificacionesMateo);

/** COMO YA PASÓ EL DEADLINE VERIFICO QUE LA SESION HAYA PASADO AL BIDDING */
//console.log('sesionInteligencia',sesionInteligencia);

/** VERIFICO EL ESTADO DE LA SESION */
const estadoDeLaSesion = sesionInteligencia.verificarDeadlineRecepcion();
//console.log('estadoDeLaSesion',estadoDeLaSesion);

/** OBTENER TODOS LOS ARTICULOS DE LA SESION */
const todosLosArticulosValidadosInteligencia = sesionInteligencia.obtenerArticulos();
//console.log ('todosLosArticulosQuePasaronLaValidacionParSesionInteligencia',todosLosArticulosValidadosInteligencia);
const todosLosArticulosValidadosInfraestructura = sesionInfraestructura.obtenerArticulos();
//console.log ('todosLosArticulosQuePasaronLaValidacionParSesionInfraestructura',todosLosArticulosValidadosInfraestructura);
const todosLosArticulosValidadosSeguridad = sesionSeguridad.obtenerArticulos();
//console.log ('todosLosArticulosQuePasaronLaValidacionParSesionSeguridad',todosLosArticulosValidadosSeguridad);

/** ESTAMOS EN PROCESO DE BIDDING */
const verTodosLosArticulosAprobadosSesionInteligencia = sesionInteligencia.verArticulos();
//console.log('verTodosLosArticulosAprobadosSesionInteligencia',verTodosLosArticulosAprobadosSesionInteligencia);
const verTodosLosArticulosAprobadosSesionInfraestructura = sesionInfraestructura.verArticulos();
//console.log('verTodosLosArticulosAprobadosSesionInfraestructura',verTodosLosArticulosAprobadosSesionInfraestructura);
const verTodosLosArticulosAprobadosSesionSeguridad = sesionSeguridad.verArticulos();
//console.log('verTodosLosArticulosAprobadosSesionSeguridad',verTodosLosArticulosAprobadosSesionSeguridad);

/** UN REVISOR EXPRESA SU INTERES */
maria.expresarInteres(sesionInteligencia, futureOfProjectManagement,'interesado');
const mostrarIntereses = maria.mostrarIntereses();
//console.log('mostrarInteresesDelRevisor',mostrarIntereses);//mostrarRevisorInteres
const mostrarRevisorIntereses = futureOfProjectManagement.mostrarRevisorInteres();
//console.log('mostrarRevisorInteresesDelArticulo',mostrarRevisorIntereses);

/** CAMBIO EL INTERES DE UN REVISOR */
maria.expresarInteres(sesionInteligencia,futureOfProjectManagement,'quizas');
const mostrarIntereses1 = maria.mostrarIntereses();
//console.log('mostrarIntereses1',mostrarIntereses1);
const mostrarRevisorIntereses1 = futureOfProjectManagement.mostrarRevisorInteres();
//console.log('mostrarRevisorIntereses1',mostrarRevisorIntereses1);

/** VER BIDDS */
const verBidds = juan.verBidds(futureOfProjectManagement);
console.log('verBidds',verBidds);
/** ASIGNAR REVISORES */
const todosLosArticulos = juan.asignarRevisores(sesionInteligencia);
//console.log('verBidds',verBidds);
empresa;