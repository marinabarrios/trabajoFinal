const { instanciaConf1, instanciaConf2, instanciaConf3 } = require('../__fixtures__/conferenciasFixture');  

const sesionWfD = instanciaConf1.crearSesion('Inteligencia Artificial', 'WORKSHOP', '2025-09-11');
const sesionW = instanciaConf2.crearSesion('Inteligencia Artificial aplicada en la medicina', 'WORKSHOP', '2025-10-11');
const sesionRfD = instanciaConf1.crearSesion('Infraestructura', 'REGULAR', '2025-09-10')
const sesionR = instanciaConf2.crearSesion('Robótica', 'REGULAR', '2025-10-13');
const sesionP = instanciaConf3.crearSesion('Bases de Datos', 'POSTER', '2025-12-23');

module.exports = { sesionWfD, sesionW, sesionRfD, sesionR, sesionP };