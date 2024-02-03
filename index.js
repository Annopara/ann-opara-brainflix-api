const express = require("express");
const app = express();

app.use(express.json());

const videoitemRoute = require("./routes/videos");

// app.use('/pitchers', express.static('pitchers'));

app.use("/videos", videoitemRoute);

app.listen(8080, () => {
  console.log("running on 8080");
});
