const fs = require("fs");

const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
};

const newDate = () => new Date().toString();

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
