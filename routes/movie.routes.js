const express = require("express");
const router = express.Router();
const movie = require("../models/movie.model");
const middlewares = require("../helpers/middlewares");
const controller = require("../controllers/movie.controller");

// Routes
module.exports = router;

router.get("/", async (req, res) => {
  controller
    .getAllMovies()
    .then((movies) => res.json(movies))
    .catch((err) => res.json(err));
});

router.get("/:id", middlewares.mustBeInteger, async (req, res) => {
  const id = req.params.id;
  controller
    .getMovieById(id)
    .then((movie) => res.json(movie))
    .catch((err) => res.json(err));
});

router.post("/", middlewares.checkFieldsPost, async (req, res) => {
  controller
    .insertMovie(req.query)
    .then((movie) => res.json(movie))
    .catch((err) => res.json(err));
});

router.put(
  "/:id",
  middlewares.mustBeInteger,
  middlewares.checkFieldsPost,
  async (req, res) => {
    const id = req.params.id;
    controller
      .updateMovie(id, req.query)
      .then((movie) => res.json(movie))
      .catch((err) => res.json(err));
  }
);

router.delete("/:id", middlewares.mustBeInteger, async (req, res) => {
  const id = req.params.id;

  controller
    .deleteMovie(id)
    .then((movie) => res.json(movie))
    .catch((err) => res.json(err));
});

router.get("/genre/:genre", async (req, res) => {
  const genre = req.params.genre;

  controller
    .filterMovies(genre)
    .then((movies) => res.json(movies))
    .catch((err) => res.json(err));
});
