const fs = require("fs");

const fetchMovies = () => {
  return JSON.parse(fs.readFileSync("./data/videos.json"));
};

const addMovie = (newMovie) => {
  const freshMovieList = fetchMovies();
  fs.writeFileSync(
    "./data/videos.json",
    JSON.stringify([...freshMovieList, newMovie])
  );
  return newMovie;
};

module.exports = { fetchMovies, addMovie };
