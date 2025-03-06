const { autor, autor1, autor2, autor3 } = require("../__fixtures__/usuariosFixture");
const ArticuloRegular = require("../Articulo/ArticuloRegular");
const ArticuloPoster = require("../Articulo/ArticuloPoster");

/***************** REGULAR ***************** */
const articuloRegular = new ArticuloRegular(
  "Artículo Regular 1",
  "https://ieeexplore.ieee.org/document/9430234", [autor, autor1],
  "Abstract del artículo 1", [autor1]
);

const articuloRegular1 = new ArticuloRegular(
  "Artículo Regular 2",
  "https://ieeexplore.ieee.org/document/9430234", [autor2],
  "Abstract del artículo 2", [autor2]
);

const articuloRegular2 = new ArticuloRegular(
  "Artículo Regular 3",
  "https://ieeexplore.ieee.org/document/9430234", [autor3],
  "Abstract del artículo 3", [autor3]
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

const articuloPoster1 = new ArticuloPoster(
  "Artículo Poster 2",
  "https://ieeexplore.ieee.org/document/9430234", [autor1, autor2],
  "https://ieeexplore.ieee.org/document/9430234", [autor1]
);

const articuloPoster2 = new ArticuloPoster(
  "Artículo Poster 3",
  "https://ieeexplore.ieee.org/document/9430234", [autor3],
  "https://ieeexplore.ieee.org/document/9430234", [autor3]
);



module.exports = { articuloRegular, articuloRegular1, articuloRegular2,
                   articuloPoster, articuloPoster1, articuloPoster2, artPosterCon2AutoresNotif };