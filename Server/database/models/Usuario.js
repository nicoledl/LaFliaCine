const { DataTypes, Model } = require("sequelize");
const { connection } = require("../dbConnection");
const bcrypt = require("bcrypt");

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Para que se autoincremente automáticamente
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
      defaultValue: false, // Valor predeterminado en falso
    },
  },
  {
    sequelize: connection,
    modelName: "Usuario",
    timestamps: false, // Si no deseas timestamps (createdAt, updatedAt)
  }
);

// Función para generar el hash de la contraseña antes de guardarla en la base de datos
Usuario.beforeCreate(async (usuario) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(usuario.contraseña, saltRounds);
  usuario.contraseña = hashedPassword;
});

module.exports = Usuario;
