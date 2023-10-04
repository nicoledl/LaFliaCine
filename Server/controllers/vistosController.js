const { Op } = require("sequelize");
const MoviesVistos = require("../database/models/MoviesVistos");
const TvVistos = require("../database/models/TvVistos");

// Obtener películas vistas por un usuario
async function getSeenMovies(req, res) {
  const userId = req.params.id;

  try {
    const userSeen = await MoviesVistos.findOne({
      where: { usuarioId: userId },
    });

    if (!userSeen) {
      return res.status(200).json(null);
    }

    res.status(200).json(userSeen);
  } catch (error) {
    console.error("Error al obtener películas vistas:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Agregar película vista por un usuario
async function addSeenMovie(req, res) {
  const userId = req.params.id;
  const movieId = parseInt(req.params.movieId, 10); // Asumiendo que se envía el ID de la película en el cuerpo de la solicitud

  try {
    let userSeen = await MoviesVistos.findOne({ where: { usuarioId: userId } });

    if (!userSeen) {
      // Si el usuario no tiene películas vistas, creamos un nuevo registro
      userSeen = await MoviesVistos.create({
        usuarioId: userId,
        movieIds: [movieId],
      });
    } else {
      // Si el usuario ya tiene películas vistas, actualizamos el arreglo de movieIds
      const arrVistos = userSeen.dataValues.movieIds;
      const nuevoArr = [...arrVistos, movieId];

      // Actualizar movieIds en el modelo y guardar
      userSeen.movieIds = nuevoArr;
      await userSeen.save();
    }

    res.status(201).json(userSeen);
  } catch (error) {
    console.error("Error al agregar película vista:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Eliminar película vista por un usuario
async function removeSeenMovie(req, res) {
  const userId = req.params.id;
  const movieId = parseInt(req.params.movieId, 10); // Asumiendo que se envía el ID de la película en el cuerpo de la solicitud

  try {
    const userSeen = await MoviesVistos.findOne({
      where: { usuarioId: userId },
    });

    if (!userSeen) {
      return res.status(404).json({
        message: "No se encontraron películas vistas para este usuario.",
      });
    }

    // Filtramos el arreglo de movieIds para eliminar la película deseada
    userSeen.movieIds = userSeen.movieIds.filter((id) => id !== movieId);
    await userSeen.save();

    res.status(200).json(userSeen);
  } catch (error) {
    console.error("Error al eliminar película vista:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Obtener programas de televisión vistos por un usuario
async function getSeenTV(req, res) {
  const userId = req.params.id;

  try {
    const userSeen = await TvVistos.findOne({
      where: { usuarioId: userId },
    });

    if (!userSeen) {
      return res.status(404).json({
        message:
          "No se encontraron programas de televisión vistos para este usuario.",
      });
    }

    res.status(200).json(userSeen);
  } catch (error) {
    console.error("Error al obtener programas de televisión vistos:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Agregar programa de televisión visto por un usuario
async function addSeenTV(req, res) {
  const userId = req.params.id;
  const tvId = parseInt(req.params.tvId, 10); // Asumiendo que se envía el ID del programa de televisión en el cuerpo de la solicitud

  try {
    let userSeen = await TvVistos.findOne({ where: { usuarioId: userId } });

    if (!userSeen) {
      // Si el usuario no tiene programas de televisión vistos, creamos un nuevo registro
      userSeen = await TvVistos.create({
        usuarioId: userId,
        tvIds: [tvId],
      });
    } else {
      // Si el usuario ya tiene programas de televisión vistos, actualizamos el arreglo de tvIds
      const userSeen = userSeen.dataValues.tvIds;
      const nuevoArr = [...userSeen, tvId];

      // Actualizar movieIds en el modelo y guardar
      userSeen.tvIds = nuevoArr;
      await userSeen.save();
    }

    res.status(201).json(userSeen);
  } catch (error) {
    console.error("Error al agregar programa de televisión visto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Eliminar programa de televisión visto por un usuario
async function removeSeenTV(req, res) {
  const userId = req.params.id;
  const tvId = parseInt(req.params.tvId, 10); // Asumiendo que se envía el ID del programa de televisión en el cuerpo de la solicitud

  try {
    const userSeen = await TvVistos.findOne({ where: { usuarioId: userId } });

    if (!userSeen) {
      return res.status(404).json({
        message:
          "No se encontraron programas de televisión vistos para este usuario.",
      });
    }

    // Filtramos el arreglo de tvIds para eliminar el programa de televisión deseado
    userSeen.tvIds = userSeen.tvIds.filter((id) => id !== tvId);
    await userSeen.save();

    res.status(200).json(userSeen);
  } catch (error) {
    console.error("Error al eliminar programa de televisión visto:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

module.exports = {
  getSeenMovies,
  addSeenMovie,
  removeSeenMovie,
  getSeenTV,
  addSeenTV,
  removeSeenTV,
};
