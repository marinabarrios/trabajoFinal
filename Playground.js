const ComfyChair = require('./ComfyChair.js');
//const Usuarios = require('./Usuarios.js');

const empresa = new ComfyChair();

const juan = empresa.registrarUsuario('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
const jose = empresa.registrarUsuario('José Gonzalez', 'UNNE', 'jose_gonzalez@gmail.com', '123456');
const matias = empresa.registrarUsuario('Matias Lei', 'UNAM', 'matias_lei@gmail.com', '123456');
const juanr = empresa.registrarUsuario('Juan Rodriguez', 'UNLP', 'juan_rodriguez@gmail.com', '123456');
empresa;