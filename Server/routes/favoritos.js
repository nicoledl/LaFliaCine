const express = require("express");
const favoritosController = require("../controllers/favoritosController");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// router.use(verifyToken)

router.get("/movie/:id", favoritosController.getFavoriteMovies);
router.get("/tv/:id", favoritosController.getFavoriteTV);

router.post("/movie/:id/:movieId", favoritosController.addFavoriteMovie);
router.post("/tv/:id/:tvId", favoritosController.addFavoriteTV);

router.delete("/movie/:id/:movieId", favoritosController.removeFavoriteMovie);
router.delete("/tv/:id/:tvId", favoritosController.removeFavoriteTV);

module.exports = router;
