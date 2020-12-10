const movie = require("../models/movie.model");

const getAllMovies = () => {
  return movie.getMovies();
};

const getMovieById = (id) => {
  return movie.getMovie(id);
};

const insertMovie = (parameters) => {
  return movie.insertMovie(parameters);
};

const updateMovie = (id, parameters) => {
  return movie.updateMovie(id, parameters);
};

const deleteMovie = (id) => {
  return movie.deleteMovie(id);
};

const filterMovies = (genre) => {
  return movie.getMoviesByGenre(genre);
};

module.exports = {
  getAllMovies,
  getMovieById,
  insertMovie,
  updateMovie,
  deleteMovie,
  filterMovies,
};
