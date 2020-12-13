const movieService = require("../services/user.service");

const getAllMovies = () => {
  return movieService.getMovies();
};

const getMovieById = (id) => {
  return movieService.getMovie(id);
};

const insertMovie = (parameters) => {
  return movieService.insertMovie(parameters);
};

const updateMovie = (id, parameters) => {
  return movieService.updateMovie(id, parameters);
};

const deleteMovie = (id) => {
  return movieService.deleteMovie(id);
};

const filterMovies = (genre) => {
  return movieService.getMoviesByGenre(genre);
};

module.exports = {
  getAllMovies,
  getMovieById,
  insertMovie,
  updateMovie,
  deleteMovie,
  filterMovies,
};
