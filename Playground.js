const ComfyChair = require('./ComfyChair.js');
const empresa = new ComfyChair();
/**  REGISTRO USUARIOS */
const juan = empresa.registrarUsuario('chair', 'Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
const jose = empresa.registrarUsuario('autor','José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
const matias = empresa.registrarUsuario('autor','Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
const leo = empresa.registrarUsuario('autor','Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');
const maria = empresa.registrarUsuario('revisor','Maria Gonzalez', 'UNNE', 'maria_gonzalez@gmail.com', '123456');
const juana = empresa.registrarUsuario('revisor','Juana Gómez', 'UNLP', 'juana_gomez@gmail.com', '123456');
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
const conferenciaInformatica = empresa.crearConferencia('Conferencia Informática', '2024-07-28', '2024-07-31', 
                                                  todosLosChairs, todosLosRevisores, todosLosAutores);
const conferenciaRobotica = empresa.crearConferencia('Conferencia Robótica', '2024-08-28', '2024-08-31',
                                                 todosLosChairs, todosLosRevisores, todosLosAutores);

//console.log('DatosConferenciaInformatica',conferenciaInformatica);

/** CREO LA SESION */
const sesionInteligencia = conferenciaInformatica.crearSesion('Inteligencia Artificial', 'regular',
                                                              '2024-08-20', 'recepcion');
const sesionInfraestructura = conferenciaInformatica.crearSesion('Infraestructura', 'workshop',
                                                                 '2024-08-20', 'recepcion');
const sesionSeguridad = conferenciaInformatica.crearSesion('Seguridad Infórmatica', 'poster',
                                                           '2024-08-20', 'recepcion');
//console.log('todasLasSesiones',conferenciaInformatica.listSesiones());

/** UN AUTOR CREA UN ARTICULO */
const futureOfProjectManagement = jose.crearArticulo(1, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
                                                     'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence', //on the future of Project Management. This study provides detailed conceptual information about Artificial Intelligence and different perspectives. Artificial Intelligence is defined as the new technical discipline, which would develop an application system, a technological method in order to simulate the expansion and extension of human intelligence.',
                                                     'https://ieeexplore.ieee.org/document/9430234',
                                                     [jose, matias], null, matias, new Date()
                                                    );
const futureOfProjectManagement2 = leo.crearArticulo(2, 'An investigation into the Impact of Artificial Intelligence on the Future of Project Management',
                                                     'regular', 'The purpose of the study is to investigate the impact of Artificial Intelligence on the future of Project Management. This study provides detailed conceptual information about Artificial Intelligence and different perspectives. Artificial Intelligence is defined as the new technical discipline, which would develop an application system, a technological method in order to simulate the expansion and extension of human intelligence.',
                                                     'https://ieeexplore.ieee.org/document/9430234',
                                                     [leo], null, leo, new Date()
                                                    );
//console.log('listArticulosCreados',jose.listArticulosCreados());

/** EL AUTOR ENVIA EL ARTICULO */
const envioFutureOfProjectManagement = jose.enviarArticulo(sesionInteligencia, futureOfProjectManagement);
const envioFutureOfProjectManagement2 = leo.enviarArticulo(sesionInteligencia, futureOfProjectManagement2);

/** LA SESION RECIBE EL ARTICULO */
const todosLosDatosDelArticulo = sesionInteligencia.recibirArticulo(futureOfProjectManagement);
console.log ('Se recibió el artículo',todosLosDatosDelArticulo);

/** SE VERIFICA SI EL AUTOR TIENE NOTIFICACIONES DE RECHAZADO SOBRE SU ARTICULO */
const notificacionesMatias = matias.obtenerNotificaciones();
console.log('notificacionesMatias',notificacionesMatias);
const notificacionesLeo = leo.obtenerNotificaciones();
console.log('notificacionesLeo',notificacionesLeo);

/** COMO YA PASÓ EL DEADLINE VERIFICO QUE LA SESION HAYA PASADO AL BIDDING */
console.log('sesionInteligencia',sesionInteligencia);

/** ESTAMOS EN PROCESO DE BIDDING */
const verTodosLosArticulosAprobados = sesionInteligencia.verArticulos();
console.log('verTodosLosArticulosAprobados',verTodosLosArticulosAprobados);
maria.expresarInteres(futureOfProjectManagement,'interesado');
const mostrarIntereses = maria.mostrarIntereses();
console.log('mostrarIntereses',mostrarIntereses);//mostrarRevisorInteres
const mostrarRevisorIntereses = futureOfProjectManagement.mostrarRevisorInteres();
console.log('mostrarRevisorIntereses',mostrarRevisorIntereses);
empresa;