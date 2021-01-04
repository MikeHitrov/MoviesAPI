const express = require("express");
const router = express.Router();
const middlewares = require("../helpers/middlewares");
const controller = require("../controllers/movie.controller");

// Routes
module.exports = router;

router.get("/", (req, res) => {
  controller
    .getAllMovies()
    .then((movies) => res.json(movies))
    .catch((err) => res.json(err));
});

router.get("/:id", middlewares.mustBeGUID, (req, res) => {
  const id = req.params.id;
  controller
    .getMovieById(id)
    .then((movie) => res.json(movie))
    .catch((err) => res.json(err));
});

router.post("/", middlewares.checkFieldsPost, (req, res) => {
  controller
    .insertMovie(req.query)
    .then((movie) => res.json(movie))
    .catch((err) => res.json(err));
});

router.put(
  "/:id",
  middlewares.mustBeGUID,
  middlewares.checkFieldsPost,
  (req, res) => {
    const id = req.params.id;
    controller
      .updateMovie(id, req.query)
      .then((movie) => res.json(movie))
      .catch((err) => res.json(err));
  }
);

router.delete("/:id", middlewares.mustBeGUID, (req, res) => {
  const id = req.params.id;

  controller
    .deleteMovie(id)
    .then((id) => res.json(id))
    .catch((err) => res.json(err));
});

router.get("/genre/:genre", (req, res) => {
  const genre = req.params.genre;

  controller
    .filterMovies(genre)
    .then((movies) => res.json(movies))
    .catch((err) => res.json(err));
});
