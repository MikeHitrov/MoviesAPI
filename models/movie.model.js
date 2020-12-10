const filename = process.cwd() + "/data/movies.json";
let movies = require(filename);
const helper = require("../helpers/helper.js");

/**
 * This function returns all the movies
 *
 * @returns {Promise} Returns all the movies
 */
function getMovies() {
  return new Promise((resolve, reject) => {
    if (movies.length === 0) {
      reject({
        message: "No movies available!",
        status: 202,
      });
    }
    resolve(movies);
  });
}

/**
 * This function returns a movie by given id
 *
 * @param {number} id The movie id
 * @returns {Promise} Returns the movie if present
 */
function getMovie(id) {
  return helper.searchByIdInArray(movies, id);
}

/**
 * This function inserts a new movie into the JSON file
 *
 * @param {object} newMovie The details about the movie
 * @returns {Promise} Returns the newly created movie
 */
function insertMovie(newMovie) {
  return new Promise((resolve, reject) => {
    const id = { id: helper.getNewId(movies) };
    const date = {
      createdAt: helper.newDate(),
      updatedAt: helper.newDate(),
    };
    newMovie = { ...id, ...newMovie, ...date };
    movies.push(newMovie);
    helper.writeJSONFile(filename, movies);
    resolve(newMovie);
  });
}

/**
 * This function updares a movie by given id and rewrites the JSON file
 *
 * @param {number} id The movie id
 * @param {object} newMovie The details about the updated movie
 * @returns {Promise} Returns the updated movie if updated successfully
 */
function updateMovie(id, newMovie) {
  return new Promise((resolve, reject) => {
    helper
      .searchByIdInArray(movies, id)
      .then((movie) => {
        const index = movies.findIndex((m) => m.id == movie.id);

        id = { id: movie.id };
        const date = {
          createdAt: movie.createdAt,
          updatedAt: helper.newDate(),
        };

        movies[index] = { ...id, ...date, ...newMovie };
        helper.writeJSONFile(filename, movies);
        resolve(movies[index]);
      })
      .catch((err) => reject(err));
  });
}

/**
 * This function deletes a movie by given id and rewrites the JSON file
 *
 * @param {number} id The movie id
 * @returns {undefined}
 */
function deleteMovie(id) {
  return new Promise((resolve, reject) => {
    helper
      .searchByIdInArray(movies, id)
      .then(() => {
        movies = movies.filter((m) => m.id !== id);
        helper.writeJSONFile(filename, movies);
        resolve();
      })
      .catch((err) => reject(err));
  });
}

/**
 * This function retuns movies filtered by given genre
 *
 * @param {string} genre The wanted genre
 * @returns {Promise} Returns all the filtered movies
 */
function getMoviesByGenre(genre) {
  return new Promise((resolve, reject) => {
    helper
      .filterByGenre(movies, genre)
      .then((movies) => resolve(movies))
      .catch((err) => reject(err));
  });
}

module.exports = {
  insertMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  getMoviesByGenre,
};
