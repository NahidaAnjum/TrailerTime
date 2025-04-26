const express = require('express');
const router = express.Router();

// Dummy trailers data
let trailers = [
  { id: 1, name: "Inception", url: "https://www.youtube.com/watch?v=YoHD9XEInc0" },
  { id: 2, name: "The Dark Knight", url: "https://www.youtube.com/watch?v=EXeTwQWrcwY" }
];

// Get all trailers
router.get('/', (req, res) => {
  res.json(trailers);
});

// Add a new trailer
router.post('/', (req, res) => {
  const { name, url } = req.body;
  const newTrailer = { id: trailers.length + 1, name, url };
  trailers.push(newTrailer);
  res.json(newTrailer);
});

module.exports = router;
