const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const { fetchMovies, addMovie } = require("../controllers/videos");

router
  .route("/")
  .get((_req, res) => {
    const listVideosJson = fetchMovies();

    const allVideoList = listVideosJson.map((videoitem) => ({
      id: videoitem.id,
      title: videoitem.title,
      channel: videoitem.channel,
      image: videoitem.image,
    }));

    res.json(allVideoList);
  })
  .post((req, res) => {
    const userData = fetchMovies();
    const { title, description } = req.body;
    if (!title || !description)
      return res
        .status(400)
        .json("All requests must have a title and a description.");
    const newMovie = {
      id: uuidv4(),
      title: req.body.title,
      channel: "channel",
      image: "http://localhost:8080/public/default_img.jpg",
      description: req.body.description,
      views: 0,
      likes: "0",
      duration: "4:01",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: Date.now(),
      comments: [],
    };

    userData.push(newMovie);

    const justAdded = addMovie(newMovie);
    res.status(201).json(justAdded);
  });

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  const movieMatch = fetchMovies().find((movie) => movie.id == id);
  if (!movieMatch) return res.status(404).json("No video with that ID");
  res.status(200).json(movieMatch);
});

router.route("/:id/comments").post((req, res) => {
  const { id } = req.params;
  const movieMatch = fetchMovies().find((movie) => movie.id == id);
  if (!movieMatch) return res.status(404).json("No video with that ID");
  if (!movieMatch.comments) {
    movieMatch.comments = [];
  }

  const { comment, name } = req.body;
  const newComment = {
    id: uuidv4(),
    name: name,
    comment: comment,
    likes: 0,
    timestamp: Date.now(),
  };
  movieMatch.comments.push(newComment);

  const justAdded = addMovie(movieMatch);

  res.status(200).json(justAdded);
});

module.exports = router;
