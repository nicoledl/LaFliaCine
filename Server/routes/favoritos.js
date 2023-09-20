const express = require("express");
const favoritosController = require("../controllers/favoritosController");

const router = express.Router();

router.get("/favoritos/movie/:id", favoritosController.getFavoriteMovies);
router.get("/favoritos/tv/:id", favoritosController.getFavoriteTV);

router.post("/favoritos/movie/:id", favoritosController.addFavoriteMovie);
router.post("/favoritos/tv/:id", favoritosController.addFavoriteTV);

router.delete("/favoritos/movie/:id", favoritosController.removeFavoriteMovie);
router.delete("/favoritos/tv/:id", favoritosController.removeFavoriteTV);

module.exports = router;
