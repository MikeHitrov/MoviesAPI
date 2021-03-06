const filename = process.cwd() + "/data/movies.json";
const fs = require("fs");
let movies = require(filename);
const helper = require("../helpers/helper.js");

/**
 * This function returns all the movies
 *
 * @returns {Array} Returns all the movies
 */
function getMovies() {
  return new Promise((resolve, reject) => {
    if (movies.length === 0) {
      resolve([]);
    }
    resolve(movies);
  });
}

/**
 * This function returns a movie by given id
 *
 * @param {number} id The movie id
 * @returns {Object} Returns the movie if present
 */
function getMovie(id) {
  return helper.searchByIdInArray(movies, id);
}

/**
 * This function inserts a new movie into the JSON file
 *
 * @param {Object} newMovie The details about the movie
 * @returns {Object} Returns the newly created movie
 */
function insertMovie(newMovie) {
  return new Promise((resolve, reject) => {
    const id = { id: getNewId() };
    const date = {
      createdAt: newDate(),
      updatedAt: newDate(),
    };
    newMovie = { ...id, ...newMovie, ...date };
    movies.push(newMovie);
    writeJSONFile(movies);
    resolve(newMovie);
  });
}

/**
 * This function updares a movie by given id and rewrites the JSON file
 *
 * @param {number} id The movie id
 * @param {object} newMovie The details about the updated movie
 * @returns {Object} Returns the updated movie if updated successfully
 */
function updateMovie(id, newMovie) {
  return helper.searchByIdInArray(movies, id).then((movie) => {
    const index = movies.findIndex((m) => m.id == movie.id);

    id = { id: movie.id };
    const date = {
      createdAt: movie.createdAt,
      updatedAt: newDate(),
    };

    movies[index] = { ...id, ...date, ...newMovie };
    writeJSONFile(movies);
    resolve(movies[id]);
  });
}

/**
 * This function deletes a movie by given id and rewrites the JSON file
 *
 * @param {number} id The movie id
 * @returns {undefined}
 */
function deleteMovie(id) {
  movies = movies.filter((m) => m.id != id);
  writeJSONFile(movies);
  return id;
}

/**
 * This function retuns movies filtered by given genre
 *
 * @param {string} genre The wanted genre
 * @returns {Promise} Returns all the filtered movies
 */
function getMoviesByGenre(genre) {
  return helper.filterByGenre(movies, genre);
}

/**
 * This function generates a new id
 *
 * @returns {string} The generated id
 */
const getNewId = () => {
  let u = Date.now().toString(16) + Math.random().toString(16) + "0".repeat(16);
  return [
    u.substr(0, 8),
    u.substr(8, 4),
    "4000-8" + u.substr(13, 3),
    u.substr(16, 12),
  ].join("-");
};

/**
 * This function writes on the JSON file
 * @param  {string} content The content that needs to be written
 */
function writeJSONFile(content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      fs.writeFile(JSON.stringify(err));
    }
  });
}

/**
 * This function generates a new date
 *
 * @returns {string} The generated date
 */
const newDate = () => new Date().toString();

module.exports = {
  insertMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  getMoviesByGenre,
  writeJSONFile,
};
