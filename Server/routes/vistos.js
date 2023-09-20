const express = require("express");
const vistosController = require("../controllers/vistosController");

const router = express.Router();

router.get("/vistos/movie/:id", vistosController.getSeenMovies);
router.get("/vistos/tv/:id", vistosController.getSeenTV);

router.post("/vistos/movie/:id", vistosController.addSeenMovie);
router.post("/vistos/tv/:id", vistosController.addSeenTV);

router.delete("/vistos/movie/:id", vistosController.removeSeenMovie);
router.delete("/vistos/tv/:id", vistosController.removeSeenTV);

module.exports = router;
