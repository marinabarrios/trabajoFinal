const { autor, autor1 } = require("../__fixtures__/usuariosFixture");

const articuloRegular = {
  tituloArticulo: "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
  archivoAdjunto: "https://ieeexplore.ieee.org/document/9430234",
  autoresArticulo: [autor, autor1],
  abstract: "Abstract del artículo 1",
  autorNotificacion: autor1,
};

const articuloPoster = {
  tituloArticulo: "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
  archivoAdjunto: "https://ieeexplore.ieee.org/document/9430234",
  archivoFuentes: "https://ieeexplore.ieee.org/document/9430234",
  autoresArticulo: [autor, autor1],
  autorNotificacion: autor1,
};

const artPosterCon2AutoresNotif = {
  tituloArticulo: "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
  archivoAdjunto: "https://ieeexplore.ieee.org/document/9430234",
  archivoFuentes: "https://ieeexplore.ieee.org/document/9430234",
  autoresArticulo: [autor, autor1],
  autorNotificacion: [autor, autor1],
};

module.exports = { articuloRegular, articuloPoster, artPosterCon2AutoresNotif };