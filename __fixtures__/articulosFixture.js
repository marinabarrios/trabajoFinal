const { autor, autor1, autor2, autor3 } = require("../__fixtures__/usuariosFixture");
const ArticuloRegular = require("../Articulo/ArticuloRegular");
const ArticuloPoster = require("../Articulo/ArticuloPoster");

/***************** REGULAR ***************** */
const articuloRegular = new ArticuloRegular(
  "Artículo Regular 1",
  "https://ieeexplore.ieee.org/document/9430234", [autor, autor1],
  "Abstract del artículo 1", [autor1]
);

/***************** POSTER ***************** */
const articuloPoster = new ArticuloPoster(
  "Artículo Poster 1",
  "https://ieeexplore.ieee.org/document/9430234", [autor1, autor2],
  "https://ieeexplore.ieee.org/document/9430234", [autor2]
);

const artPosterCon2AutoresNotif = new ArticuloPoster(
  "Artículo Poster 2",
  "https://ieeexplore.ieee.org/document/9430234", [autor, autor3],
  "https://ieeexplore.ieee.org/document/9430234", [autor, autor3]
);

module.exports = { articuloRegular, articuloPoster, artPosterCon2AutoresNotif };