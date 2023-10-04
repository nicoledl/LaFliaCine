const express = require("express");
const vistosController = require("../controllers/vistosController");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// router.use(verifyToken)

router.get("/movie/:id", vistosController.getSeenMovies);
router.get("/tv/:id", vistosController.getSeenTV);

router.post("/movie/:id/:movieId", vistosController.addSeenMovie);
router.post("/tv/:id/:tvId", vistosController.addSeenTV);

router.delete("/movie/:id/:movieId", vistosController.removeSeenMovie);
router.delete("/tv/:id/:tvId", vistosController.removeSeenTV);

module.exports = router;
