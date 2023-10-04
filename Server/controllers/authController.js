const Usuario = require("../database/models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  const { mail, contraseña} = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { mail } });

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // Verify password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    const plainPassword = contraseña;
    const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: usuario.id, usuario: usuario.username, nombre: usuario.nombre },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    
    res.json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function registerUser(req, res) {
  const { nombre, usuario, mail, contraseña, newstle } = req.body;

  try {
    const existingUser = await Usuario.findOne({ where: { usuario } });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "El nombre de usuario ya está en uso" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    const newUser = await Usuario.create({
      nombre,
      usuario,
      mail,
      contraseña: hashedPassword,
      newstle,
    });

    const token = jwt.sign(
      { id: newUser.id, username: newUser.usuario},
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  loginUser,
  registerUser,
};
