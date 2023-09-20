const { DataTypes, Model } = require("sequelize");
const { connection } = require("../dbConnection");

class TvFavoritos extends Model {}

TvFavoritos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tvIds: {
      type: DataTypes.JSON, 
      defaultValue: [],
    },
    usuarioId: {
      type: DataTypes.INTEGER, 
    },
  },
  {
    sequelize: connection,
    modelName: "TvFavoritos",
    tableName: "tv_favoritos",
    timestamps: false,
  }
);

module.exports = TvFavoritos;
