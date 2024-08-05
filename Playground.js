const ComfyChair = require('./ComfyChair.js');
const Conferencias = require('./Conferencias.js');
//const Usuarios = require('./Usuarios.js');

const empresa = new ComfyChair();
/* REGISTRO USUARIOS */
const juan = empresa.registrarUsuario('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
const jose = empresa.registrarUsuario('José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
const matias = empresa.registrarUsuario('Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
const leo = empresa.registrarUsuario('Leonardo Rey', 'UNAM', 'leonardo_rey@gmail.com', '123456');
const maria = empresa.registrarUsuario('Maria Gonzalez', 'UNNE', 'maria_gonzalez@gmail.com', '123456');
const juana = empresa.registrarUsuario('Juana Gómez', 'UNLP', 'juana_gomez@gmail.com', '123456');
//const juanr = empresa.registrarUsuario('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
const todosLosUsuarios = empresa.listUsuarios();
console.log('todosLosUsuarios',todosLosUsuarios);

/** CREO CONFERENCIAS */
const nuevaConferencia = empresa.crearConferencia('Conferencia Informática', 
                                                  '2024-07-28', 
                                                  '2024-07-31', 
                                                  empresa);
const otraConferencia = empresa.crearConferencia('Conferencia Robótica', 
                                                    '2024-08-28', 
                                                    '2024-08-31', 
                                                  empresa);

console.log('DatosNuevaConferencia',nuevaConferencia);
/** DEFINO LOS ROLES DE LOS USUARIOS PARA UNA CONFERENCIA */
const conferencia = new Conferencias();
const conferenciaInformatica = conferencia.definirRoles(nuevaConferencia);
console.log(conferenciaInformatica);
/*const todasLasConferencias = empresa.listConferencias();console.log('todasLasConferencias ',todasLasConferencias);
//const conferenciaExistente = todasLasConferencias.some((conferencia) => conferencia._nombreConferencia === 'Conferencia Informática');       
const nombreABuscar = 'Conferencia Informática';

const conferenciaExistente = todasLasConferencias.find(conferencia => conferencia._nombreConferencia === nombreABuscar);
console.log('ExisteConferencia',conferenciaExistente)
if (conferenciaExistente) {
    conferenciaExistente._organizadores = organizadores;
    conferenciaExistente._comite = comite;
    const indiceConferencia = todasLasConferencias.indexOf(conferenciaExistente);
    todasLasConferencias[indiceConferencia] = conferenciaExistente;
    console.log('INDEX', todasLasConferencias[indiceConferencia]);
    console.log('La conferencia existe. Actualizando roles.');
} else {
    console.log('La conferencia no existe.');
}*/
empresa;