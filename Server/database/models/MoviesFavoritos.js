const { DataTypes, Model } = require("sequelize");
const { connection } = require("../dbConnection");

class MoviesFavoritos extends Model {}

MoviesFavoritos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    movieIds: {
      type: DataTypes.JSON, 
      defaultValue: [], 
    },
    usuarioId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: connection,
    modelName: "MoviesFavoritos",
    tableName: "movies_favoritos",
    timestamps: false,
  }
);

module.exports = MoviesFavoritos;
