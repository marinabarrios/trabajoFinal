const Conferencia = require("../Conferencia");

const conferencia1 = {
    nombreConferencia: 'Conferencia Informática',
    fechaInicio: '2025-09-10',
    fechaFin: '2025-09-25',
};

const conferencia2 = {
    nombreConferencia: 'Conferencia Robótica',
    fechaInicio: '2025-10-10',
    fechaFin: '2025-10-15',
};

const instanciaConf1 = new Conferencia('Conferencia Informática', '2025-09-10', '2025-09-25');
const instanciaConf2 = new Conferencia('Conferencia Robótica', '2025-10-10', '2025-10-28');
const instanciaConf3 = new Conferencia('Conferencia Bases de Datos', '2025-12-10', '2025-12-25');

const conferencias = [conferencia1, conferencia2];

module.exports = { conferencias, conferencia1, conferencia2, instanciaConf1, instanciaConf2, instanciaConf3 };