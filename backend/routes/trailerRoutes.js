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
    },
    { 
        id: 13, 
        name: "The Shawshank Redemption", 
        url: "https://www.youtube.com/watch?v=6hB3S9bIaco", 
        poster: "https://image.tmdb.org/t/p/original/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg" 
    },
    { 
        id: 14, 
        name: "The Godfather", 
        url: "https://www.youtube.com/watch?v=sY1S34973zA", 
        poster: "https://image.tmdb.org/t/p/original/hMTncCsOwZZCNOo5SBhE1wQKpid.jpg" 
    },
    { 
        id: 15, 
        name: "Dilwale Dulhania Le Jayenge", 
        url: "https://youtu.be/oIZ4U21DRlM?si=QCMwqCDGJ3dOxYXv", 
        poster: "https://image.tmdb.org/t/p/original/lfRkUr7DYdHldAqi3PwdQGBRBPM.jpg" 
    },
    { 
        id: 16, 
        name: "Lagaan", 
        url: "https://youtu.be/Nhi4Azs2nEw?si=P-0Drst6mV4jayiq", 
        poster: "https://image.tmdb.org/t/p/original/ldJtjnulba43rti5R3ngnkpZq1H.jpg" 
    },
    { 
        id: 17, 
        name: "Kabhi Khushi Kabhie Gham", 
        url: "https://youtu.be/7uY1JbWZKPA?si=bOIgFYn4AL5ZUyGI", 
        poster: "https://image.tmdb.org/t/p/original/12BvYKueY0eruZuTYIextEZaCC.jpg" 
    },
    { 
        id: 18, 
        name: "Dangal", 
        url: "https://youtu.be/x_7YlGv9u1g?si=YZ6PQ3--AQ5FUzOI", 
        poster: "https://image.tmdb.org/t/p/original/lHd3W8E5aKoki9pDP7tN7yEh3c0.jpg" 
    },
    { 
        id: 19, 
        name: "3 Idiots", 
        url: "https://www.youtube.com/watch?v=K0eDlFX9GMc", 
        poster: "https://image.tmdb.org/t/p/original/66A9MqXOyVFCssoloscw79z8Tew.jpg" 
    },
    { 
        id: 20, 
        name: "Jaws", 
        url: "https://www.youtube.com/watch?v=U1fu_sA7XhE", 
        poster: "https://image.tmdb.org/t/p/original/lxM6kqilAdpdhqUl2biYp5frUxE.jpg" 
    },
    { 
        id: 21, 
        name: "Sholay", 
        url: "https://youtu.be/fefaxq2nXoE?si=ZeLu6k3tK9iHM5Z-", 
        poster: "https://image.tmdb.org/t/p/original/ya9bwgqA4eNl5bQ9QqS0jcmRoBS.jpg" 
    },
    { 
        id: 22, 
        name: "Zindagi Na Milegi Dobara", 
        url: "https://youtu.be/FJrpcDgC3zU?si=DQJuz9V62nLDWBQj", 
        poster: "https://image.tmdb.org/t/p/original/gFQRmiPLFS0cIGpC1fyGiiqYz41.jpg" 
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
