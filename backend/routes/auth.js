const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ where: { username } });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { 
      httpOnly: true,
      sameSite: 'none', // Changed from 'strict' for cross-origin support
      secure: true,     // Required for sameSite: none
      maxAge: 3600000   // 1 hour in milliseconds
    });
    
    res.json({ 
      username: user.username, 
      role: user.role,
      message: 'Login successful' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    sameSite: 'none',
    secure: true
  });
  res.json({ message: 'Logged out successfully' });
});

// Auth check endpoint
router.get('/check', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ isAuthenticated: false });

    const decoded = jwt.verify(token, 'your_jwt_secret');
    res.json({
      isAuthenticated: true,
      username: decoded.username,
      role: decoded.role,
      id: decoded.id
    });
  } catch (err) {
    res.clearCookie('token'); // Clear invalid token
    res.status(401).json({ isAuthenticated: false });
  }
});

module.exports = router;