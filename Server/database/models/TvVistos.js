const { DataTypes, Model } = require("sequelize");
const { connection } = require("../dbConnection");

class TvVistos extends Model {}

TvVistos.init(
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
    modelName: "TvVistos",
    tableName: "tv_vistos",
    timestamps: false,
  }
);

module.exports = TvVistos;
