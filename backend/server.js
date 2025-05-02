const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const cookieParser = require('cookie-parser');

// Models
const Trailer = require('./models/trailer');
const User = require('./models/user');

// Routes
const trailerRoutes = require('./routes/trailers');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/trailers', trailerRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Database sync with initial data
sequelize.sync({ force: true }).then(async () => {
  console.log('Database synced');
  
  try {
    // Seed trailers
    await Trailer.bulkCreate([
      {
        title: 'Inception',
        youtubeUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
        thumbnailUrl: 'https://i.ytimg.com/vi/YoHD9XEInc0/hqdefault.jpg'
      },
      {
        title: 'Interstellar',
        youtubeUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
        thumbnailUrl: 'https://i.ytimg.com/vi/zSWdZVtXT7E/hqdefault.jpg'
      }
    ]);
    console.log('Sample trailers added');

    // Seed users
    await User.bulkCreate([
      {
        username: 'admin',
        password: '2025DEVChallenge',
        role: 'admin'
      },
      {
        username: 'editor',
        password: '2025DEVChallenge',
        role: 'editor'
      },
      {
        username: 'user',
        password: '2025DEVChallenge',
        role: 'viewer'
      }
    ]);
    console.log('Sample users added');

  } catch (error) {
    console.error('Error seeding data:', error);
  }

  app.listen(5001, () => {
    console.log('Server running on port 5001');
  });
});