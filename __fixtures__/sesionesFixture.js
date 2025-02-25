const { conferencia1, conferencia2 } = require('../__fixtures__/conferenciasFixture');

const sesion1 = conferencia1.crearSesion('Inteligencia Artificial', 'WORKSHOP', '2025-02-21');
const sesion2 = conferencia2.crearSesion('Infraestructura', 'REGULAR', '2025-03-11');

module.exports = { sesion1, sesion2 };