const express = require("express");
const Playlist = require("../Models/Playlist");
const router = express.Router();

router.get("/", async (req, res) => {
  const playlists = await Playlist.find();
  res.json({ playlists, success: true, message: "playlists found" });

});
router.post("/like", async (req, res) => {
  try {
    const { song_mp3, song_title, song_artist, song_thumbnail } = req.body;

    if (!song_mp3 || !song_title || !song_artist) {
      return res.status(400).json({
        success: false,
        message: "All song fields are required.",
      });
    }

    // Find existing playlist or create new
    let playlist = await Playlist.findOne({ title: "Liked Songs" });

    if (!playlist) {
      playlist = new Playlist({
        title: "Liked Songs",
        singers: [], // optional
        songs: [],
      });
    }

    // Check if song is already in liked list (optional)
    const alreadyLiked = playlist.songs.some(
      (s) => s.song_mp3 === song_mp3
    );
    if (alreadyLiked) {
      return res.status(409).json({
        success: false,
        message: "Song already liked.",
      });
    }

    // Push the song
    playlist.songs.push({
      song_mp3,
      song_title,
      song_artist,
      song_thumbnail,
    });

    await playlist.save();

    return res.status(200).json({
      success: true,
      message: "Song added to Liked Songs.",
      playlist,
    });
  } catch (err) {
    console.error("LIKE error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

router.post("/create", async (req, res) => {
  console.log(req.body);
  const { singers, songs, title } = req.body;
  const playlist = await Playlist.create({ singers, songs, title });

  res.json({ playlist, success: true, message: "playlist" });
});
module.exports = router;
