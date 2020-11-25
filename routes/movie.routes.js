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

router.post("/", middlewares.checkFieldsPost, async (req, res) => {
  await movie
    .insertMovie(req.params)
    .then((movie) =>
      res.status(201).json({
        message: `The movie #${movie.id} has been created`,
        content: movie,
      })
    )
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.put(
  "/:id",
  middlewares.mustBeInteger,
  middlewares.checkFieldsPost,
  async (req, res) => {
    const id = req.params.id;
    await movie
      .updateMovie(id, req.params)
      .then((movie) =>
        res.json({
          message: `The movie #${id} has been updated.`,
          content: movie,
        })
      )
      .catch((err) => {
        if (err.status) {
          res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
      });
  }
);

router.delete("/:id", middlewares.mustBeInteger, async (req, res) => {
  const id = req.params.id;

  await movie
    .deleteMovie(id)
    .then((movie) =>
      res.json({
        message: `The movie #${id} has been deleted.`,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

router.get("/genre/:genre", async (req, res) => {
  const genre = req.params.genre;
  await movie
    .getMoviesByGenre(genre)
    .then((movies) => res.json(movies))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});
