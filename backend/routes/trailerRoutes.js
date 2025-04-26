const express = require('express');
const router = express.Router();

// Updated trailers data
let trailers = [
  {
    id: 1,
    name: "Inception",
    url: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    poster: "https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg"
  },
  {
    id: 2,
    name: "The Dark Knight",
    url: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    poster: "https://image.tmdb.org/t/p/original/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg"
  },
  {
    id: 3,
    name: "Interstellar",
    url: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    poster: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    id: 4,
    name: "Avatar",
    url: "https://www.youtube.com/watch?v=5PSNL1qE6VY",
    poster: "https://image.tmdb.org/t/p/original/vbtsge1cmZ3iMXV016pVqba1VD0.jpg"
  },
  {
    id: 5,
    name: "Avengers: Endgame",
    url: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    poster: "https://image.tmdb.org/t/p/original/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"
  },
  {
    id: 6,
    name: "Spider-Man: No Way Home",
    url: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
    poster: "https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
  },
  {
    id: 7,
    name: "Joker",
    url: "https://www.youtube.com/watch?v=zAGVQLHvwOY",
    poster: "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
  },
  {
    id: 8,
    name: "Black Panther",
    url: "https://www.youtube.com/watch?v=xjDjIWPwcPU",
    poster: "https://image.tmdb.org/t/p/original/uxzzxijgPIY7slzFvMotPv8wjKA.jpg"
  },
  {
    id: 9,
    name: "Frozen II",
    url: "https://www.youtube.com/watch?v=Zi4LMpSDccc",
    poster: "https://image.tmdb.org/t/p/original/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg"
  },
  {
    id: 10,
    name: "The Lion King",
    url: "https://www.youtube.com/watch?v=7TavVZMewpY",
    poster: "https://image.tmdb.org/t/p/original/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg"
  },
  {
    id: 11,
    name: "Tenet",
    url: "https://www.youtube.com/watch?v=L3pk_TBkihU",
    poster: "https://image.tmdb.org/t/p/original/k68nPLbIST6NP96JmTxmZijEvCA.jpg"
  },
  {
    id: 12,
    name: "Doctor Strange",
    url: "https://www.youtube.com/watch?v=Lt-U_t2pUHI",
    poster: "https://image.tmdb.org/t/p/original/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg"
  }
];

router.get('/', (req, res) => {
  res.json(trailers);
});

router.post('/', (req, res) => {
  const { name, url, poster } = req.body;
  const newTrailer = { id: trailers.length + 1, name, url, poster };
  trailers.push(newTrailer);
  res.json(newTrailer);
});

module.exports = router;
