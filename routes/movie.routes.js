const express = require("express");
const router = express.Router();
const movie = require("../models/movie.model");
const middlewares = require("../helpers/middlewares");

// Routes
module.exports = router;

router.get("/", async (req, res) => {
  await movie
    .getMovies()
    .then((movies) => res.json(movies))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

router.get("/:id", middlewares.mustBeInteger, async (req, res) => {
  const id = req.params.id;
  await movie
    .getMovie(id)
    .then((movie) => res.json(movie))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});
