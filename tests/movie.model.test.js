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

test("Updates a movie", () => {
  let updatedMovie = {
    title: "Fast & Furious 10",
    director: "Justin Lin",
    releaseDate: 2021,
    genre: "action",
    actors: [
      "Vin Diesel",
      "Paul Walker's brother",
      "Michelle Horhe",
      "Jordana Brewster",
      "John Ortiz",
    ],
  };

  model.updateMovie(3, updatedMovie).then((movie) => {
    expect(movie.title).toBe("Fast & Furious 10");
    expect(movie.releaseDate).toBe(2021);
  });
});

test("Get movie by id", () => {
  model.getMovie(3).then((movie) => {
    expect(movie.title).toBe("Fast & Furious 10");
    expect(movie.releaseDate).toBe(2021);
  });
});

test("Get movies by genre", () => {
  model.getMoviesByGenre("action").then((movies) => {
    expect(movies.length).toBe(2);
  });

  model.getMoviesByGenre("science fiction").then((movies) => {
    expect(movies.length).toBe(1);
  });
});

test("Deletes a movie", () => {
  model.deleteMovie(3);

  model.getMovies().then((movies) => {
    expect(movies.length).toBe(2);
  });
});
