const Usuario = require("../Usuario/Usuario");
const Autor = require("../Usuario/Autor");
const Chair = require("../Usuario/Chair");
const Revisor = require("../Usuario/Revisor");
Usuario.usuariosRegistrados = [];

const autor = new Autor("Juan Rodriguez", "UNLP", "juan_rodriguez@gmail.com", "123456");
const autor1 = new Autor("Sofia Perez", "UBA", "sofia_perez@gmail.com", "123456");
const autor2 = new Autor("José Gonzalez", "UNNE", "jose_gonzalez@gmail.com", "123456");
const autor3 = new Autor("Julian Cotto", "UBA", "julian_cotto@gmail.com", "123456");

const chair = new Chair("Matias Lei", "UNAM", "matias_lei@gmail.com", "123456");
const chair1 = new Chair("Laura Díaz", "UNL", "laura_diaz@gmail.com", "123456");

const revisor = new Revisor("Leonardo Rey", "UNAM", "leonardo_rey@gmail.com", "123456");
const revisor1 = new Revisor("Carlos Lopez", "UTN", "carlos_lopez@gmail.com", "123456");
const revisor2 = new Revisor("Maria Gonzalez", "UNNE", "maria_gonzalez@gmail.com", "123456");
const revisor3 = new Revisor("Juana Gómez", "UNLP", "juana_gomez@gmail.com", "123456");
const revisor4 = new Revisor("Mara Gonzalez", "UTN", "mara_gonzalez@gmail.com", "123456");
const revisor5 = new Revisor("Juan Gómez", "UNLP", "juan_gomez@gmail.com", "123456");
const revisor6 = new Revisor("Raúl Arce", "UNNE", "raul_arce@gmail.com", "123456");
const revisor7 = new Revisor("Oscar Martín", "UNAM", "oscar_martin@gmail.com", "123456");
const revisor8 = new Revisor("Inés Martinez", "UNNE", "ines_martinez@gmail.com", "123456");
const revisor9 = new Revisor("Sonia Ruiz", "UTN", "sonia_ruiz@gmail.com", "123456");
const revisor10 = new Revisor("Pedro Jimenez", "UNLP", "pedro_jimenez@gmail.com", "123456");
const revisor11 = new Revisor("Daniel Martinez", "UNLP", "daniel_martinez@gmail.com", "123456");
const revisor12 = new Revisor("Luis Iglesias", "UTN", "luis_iglesias@gmail.com", "123456");

const usuarios = [autor, autor1, autor2, autor3, revisor, revisor1, revisor2, revisor3,
                 revisor4, revisor5, revisor6, revisor7, revisor8, revisor9, revisor10,
                 revisor11, revisor12, chair, chair1];

module.exports = {
    usuarios,
    autor, autor1, autor2, autor3,
    revisor, revisor1, revisor2,
    revisor3, revisor4, revisor5,
    revisor6, revisor7, revisor8,
    revisor9, revisor10, revisor11,
    revisor12, chair, chair1
};