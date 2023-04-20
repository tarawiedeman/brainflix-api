
const express = require ('express');
const router = express.Router();
const fs = require("node:fs");

router.get('/', (req,res) => {
    const videos = getVideos();
    res.json(videos);
});


function getVideos(){
    const videosFile = fs.readFileSync("./data/videos.json");
    const videos = JSON.parse(videosFile);
    return videos;
}
module.exports = router; 