const { DataTypes, Model } = require("sequelize");
const { connection } = require("../dbConnection");
const MoviesFavoritos = require("./MoviesFavoritos");
const TvFavoritos = require("./TvFavoritos");
const MoviesVistos = require("./MoviesVistos");
const TvVistos = require("./TvVistos");
const bcrypt = require("bcrypt");

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    newstle: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: connection,
    modelName: "Usuario",
    timestamps: false,
  }
);

Usuario.beforeCreate(async (usuario) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(usuario.contraseña, saltRounds);
  usuario.contraseña = hashedPassword;
});

Usuario.hasMany(MoviesFavoritos, { foreignKey: 'usuarioId' }); 
Usuario.hasMany(TvFavoritos, { foreignKey: 'usuarioId' }); 
Usuario.hasMany(MoviesVistos, { foreignKey: 'usuarioId' }); 
Usuario.hasMany(TvVistos, { foreignKey: 'usuarioId' }); 

module.exports = Usuario;
