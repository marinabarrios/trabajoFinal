const { autor, autor1 } = require("../__fixtures__/usuariosFixture");
const ArticuloRegular = require("../Articulo/ArticuloRegular");
const ArticuloPoster = require("../Articulo/ArticuloPoster");

/***************** REGULAR ***************** */
const articuloRegular = new ArticuloRegular(
  "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
  "https://ieeexplore.ieee.org/document/9430234", [autor, autor1],
  "Abstract del artículo 1", autor1
);

/***************** POSTER ***************** */
const articuloPoster = new ArticuloPoster(
  "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
  "https://ieeexplore.ieee.org/document/9430234", [autor, autor1],
  "https://ieeexplore.ieee.org/document/9430234", autor1
);

const artPosterCon2AutoresNotif = new ArticuloPoster(
  "An investigation into the Impact of Artificial Intelligence on the Future of Project Management",
  "https://ieeexplore.ieee.org/document/9430234", [autor, autor1],
  "https://ieeexplore.ieee.org/document/9430234", [autor, autor1]
);

module.exports = { articuloRegular, articuloPoster, artPosterCon2AutoresNotif };