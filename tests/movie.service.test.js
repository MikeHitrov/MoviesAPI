const service = require("../services/user.service");
let id = "";

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
    id = movie.id;
    expect(service.getMovie(id).title).toBe("Fast & Furious 3");
  });

  service.getMovies().then((movies) => {
    expect(movies.length).toBe(3);
    expect(service.getMovie(id).title).toBe("Fast & Furious 3");
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

  service.updateMovie(id, updatedMovie).then((movie) => {
    expect(movie.title).toBe("Fast & Furious 10");
    expect(movie.releaseDate).toBe(2021);
  });
});

test("Get movie by id", () => {
  service.getMovie(id).then((movie) => {
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
  service.deleteMovie(id);

  service.getMovies().then((movies) => {
    expect(movies.length).toBe(2);
  });
});

test("Delete a non-existing film", () => {
  service.deleteMovie(id);

  service.getMovies().then((movies) => {
    expect(movies.length).toBe(2);
  });
});

test("Delete a non-existing film", () => {
  service.deleteMovie("6fb43fda-5a16-482c-afb3-4cd698c66ea3");
  service.deleteMovie("cb6553ea-c61c-4097-a881-e826b421675b");

  service.getMovies().then((movies) => {
    expect(movies).toBe([]);
  });
});

test("Search for a non-existing movie", () => {
  service.getMovie().then((result) => {
    expect(result).toBe({
      message: "ID not found",
      status: 404,
    });
  });
});
