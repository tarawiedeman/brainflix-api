const express = require("express");
const router = express.Router();
const fs = require("node:fs");
const { v4 } = require("uuid");

router.get("/videos", (req, res) => {
  const videos = getVideos();
  res.json(videos);
});

router.get("/videos/:id", (req, res) => {
  const id = req.params.id;
  const videos = getVideos();
  const video = videos.find((video) => video.id === id);
  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ error: "Video not found" });
  }
});

router.post("/videos", (req, res) => {
  const videos = getVideos();

  const { title, description } = req.body;

  const newVideo = {
    id: v4(),
    title,
    channel: "Tara's Viral Videos",
    image: "http://localhost:8050/images/Upload-video-preview.jpg",
    description,
    views: "100,000",
    likes: "7,000",
    duration: "3:22",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: "04-24-2023",
    comments: [
      {
        id: "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
        name: "Sarah Lauren",
        comment: "What a great video! So entertaining and dynamic",
        likes: 0,
        timestamp: 1628522461000,
      },
      {
        id: "091de676-61af-4ee6-90de-3a7a53af7521",
        name: "Robert Johson",
        comment:
          "Would love to see more videos like this one. I'll definitely subscribe to this channel for more exciting content!",
        likes: 0,
        timestamp: 18796359541000,
      },
      {
        id: "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
        name: "Noelle Andrade",
        comment:
          "How can someone make such great video content!!! They must have a professional camera crew or something. The video quality is exceptional. Ready for another video soon!",
        likes: 0,
        timestamp: 1526011132000,
      },
    ],
  };
  videos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
  res.send("create new video upload");
});

function getVideos() {
  const videosFile = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videosFile);
  return videos;
}

module.exports = router;
