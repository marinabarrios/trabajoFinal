const { instanciaConf1, instanciaConf2 } = require('../__fixtures__/conferenciasFixture');

const sesion1 = instanciaConf1.crearSesion('Inteligencia Artificial', 'WORKSHOP', '2025-02-21');
const sesion2 = instanciaConf1.crearSesion('Infraestructura', 'REGULAR', '2025-02-23');

module.exports = { sesion1, sesion2 };