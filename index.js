const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { PORT } = process.env || 8000;

app.use(cors());
app.use(express.json());

const videoitemRoute = require("./routes/videos");

app.use("/public", express.static("./public"));

app.use("/videos", videoitemRoute);

app.listen(PORT, () => {
  console.log("running on 8080");
});
