const Usuario = require("./models/Usuario");
const MoviesFavoritos = require("./models/MoviesFavoritos");
const TvFavoritos = require("./models/TvFavoritos");
const MoviesVistos = require("./models/MoviesVistos");
const TvVistos = require("./models/TvVistos");

Usuario.hasMany(MoviesFavoritos, { foreignKey: "usuarioId" });
MoviesFavoritos.belongsTo(Usuario, { foreignKey: "usuarioId" });

Usuario.hasMany(TvFavoritos, { foreignKey: "usuarioId" });
TvFavoritos.belongsTo(Usuario, { foreignKey: "usuarioId" });

Usuario.hasMany(MoviesVistos, { foreignKey: "usuarioId" });
MoviesVistos.belongsTo(Usuario, { foreignKey: "usuarioId" });

Usuario.hasMany(TvVistos, { foreignKey: "usuarioId" });
TvVistos.belongsTo(Usuario, { foreignKey: "usuarioId" });
