const fs = require("fs");

/**
 * This function generates a new id
 *
 * @param  {Array} array The movies array
 * @returns {number} The generated id
 */
const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
};

/**
 * This function generates a new date
 *
 * @returns {string} The generated date
 */
const newDate = () => new Date().toString();

/**
 * This function checks if a movie is in the object based on its id
 *
 * @param  {Array} array The movies array
 * @param  {number} id The movie id
 * @returns {object} The movie
 */
function mustBeInArray(array, id) {
  return new Promise((resolve, reject) => {
    const row = array.find((r) => r.id == id);
    if (!row) {
      reject({
        message: "ID is not good",
        status: 404,
      });
    }
    resolve(row);
  });
}

/**
 * This filters the movies based on the genre
 *
 * @param  {Array} array The movies array
 * @param  {string} genre The genre that we want to filter
 * @returns {Promise} The movies that are filtered based on the genre
 */
function filterByGenre(array, genre) {
  return new Promise((resolve, reject) => {
    let rows = array.find((m) => m.genre == genre);

    if (!rows) {
      reject({
        message: "There are not any films with this genre.",
        status: 404,
      });
    }

    resolve(rows);
  });
}

/**
 * This function writes on the JSON file
 *
 * @param  {string} filename The path to the file
 * @param  {string} content The content that needs to be written
 */
function writeJSONFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {
  getNewId,
  newDate,
  mustBeInArray,
  filterByGenre,
  writeJSONFile,
};
