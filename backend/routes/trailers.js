const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllTrailers,
  getTrailerById,
  createTrailer,
  updateTrailer,
  deleteTrailer
} = require('../controllers/trailerController');

// Public routes
router.get('/', getAllTrailers);
router.get('/:id', getTrailerById);

// Protected routes
router.post('/', auth(['admin', 'editor']), createTrailer);
router.put('/:id', auth(['admin', 'editor']), updateTrailer);
router.delete('/:id', auth(['admin']), deleteTrailer);

module.exports = router;