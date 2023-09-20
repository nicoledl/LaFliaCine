const { Op } = require("sequelize");
const MoviesFavoritos = require("../database/models/MoviesFavoritos");
const TvFavoritos = require("../database/models/TvFavoritos");

// Obtener películas favoritas de un usuario
async function getFavoriteMovies(req, res) {
  const userId = req.params.id;

  try {
    const userFavorites = await MoviesFavoritos.findOne({
      where: { usuarioId: userId },
    });

    if (!userFavorites) {
      return res.status(404).json({ message: "No se encontraron películas favoritas para este usuario." });
    }

    res.status(200).json(userFavorites);
  } catch (error) {
    console.error("Error al obtener películas favoritas:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Agregar película a favoritos de un usuario
async function addFavoriteMovie(req, res) {
  const userId = req.params.id;
  const movieId = req.body.movieId; // Asumiendo que se envía el ID de la película en el cuerpo de la solicitud

  try {
    let userFavorites = await MoviesFavoritos.findOne({ where: { usuarioId: userId } });

    if (!userFavorites) {
      // Si el usuario no tiene películas favoritas, creamos un nuevo registro
      userFavorites = await MoviesFavoritos.create({
        usuarioId: userId,
        movieIds: [movieId],
      });
    } else {
      // Si el usuario ya tiene películas favoritas, actualizamos el arreglo de movieIds
      userFavorites.movieIds.push(movieId);
      await userFavorites.save();
    }

    res.status(201).json(userFavorites);
  } catch (error) {
    console.error("Error al agregar película favorita:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Eliminar película de favoritos de un usuario
async function removeFavoriteMovie(req, res) {
  const userId = req.params.id;
  const movieId = req.body.movieId; // Asumiendo que se envía el ID de la película en el cuerpo de la solicitud

  try {
    const userFavorites = await MoviesFavoritos.findOne({ where: { usuarioId: userId } });

    if (!userFavorites) {
      return res.status(404).json({ message: "No se encontraron películas favoritas para este usuario." });
    }

    // Filtramos el arreglo de movieIds para eliminar la película deseada
    userFavorites.movieIds = userFavorites.movieIds.filter((id) => id !== movieId);
    await userFavorites.save();

    res.status(200).json(userFavorites);
  } catch (error) {
    console.error("Error al eliminar película favorita:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Obtener programas de televisión favoritos de un usuario
async function getFavoriteTV(req, res) {
  const userId = req.params.id;

  try {
    const userFavorites = await TvFavoritos.findOne({
      where: { usuarioId: userId },
    });

    if (!userFavorites) {
      return res.status(404).json({ message: "No se encontraron programas de televisión favoritos para este usuario." });
    }

    res.status(200).json(userFavorites);
  } catch (error) {
    console.error("Error al obtener programas de televisión favoritos:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Agregar programa de televisión a favoritos de un usuario
async function addFavoriteTV(req, res) {
  const userId = req.params.id;
  const tvId = req.body.tvId; // Asumiendo que se envía el ID del programa de televisión en el cuerpo de la solicitud

  try {
    let userFavorites = await TvFavoritos.findOne({ where: { usuarioId: userId } });

    if (!userFavorites) {
      // Si el usuario no tiene programas de televisión favoritos, creamos un nuevo registro
      userFavorites = await TvFavoritos.create({
        usuarioId: userId,
        tvIds: [tvId],
      });
    } else {
      // Si el usuario ya tiene programas de televisión favoritos, actualizamos el arreglo de tvIds
      userFavorites.tvIds.push(tvId);
      await userFavorites.save();
    }

    res.status(201).json(userFavorites);
  } catch (error) {
    console.error("Error al agregar programa de televisión favorito:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Eliminar programa de televisión de favoritos de un usuario
async function removeFavoriteTV(req, res) {
  const userId = req.params.id;
  const tvId = req.body.tvId; // Asumiendo que se envía el ID del programa de televisión en el cuerpo de la solicitud

  try {
    const userFavorites = await TvFavoritos.findOne({ where: { usuarioId: userId } });

    if (!userFavorites) {
      return res.status(404).json({ message: "No se encontraron programas de televisión favoritos para este usuario." });
    }

    // Filtramos el arreglo de tvIds para eliminar el programa de televisión deseado
    userFavorites.tvIds = userFavorites.tvIds.filter((id) => id !== tvId);
    await userFavorites.save();

    res.status(200).json(userFavorites);
  } catch (error) {
    console.error("Error al eliminar programa de televisión favorito:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

module.exports = {
  getFavoriteMovies,
  addFavoriteMovie,
  removeFavoriteMovie,
  getFavoriteTV,
  addFavoriteTV,
  removeFavoriteTV,
};
