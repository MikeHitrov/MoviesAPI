const model = require("../models/movie.model.js");

test("Gets all movies", () => {
  expect(model.getMovies()).toBeDefined();

  model.getMovies().then((movies) => {
    expect(movies.length).toBe(2);
  });
});

test("Creates a movie", () => {
  let newMovie = {
    title: "Fast & Furious 3",
    director: "Justin Lin",
    releaseDate: 2007,
    genre: "action",
    actors: [
      "Vin Diesel",
      "Paul Walker",
      "Michelle Horhe",
      "Jordana Brewster",
      "John Ortiz",
    ],
  };

  model.insertMovie(newMovie).then((movie) => {
    expect(movie.id).toBe(3);
  });

  model.getMovies().then((movies) => {
    expect(movies.length).toBe(3);
    expect(movies[2].title).toBe("Fast & Furious 3");
  });
});

test("Updates a movie", () => {});
