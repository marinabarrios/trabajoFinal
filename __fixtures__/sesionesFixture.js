const { instanciaConf1, instanciaConf2, instanciaConf3 } = require('../__fixtures__/conferenciasFixture');  

const sesionW = instanciaConf1.crearSesion('Inteligencia Artificial', 'WORKSHOP', '2025-02-21');
const sesionRfD = instanciaConf1.crearSesion('Infraestructura', 'REGULAR', '2025-02-23');
const sesionR = instanciaConf2.crearSesion('Robótica', 'REGULAR', '2025-03-23');
const sesionP = instanciaConf3.crearSesion('Bases de Datos', 'POSTER', '2025-07-23');

module.exports = { sesionW, sesionRfD, sesionR, sesionP };