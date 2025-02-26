const Conferencia = require("../Conferencia");

const conferencia1 = {
    nombreConferencia: 'Conferencia Informática',
    fechaInicio: '2025-02-20',
    fechaFin: '2025-02-28',
};

const conferencia2 = {
    nombreConferencia: 'Conferencia Robótica',
    fechaInicio: '2025-03-10',
    fechaFin: '2025-03-15',
};

const instanciaConf1 = new Conferencia('Conferencia Informática', '2025-02-20', '2025-02-28');
const instanciaConf2 = new Conferencia('Conferencia Robótica', '2025-03-10', '2025-03-15');
const instanciaConf3 = new Conferencia('Conferencia Bases de Datos', '2025-07-10', '2025-07-25');

const conferencias = [conferencia1, conferencia2];

module.exports = { conferencias, conferencia1, conferencia2, instanciaConf1, instanciaConf2, instanciaConf3 };