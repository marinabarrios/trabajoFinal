const Autor = require("../Usuario/Autor");
const Chair = require("../Usuario/Chair");
const Revisor = require("../Usuario/Revisor");

const autor = new Autor("Juan Rodriguez", "UNLP", "juan_rodriguez@gmail.com", "123456");
const autor1 = new Autor("Sofia Perez", "UBA", "sofia_perez@gmail.com", "123456");
const autor2 = new Autor("José Gonzalez", "UNNE", "jose_gonzalez@gmail.com", "123456");
const autor3 = new Autor("Julian Cotto", "UBA", "julian_cotto@gmail.com", "123456");

const chair = new Chair("Matias Lei", "UNAM", "matias_lei@gmail.com", "123456");
const chair1 = new Chair("Laura Díaz", "UNL", "laura_diaz@gmail.com", "123456");

const revisor = new Revisor("Leonardo Rey", "UNAM", "leonardo_rey@gmail.com", "123456");
const revisor1 = new Revisor("Carlos Lopez", "UTN", "carlos_lopez@gmail.com", "123456");

const usuarios = [autor, autor1, autor2, autor3, revisor, revisor1, chair, chair1];

module.exports = {
    usuarios,
    autor, autor1, autor2, autor3,
    revisor, revisor1,
    chair, chair1
};