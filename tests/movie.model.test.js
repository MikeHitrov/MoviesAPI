const service = require("../services/user.service");

test("Gets all movies", () => {
  expect(service.getMovies()).toBeDefined();

  service.getMovies().then((movies) => {
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

  service.insertMovie(newMovie).then((movie) => {
    expect(movie.id).toBe(3);
  });

  service.getMovies().then((movies) => {
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

  service.updateMovie(3, updatedMovie).then((movie) => {
    expect(movie.title).toBe("Fast & Furious 10");
    expect(movie.releaseDate).toBe(2021);
  });
});

test("Get movie by id", () => {
  service.getMovie(3).then((movie) => {
    expect(movie.title).toBe("Fast & Furious 10");
    expect(movie.releaseDate).toBe(2021);
  });
});

test("Get movies by genre", () => {
  service.getMoviesByGenre("action").then((movies) => {
    expect(movies.length).toBe(2);
  });

  service.getMoviesByGenre("science fiction").then((movies) => {
    expect(movies.length).toBe(1);
  });
});

test("Deletes a movie", () => {
  service.deleteMovie(3);

  service.getMovies().then((movies) => {
    expect(movies.length).toBe(2);
  });
});
