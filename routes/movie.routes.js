const express = require("express");
const router = express.Router();
const post = require("../models/movie.model");
const m = require("../helpers/middlewares");

// Routes
module.exports = router;

router.get("/", async (req, res) => {
  await post
    .getPosts()
    .then((posts) => res.json(posts))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});
