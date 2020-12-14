const movieService = require("../services/user.service");

/**
 * This function gets all movies
 *
 * @returns {Array} The movies
 */
const getAllMovies = () => {
  return movieService.getMovies();
};

/**
 * This function gets a movie by its id
 *
 * @param {number} id The movie id
 * @returns {Object} The movie
 */
const getMovieById = (id) => {
  return movieService.getMovie(id);
};

/**
 * This function ads a new movies
 *
 * @param {Object} parameters The movie details in the form of an object
 * @returns {Object} The newly created movie
 */
const insertMovie = (parameters) => {
  return movieService.insertMovie(parameters);
};

/**
 * This function updates a movie by its id
 *
 * @param {number} id The movie id
 * @param {Object} id The movie details in the form of an object
 * @returns {Object} The updated movie
 */
const updateMovie = (id, parameters) => {
  return movieService.updateMovie(id, parameters);
};

/**
 * This function deletes a movie by its id
 *
 * @param {number} id The movie id
 * @returns {undefined}
 */
const deleteMovie = (id) => {
  return movieService.deleteMovie(id);
};

/**
 * This function fulters movies by genre
 *
 * @param {string} genre The genre
 * @returns {Array} The filtered movies
 */
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
