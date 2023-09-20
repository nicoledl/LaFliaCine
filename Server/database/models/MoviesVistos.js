const { DataTypes, Model } = require("sequelize");
const { connection } = require("../dbConnection");

class MoviesVistos extends Model {}

MoviesVistos.init(
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
    modelName: "MoviesVistos",
    tableName: "movies_vistos",
    timestamps: false,
  }
);

module.exports = MoviesVistos;
