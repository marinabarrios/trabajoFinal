/*const conferenciasFixture = [
    { nombre: 'Conferencia Informática', fechaInicio: '2025-05-10', fechaFin: '2025-05-15' },
    { nombre: 'Conferencia Robótica', fechaInicio: '2025-06-01', fechaFin: '2025-06-05' }
];*/

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
const conferencias = [conferencia1, conferencia2];

module.exports = { conferencias, conferencia1, conferencia2 };