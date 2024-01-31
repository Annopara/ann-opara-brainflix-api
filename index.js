const express = require("express");
const app = express();
// const userData = require("./data/users.json");
const videoitemRoute = require("./routes/videos");

// const videoitemData = require("./data/videos.json");

app.use("/videos", videoitemRoute);

app.listen(8080, () => {
  console.log("running on 8080");
});
