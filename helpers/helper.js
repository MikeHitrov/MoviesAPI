/**
 * This function checks if a movie is in the object based on its id
 *
 * @param  {Array} array The movies array
 * @param  {number} id The movie id
 * @returns {Object} The movie object if found or an error otherwise
 */
function searchByIdInArray(array, id) {
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
 * @returns {Array} The movies that are filtered based on the genre
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

module.exports = {
  searchByIdInArray,
  filterByGenre,
};
