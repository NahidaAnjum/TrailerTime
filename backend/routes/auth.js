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
      { expiresIn: '24h' } // Extended session
    );

    res.cookie('token', token, { 
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000 // 24 hours
    });
    
    res.json({ 
      username: user.username, 
      role: user.role,
      id: user.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  res.json({ message: 'Logged out successfully' });
});

// Auth check
router.get('/check', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ isAuthenticated: false });

    const decoded = jwt.verify(token, 'your_jwt_secret');
    
    // Verify user still exists
    const user = await User.findByPk(decoded.id);
    if (!user) {
      res.clearCookie('token');
      return res.status(401).json({ isAuthenticated: false });
    }

    res.json({
      isAuthenticated: true,
      username: user.username,
      role: user.role,
      id: user.id
    });
  } catch (err) {
    res.clearCookie('token');
    res.status(401).json({ isAuthenticated: false });
  }
});

module.exports = router;