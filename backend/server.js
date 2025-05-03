require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const cookieParser = require('cookie-parser');
const { permit } = require('./middleware/permit');
const bcrypt = require('bcryptjs');

// Models
const Trailer = require('./models/trailer');
const User = require('./models/user');

// Routes
const trailerRoutes = require('./routes/trailers');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
// Handle preflight OPTIONS requests explicitly
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    return res.sendStatus(200);
  }
  next();
});

// CORS configuration with dynamic origin check
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

app.get('/', (req, res) => {
    res.send('Welcome to the Movie Trailer API');
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

    // Seed users with hashed passwords
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

    // Sync users to Permit.io
    const users = await User.findAll();
    for (const user of users) {
      try {
        // Try to create the user
        await permit.api.users.create({
          key: user.id.toString(),
        });
        console.log(`Created user ${user.username} in Permit.io`);
      } catch (error) {
        if (error.originalError && error.originalError.status === 409) {
          console.log(`User ${user.username} already exists in Permit.io`);
        } else {
          console.error(`Error creating user ${user.username}:`, error);
          continue; // Skip to the next user
        }
      }

      // Assign the role to the user
      await permit.api.users.assignRole({
        user: user.id.toString(),
        role: user.role,
        tenant: 'default', // Adjust if necessary
      });
      console.log(`Assigned role ${user.role} to user ${user.username} in Permit.io`);
    }

  } catch (error) {
    console.error('Error seeding data or syncing with Permit.io:', error);
  }

  app.listen(5001, () => {
    console.log('Server running on port 5001');
  });
});