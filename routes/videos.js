const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (_req, res) => {
  const listVideosJson = JSON.parse(fs.readFileSync(`./data/videos.json`));

  const allVideoList = listVideosJson.map((videoitem) => ({
    id: videoitem.id,
    title: videoitem.title,
    channel: videoitem.channel,
    image: videoitem.image,
  }));

  res.json(allVideoList);
});

// router.post("/", (req, res) => {
//   const body = req.body;
//   const newCharacter = {
//     id: uuidv4(),
//     ...body,
//   };

//   const fileData = JSON.parse(fs.readFileSync(`./data/videos.json`));

//   fs.writeFileSync(
//     "./data/students.json",
//     JSON.stringify([newCharacter, ...fileData])
//   );

//   return res.status(200).json(newCharacter);
// });

module.exports = router;
